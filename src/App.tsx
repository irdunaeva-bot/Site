import React, { useState, useEffect } from 'react';
import {
  Product,
  Language,
  ProductVersion,
  ActiveLicense,
  WayForPayCheckoutData,
  PlanType,
} from './types';
import { initialProducts, companyRequisites } from './data/products';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductsSection } from './components/ProductsSection';
import { AboutStudioSection } from './components/AboutStudioSection';
import { ValuesAndMilestonesSection } from './components/ValuesAndMilestonesSection';
import { PricingSection } from './components/PricingSection';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';
import { WayForPayModal } from './components/WayForPayModal';
import { EditLinksModal } from './components/EditLinksModal';
import { MyAccessModal } from './components/MyAccessModal';
import { LegalModal } from './components/LegalModal';
import { ActiveAccessBanner } from './components/ActiveAccessBanner';
import { Footer } from './components/Footer';

export default function App() {
  // Language State: 'uk' (Ukrainian) or 'en' (English)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('recreate_lang');
    return saved === 'en' ? 'en' : 'uk';
  });

  // Products State with localStorage persistence for custom repos / demos
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('recreate_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((p: Product) => p.id === 'child-centr' || p.id === 'vytraty' || p.id === 'chastka-realty')) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load custom products from localStorage', e);
    }
    return initialProducts;
  });

  // Active Paid Licenses
  const [activeLicenses, setActiveLicenses] = useState<ActiveLicense[]>(() => {
    try {
      const saved = localStorage.getItem('recreate_licenses');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load active licenses', e);
    }
    return [];
  });

  // Modals state
  const [demoProduct, setDemoProduct] = useState<{
    product: Product;
    version?: ProductVersion;
  } | null>(null);

  const [checkoutData, setCheckoutData] = useState<WayForPayCheckoutData | null>(null);
  const [isEditLinksOpen, setIsEditLinksOpen] = useState(false);
  const [isMyAccessOpen, setIsMyAccessOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    tab: 'offer' | 'privacy' | 'refund';
  }>({
    isOpen: false,
    tab: 'offer',
  });

  // Persist language
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('recreate_lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    if (translations[lang]?.meta?.siteTitle) {
      document.title = translations[lang].meta.siteTitle;
    }
  }, [lang]);

  // Persist custom products
  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('recreate_products_v2', JSON.stringify(updatedProducts));
  };

  const handleResetDefaults = () => {
    setProducts(initialProducts);
    localStorage.removeItem('recreate_products_v2');
    localStorage.removeItem('recreate_products_custom');
  };

  // Payment completed
  const handlePaymentSuccess = (newLicense: ActiveLicense) => {
    setActiveLicenses((prev) => {
      const updated = [newLicense, ...prev];
      localStorage.setItem('recreate_licenses', JSON.stringify(updated));
      return updated;
    });
  };

  // Delete license from history
  const handleDeleteLicense = (orderRef: string) => {
    setActiveLicenses((prev) => {
      const updated = prev.filter((l) => l.orderReference !== orderRef);
      localStorage.setItem('recreate_licenses', JSON.stringify(updated));
      return updated;
    });
  };

  // Open Checkout for single product from card
  const handleSelectPlanForProduct = (product: Product, plan: 'hourly' | 'monthly') => {
    const isHourly = plan === 'hourly';
    setCheckoutData({
      productId: product.id,
      productName: product.name[lang],
      planType: isHourly ? 'hourly' : 'monthly',
      duration: 1,
      amount: isHourly ? product.hourlyPriceUah : product.monthlyPriceUah,
      currency: 'UAH',
    });
  };

  // Open Checkout from pricing matrix (with custom duration and amount)
  const handleSelectCheckout = (
    productId: string,
    productName: string,
    planType: PlanType,
    duration: number,
    amount: number
  ) => {
    setCheckoutData({
      productId,
      productName,
      planType,
      duration,
      amount,
      currency: 'UAH',
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Active License notification banner */}
      <ActiveAccessBanner
        licenses={activeLicenses}
        lang={lang}
        onOpenMyAccess={() => setIsMyAccessOpen(true)}
      />

      {/* Main Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeLicenses={activeLicenses}
        onOpenEditLinks={() => setIsEditLinksOpen(true)}
        onOpenMyAccess={() => setIsMyAccessOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {/* Murka Style Hero Section */}
        <HeroSection
          lang={lang}
          onExploreClick={() => scrollToSection('products')}
          onDemoClick={() => setDemoProduct({ product: products[0] })}
          onPricingClick={() => scrollToSection('pricing')}
        />

        {/* 3 In-house Software Products Showcase */}
        <ProductsSection
          products={products}
          lang={lang}
          onOpenDemo={(product, version) => setDemoProduct({ product, version })}
          onSelectPlanForProduct={handleSelectPlanForProduct}
        />

        {/* About Studio (ТОВ «Рекрієйт») Section */}
        <AboutStudioSection lang={lang} />

        {/* Murka Values & Milestones Section */}
        <ValuesAndMilestonesSection lang={lang} />

        {/* Flexible Pricing & WayForPay Section */}
        <PricingSection
          products={products}
          lang={lang}
          onSelectCheckout={handleSelectCheckout}
        />
      </main>

      {/* Footer & Company Credentials */}
      <Footer
        lang={lang}
        company={companyRequisites}
        onOpenLegal={(tab) => setLegalModal({ isOpen: true, tab })}
      />

      {/* Modals */}
      {/* 1. Interactive Demo Viewer */}
      {demoProduct && (
        <InteractiveDemoModal
          product={demoProduct.product}
          initialVersion={demoProduct.version}
          lang={lang}
          onClose={() => setDemoProduct(null)}
          onUnlockAccess={(product, plan) => {
            setDemoProduct(null);
            handleSelectPlanForProduct(product, plan);
          }}
        />
      )}

      {/* 2. WayForPay Checkout Modal */}
      {checkoutData && (
        <WayForPayModal
          checkoutData={checkoutData}
          lang={lang}
          onClose={() => setCheckoutData(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* 3. Edit Custom Repositories & Demo URLs */}
      <EditLinksModal
        isOpen={isEditLinksOpen}
        onClose={() => setIsEditLinksOpen(false)}
        products={products}
        lang={lang}
        onSaveProducts={handleSaveProducts}
        onResetDefaults={handleResetDefaults}
      />

      {/* 4. My Access & License Keys Dashboard */}
      <MyAccessModal
        isOpen={isMyAccessOpen}
        onClose={() => setIsMyAccessOpen(false)}
        activeLicenses={activeLicenses}
        lang={lang}
        onDeleteLicense={handleDeleteLicense}
        onExtendPlan={() => {
          setIsMyAccessOpen(false);
          scrollToSection('pricing');
        }}
      />

      {/* 5. Legal Information Modal (Public Offer, Privacy, Refund) */}
      <LegalModal
        isOpen={legalModal.isOpen}
        initialTab={legalModal.tab}
        onClose={() => setLegalModal({ isOpen: false, tab: 'offer' })}
        lang={lang}
        company={companyRequisites}
      />
    </div>
  );
}
