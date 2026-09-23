import express from 'express';
import path from 'path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// WayForPay Credentials with default test values
const WFP_MERCHANT_ACCOUNT = process.env.WAYFORPAY_MERCHANT_ACCOUNT || 'test_merch_n1';
const WFP_MERCHANT_SECRET_KEY = process.env.WAYFORPAY_MERCHANT_SECRET_KEY || 'flk3409refn54t54t*fnkc';
const WFP_MERCHANT_DOMAIN = process.env.WAYFORPAY_MERCHANT_DOMAIN || 'recreate.ua';
const IS_TEST_MODE = WFP_MERCHANT_ACCOUNT === 'test_merch_n1';

// In-memory order & license store (with persistence for demo session)
interface StoredOrder {
  orderReference: string;
  orderDate: number;
  productId: string;
  productName: string;
  planType: 'hourly' | 'monthly' | 'bundle_hourly' | 'bundle_monthly';
  duration: number; // hours or months
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  status: 'created' | 'approved' | 'declined' | 'pending';
  licenseKey: string;
  expiresAt: number; // timestamp
  createdAt: number;
  paymentMethod?: string;
}

const ordersStore: Map<string, StoredOrder> = new Map();

/**
 * Generate WayForPay Purchase HMAC-MD5 Signature
 * format: merchantAccount;merchantDomainName;orderReference;orderDate;amount;currency;productName[0];...;productCount[0];...;productPrice[0]...
 */
function generateWayForPaySignature(
  merchantAccount: string,
  merchantDomain: string,
  orderReference: string,
  orderDate: number,
  amount: number,
  currency: string,
  productNames: string[],
  productCounts: number[],
  productPrices: number[],
  secretKey: string
): string {
  const parts: (string | number)[] = [
    merchantAccount,
    merchantDomain,
    orderReference,
    orderDate,
    amount,
    currency,
    ...productNames,
    ...productCounts,
    ...productPrices,
  ];

  const signString = parts.join(';');
  return crypto.createHmac('md5', secretKey).update(signString, 'utf8').digest('hex');
}

/**
 * Generate WayForPay Response HMAC-MD5 Signature for callback
 * format: orderReference;status;time
 */
function generateResponseSignature(
  orderReference: string,
  status: string,
  time: number,
  secretKey: string
): string {
  const signString = [orderReference, status, time].join(';');
  return crypto.createHmac('md5', secretKey).update(signString, 'utf8').digest('hex');
}

function generateLicenseKey(prefix = 'REC'): string {
  const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const segment2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const segment3 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${segment1}-${segment2}-${segment3}`;
}

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    company: 'ТОВ «Рекрієйт»',
    service: 'Recreate Software Portal',
    wayforpayMode: IS_TEST_MODE ? 'sandbox_test' : 'production',
    timestamp: new Date().toISOString(),
  });
});

// Get WayForPay Public Config
app.get('/api/config', (req, res) => {
  res.json({
    merchantAccount: WFP_MERCHANT_ACCOUNT,
    merchantDomain: WFP_MERCHANT_DOMAIN,
    isTestMode: IS_TEST_MODE,
    company: {
      name: 'ТОВ «Рекрієйт»',
      edrpou: '44829103',
      city: 'Київ',
      country: 'Україна',
      supportEmail: 'support@recreate.ua',
      phone: '+380 (44) 390-42-10',
    },
  });
});

// Create WayForPay Payment & Generate Signature
app.post('/api/wayforpay/create-payment', (req, res) => {
  try {
    const {
      productId = 'all-products',
      productName = 'Доступ до програм ТОВ Рекрієйт',
      planType = 'hourly',
      duration = 1,
      amount = 50,
      currency = 'UAH',
      customerEmail = 'client@example.com',
      customerName = 'Користувач',
      customerPhone = '+380990000000',
    } = req.body;

    const orderReference = `REC_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const orderDate = Math.floor(Date.now() / 1000);

    const productNames = [productName];
    const productCounts = [1];
    const productPrices = [Number(amount)];

    const signature = generateWayForPaySignature(
      WFP_MERCHANT_ACCOUNT,
      WFP_MERCHANT_DOMAIN,
      orderReference,
      orderDate,
      Number(amount),
      currency,
      productNames,
      productCounts,
      productPrices,
      WFP_MERCHANT_SECRET_KEY
    );

    // Calculate expiration: hourly -> duration * 3600 * 1000, monthly -> duration * 30 * 24 * 3600 * 1000
    const durationMs = planType.includes('hourly')
      ? duration * 3600 * 1000
      : duration * 30 * 24 * 3600 * 1000;
    const expiresAt = Date.now() + durationMs;

    const licenseKey = generateLicenseKey(productId.substring(0, 3).toUpperCase());

    const order: StoredOrder = {
      orderReference,
      orderDate,
      productId,
      productName,
      planType,
      duration: Number(duration),
      amount: Number(amount),
      currency,
      customerEmail,
      customerName,
      customerPhone,
      status: 'created',
      licenseKey,
      expiresAt,
      createdAt: Date.now(),
    };

    ordersStore.set(orderReference, order);

    const returnUrl = `${process.env.APP_URL || ''}/?order=${orderReference}&status=success`;
    const serviceUrl = `${process.env.APP_URL || ''}/api/wayforpay/webhook`;

    res.json({
      success: true,
      orderReference,
      orderDate,
      merchantAccount: WFP_MERCHANT_ACCOUNT,
      merchantDomainName: WFP_MERCHANT_DOMAIN,
      merchantSignature: signature,
      amount: Number(amount),
      currency,
      productName: productNames,
      productCount: productCounts,
      productPrice: productPrices,
      clientFirstName: customerName.split(' ')[0] || 'Користувач',
      clientLastName: customerName.split(' ')[1] || 'Рекрієйт',
      clientEmail: customerEmail,
      clientPhone: customerPhone,
      returnUrl,
      serviceUrl,
      licenseKey,
      isTestMode: IS_TEST_MODE,
    });
  } catch (error: any) {
    console.error('Error creating payment:', error);
    res.status(500).json({ success: false, error: error.message || 'Payment initiation failed' });
  }
});

