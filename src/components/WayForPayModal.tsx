import React, { useState } from 'react';
import { WayForPayCheckoutData, Language, ActiveLicense } from '../types';
import { translations } from '../data/translations';
import {
  X,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Clock,
  Calendar,
  Lock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface WayForPayModalProps {
  checkoutData: WayForPayCheckoutData | null;
  lang: Language;
  onClose: () => void;
  onPaymentSuccess: (license: ActiveLicense) => void;
}

export const WayForPayModal: React.FC<WayForPayModalProps> = ({
  checkoutData,
  lang,
  onClose,
  onPaymentSuccess,
}) => {
  if (!checkoutData) return null;

  const t = translations[lang];

  // Customer Form State
  const [customerName, setCustomerName] = useState('Alex Koval');
  const [customerEmail, setCustomerEmail] = useState('user@recreate.ua');
  const [customerPhone, setCustomerPhone] = useState('+380991234567');

  // Transaction state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedLicense, setCompletedLicense] = useState<ActiveLicense | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [wfpFormPayload, setWfpFormPayload] = useState<any | null>(null);

  const isHourly = checkoutData.planType.includes('hourly');

  // Handle direct copy
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Launch official WayForPay payment flow
  const handleProceedWayForPay = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Request signature from server
      const res = await fetch('/api/wayforpay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: checkoutData.productId,
          productName: checkoutData.productName,
          planType: checkoutData.planType,
          duration: checkoutData.duration,
          amount: checkoutData.amount,
          currency: 'UAH',
          customerEmail,
          customerName,
          customerPhone,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || (lang === 'uk' ? 'Не вдалося створити платіж WayForPay' : 'Failed to initialize WayForPay checkout'));
      }

      setWfpFormPayload(data);

      // Check if WayForPay widget is loaded on window
      const wfp = (window as any).Wayforpay ? new (window as any).Wayforpay() : null;

      if (wfp) {
        // Run official WayForPay widget
        wfp.run(
          {
            merchantAccount: data.merchantAccount,
            merchantDomainName: data.merchantDomainName,
            merchantSignature: data.merchantSignature,
            orderReference: data.orderReference,
            orderDate: data.orderDate,
            amount: data.amount,
            currency: data.currency,
            productName: data.productName,
            productPrice: data.productPrice,
            productCount: data.productCount,
            clientFirstName: data.clientFirstName,
            clientLastName: data.clientLastName,
            clientEmail: data.clientEmail,
            clientPhone: data.clientPhone,
          },
          // onSuccess
          async (response: any) => {
            console.log('WayForPay Success:', response);
            await completeOrder(data.orderReference, data.licenseKey);
          },
          // onDeclined
          (response: any) => {
            console.log('WayForPay Declined:', response);
            setErrorMessage(t.checkoutModal.paymentDeclined);
            setIsLoading(false);
          },
          // onPending
          (response: any) => {
            console.log('WayForPay Pending:', response);
            setIsLoading(false);
          }
        );
      } else {
        console.warn('WayForPay pay-widget.js is not loaded or restricted in iframe');
      }
    } catch (err: any) {
      console.error('Payment Error:', err);
      setErrorMessage(err.message || (lang === 'uk' ? 'Помилка з’єднання з платіжним сервісом' : 'Payment gateway connection error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Test/Sandbox Payment Simulation
  const handleSimulateTestPayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create order
      const createRes = await fetch('/api/wayforpay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: checkoutData.productId,
          productName: checkoutData.productName,
          planType: checkoutData.planType,
          duration: checkoutData.duration,
          amount: checkoutData.amount,
          currency: 'UAH',
          customerEmail,
          customerName,
          customerPhone,
        }),
      });

      const orderData = await createRes.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'Order creation failed');
      }

      // 2. Simulate approval
      const simRes = await fetch('/api/wayforpay/simulate-success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderReference: orderData.orderReference,
        }),
      });

      const simResult = await simRes.json();
      if (!simResult.success) {
        throw new Error(simResult.error || 'Simulation failed');
      }

      await completeOrder(orderData.orderReference, orderData.licenseKey);
    } catch (err: any) {
      setErrorMessage(err.message || (lang === 'uk' ? 'Помилка тестової оплати' : 'Sandbox checkout simulation failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const completeOrder = async (orderReference: string, licenseKey: string) => {
    const durationMs = isHourly
      ? checkoutData.duration * 3600 * 1000
      : checkoutData.duration * 30 * 24 * 3600 * 1000;

    const license: ActiveLicense = {
      orderReference,
      productId: checkoutData.productId,
      productName: checkoutData.productName,
      planType: checkoutData.planType,
      duration: checkoutData.duration,
      expiresAt: Date.now() + durationMs,
      licenseKey,
      customerEmail,
      customerName,
      createdAt: Date.now(),
      amount: checkoutData.amount,
    };

    setCompletedLicense(license);
    onPaymentSuccess(license);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xs">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                {t.checkoutModal.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.checkoutModal.companySub}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* If payment is completed successfully */}
          {completedLicense ? (
            <div className="space-y-5 text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-600 shadow-sm">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                  {t.checkoutModal.paymentSuccess}
                </h4>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {lang === 'uk'
                    ? 'Платіж успішно проведено через WayForPay. Доступ до програми миттєво активовано!'
                    : 'Payment successfully processed via WayForPay. Software access immediately activated!'}
                </p>
              </div>

              {/* License Box */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                    {t.checkoutModal.licenseGenerated}
                  </span>
                  <button
                    onClick={() => handleCopy(completedLicense.licenseKey)}
                    className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-bold"
                  >
                    {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedKey ? t.checkoutModal.copied : t.checkoutModal.copyKey}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-blue-200 font-mono text-center text-sm font-bold text-slate-900 tracking-widest shadow-2xs">
                  {completedLicense.licenseKey}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-blue-200/60">
                  <span className="font-medium">{t.checkoutModal.licenseExpires}</span>
                  <span className="font-bold text-emerald-700">
                    {new Date(completedLicense.expiresAt).toLocaleString(lang === 'uk' ? 'uk-UA' : 'en-US')}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span>{lang === 'uk' ? 'Номер квитанції:' : 'Receipt Reference:'}</span>
                  <span className="font-mono font-bold text-slate-800">{completedLicense.orderReference}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'uk' ? 'Отримувач коштів:' : 'Payee:'}</span>
                  <span className="font-semibold text-slate-800">
                    {lang === 'uk' ? 'ТОВ «Рекрієйт» (ЄДРПОУ 44829103)' : 'LLC «Recreate» (USREOU 44829103)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'uk' ? 'Сума сплати:' : 'Paid Amount:'}</span>
                  <span className="font-bold text-slate-900">{completedLicense.amount} UAH</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                {lang === 'uk' ? 'Перейти до роботи з програмою' : 'Launch Software Now'}
              </button>
            </div>
          ) : (
            <>
              {/* Order Summary Box */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">{t.checkoutModal.productLabel}</span>
                  <span className="font-bold text-slate-900 text-right">{checkoutData.productName}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">{t.checkoutModal.planLabel}</span>
                  <span className="font-bold text-blue-700">
                    {isHourly ? (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {lang === 'uk' ? 'Погодинний доступ' : 'Hourly Access'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {lang === 'uk' ? 'Місячна підписка' : 'Monthly Subscription'}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">{t.checkoutModal.durationLabel}</span>
                  <span className="font-bold text-slate-900">
                    {checkoutData.duration} {isHourly ? (lang === 'uk' ? 'годин(и)' : 'hour(s)') : (lang === 'uk' ? 'місяць(ів)' : 'month(s)')}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2.5 border-t border-slate-200 text-sm">
                  <span className="font-bold text-slate-700">{t.checkoutModal.totalToPay}</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {checkoutData.amount} <span className="text-base font-bold text-blue-600">UAH</span>
                  </span>
                </div>
              </div>

              {/* Customer input fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t.checkoutModal.formCustomerTitle}
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.checkoutModal.fullName}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {t.checkoutModal.email}
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {t.checkoutModal.phone}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Error indicator */}
              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* WayForPay Direct Form Fallback (if payload created) */}
              {wfpFormPayload && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">
                      {lang === 'uk' ? 'Прямий шлюз оплати WayForPay сформовано:' : 'WayForPay direct checkout generated:'}
                    </span>
                    <span className="text-[11px] text-slate-500">Ref: {wfpFormPayload.orderReference}</span>
                  </div>
                  <form
                    action="https://secure.wayforpay.com/pay"
                    method="POST"
                    target="_blank"
                    className="pt-1"
                  >
                    <input type="hidden" name="merchantAccount" value={wfpFormPayload.merchantAccount} />
                    <input type="hidden" name="merchantDomainName" value={wfpFormPayload.merchantDomainName} />
                    <input type="hidden" name="merchantSignature" value={wfpFormPayload.merchantSignature} />
                    <input type="hidden" name="orderReference" value={wfpFormPayload.orderReference} />
                    <input type="hidden" name="orderDate" value={wfpFormPayload.orderDate} />
                    <input type="hidden" name="amount" value={wfpFormPayload.amount} />
                    <input type="hidden" name="currency" value={wfpFormPayload.currency} />
                    {wfpFormPayload.productName.map((name: string, i: number) => (
                      <React.Fragment key={i}>
                        <input type="hidden" name="productName[]" value={name} />
                        <input type="hidden" name="productCount[]" value={wfpFormPayload.productCount[i]} />
                        <input type="hidden" name="productPrice[]" value={wfpFormPayload.productPrice[i]} />
                      </React.Fragment>
                    ))}
                    <input type="hidden" name="clientFirstName" value={wfpFormPayload.clientFirstName} />
                    <input type="hidden" name="clientLastName" value={wfpFormPayload.clientLastName} />
                    <input type="hidden" name="clientEmail" value={wfpFormPayload.clientEmail} />
                    <input type="hidden" name="clientPhone" value={wfpFormPayload.clientPhone} />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-bold transition-colors shadow-xs"
                    >
                      <span>
                        {lang === 'uk'
                          ? 'Відкрити платіжну сторінку WayForPay (у новій вкладці)'
                          : 'Open WayForPay Payment Gateway (New Tab)'}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                {/* Official WayForPay Checkout */}
                <button
                  type="button"
                  onClick={handleProceedWayForPay}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-white" />
                  )}
                  <span>{t.checkoutModal.btnProceedWfp}</span>
                </button>

                {/* Instant Sandbox/Test simulation for instant demo */}
                <button
                  type="button"
                  onClick={handleSimulateTestPayment}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/70 py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-colors shadow-2xs"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{t.checkoutModal.btnSimulateSandbox}</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  {t.checkoutModal.sandboxNote}
                </p>
              </div>

              {/* Requisites footer */}
              <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1 font-medium">
                  <Lock className="h-3 w-3 text-emerald-600" /> {lang === 'uk' ? '256-bit SSL захист' : '256-bit SSL Security'}
                </span>
                <span className="font-semibold text-slate-700">
                  {lang === 'uk' ? 'ТОВ «Рекрієйт» • ЄДРПОУ 44829103' : 'LLC «Recreate» • USREOU 44829103'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