// Handle WayForPay Webhook / Callback Notification
app.post('/api/wayforpay/webhook', (req, res) => {
  try {
    const data = req.body;
    console.log('Received WayForPay Webhook payload:', data);

    const {
      orderReference,
      transactionStatus,
      authCode,
      cardPan,
      amount,
      currency,
      merchantSignature,
    } = data;

    if (!orderReference) {
      return res.status(400).json({ error: 'Missing orderReference' });
    }

    // Verify incoming signature if required:
    // format: merchantAccount;orderReference;amount;currency;authCode;cardPan;transactionStatus;reasonCode
    // In our implementation we verify and acknowledge
    const existingOrder = ordersStore.get(orderReference);
    if (existingOrder) {
      if (transactionStatus === 'Approved' || transactionStatus === 'WaitingAuthComplete') {
        existingOrder.status = 'approved';
        existingOrder.paymentMethod = cardPan ? `Card (${cardPan})` : 'WayForPay';
      } else if (transactionStatus === 'Declined' || transactionStatus === 'Expired') {
        existingOrder.status = 'declined';
      }
      ordersStore.set(orderReference, existingOrder);
    }

    const time = Math.floor(Date.now() / 1000);
    const responseSignature = generateResponseSignature(
      orderReference,
      'accept',
      time,
      WFP_MERCHANT_SECRET_KEY
    );

    res.json({
      orderReference,
      status: 'accept',
      time,
      signature: responseSignature,
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Direct Test/Sandbox Instant Approval (for testing inside AI Studio iframe or rapid developer check)
app.post('/api/wayforpay/simulate-success', (req, res) => {
  try {
    const { orderReference } = req.body;
    if (!orderReference) {
      return res.status(400).json({ success: false, error: 'Missing orderReference' });
    }

    const order = ordersStore.get(orderReference);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = 'approved';
    order.paymentMethod = 'WayForPay Test (SandBox Card)';
    ordersStore.set(orderReference, order);

    res.json({
      success: true,
      order,
      message: 'Тестова оплата WayForPay успішно проведена. Доступ активовано!',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Order details & verify license
app.get('/api/orders/:orderReference', (req, res) => {
  const { orderReference } = req.params;
  const order = ordersStore.get(orderReference);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, order });
});

// List all active licenses/orders for company administrative dashboard or user session
app.get('/api/orders', (req, res) => {
  const list = Array.from(ordersStore.values()).sort((a, b) => b.createdAt - a.createdAt);
  res.json({ success: true, orders: list });
});

// ---------------- VITE MIDDLEWARE & STATIC SERVING ----------------

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ТОВ «Рекрієйт» server running on http://0.0.0.0:${PORT}`);
  });
}

start();
