import React, { useState } from 'react';
import { Product, Language, PlanType } from '../types';
import { translations } from '../data/translations';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface PricingSectionProps {
  products: Product[];
  lang: Language;
  onSelectCheckout: (
    productId: string,
    productName: string,
    planType: PlanType,
    duration: number,
    amount: number
  ) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  products,
  lang,
  onSelectCheckout,
}) => {
  const t = translations[lang];

  // Mode: 'hourly' or 'monthly'
  const [billingMode, setBillingMode] = useState<'hourly' | 'monthly'>('hourly');

  // Duration
  const [hourlyDuration, setHourlyDuration] = useState<number>(1);
  const [monthlyDuration, setMonthlyDuration] = useState<number>(1);

  // Discount calculation
  const getHourlyDiscountMultiplier = (hours: number) => {
    if (hours >= 24) return 0.75; // 25% off
    if (hours >= 8) return 0.85; // 15% off
    if (hours >= 3) return 0.9; // 10% off
    return 1.0;
  };

  const getMonthlyDiscountMultiplier = (months: number) => {
    if (months >= 12) return 0.7; // 30% off
    if (months >= 3) return 0.85; // 15% off
    return 1.0;
  };

  // Base bundle price:
  const baseBundleHourly = 120;
  const baseBundleMonthly = 990;

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#FAF7BB]/10 border-b border-[#133458]/10 w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D99B21]/40 bg-[#FAF7BB]/70 px-3.5 py-1 text-xs font-bold text-[#133458] mb-4">
            <CreditCard className="h-3.5 w-3.5 text-[#D99B21] shrink-0" />
            <span>{t.pricing.sectionKicker}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#133458] tracking-tight font-['Space_Grotesk']">
            {t.pricing.sectionTitle}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#133458]/70 leading-relaxed">
            {t.pricing.sectionSubtitle}
          </p>
        </div>

        {/* Billing Mode Switcher (Hourly vs Monthly) */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 mb-10 sm:mb-14">
          <div className="inline-flex rounded-2xl border border-[#133458]/15 bg-white p-1 sm:p-1.5 shadow-xs">
            <button
              onClick={() => setBillingMode('hourly')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all ${
                billingMode === 'hourly'
                  ? 'bg-[#133458] text-[#FAF7BB] shadow-sm'
                  : 'text-[#133458]/70 hover:text-[#133458]'
              }`}
            >
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>{t.pricing.tabHourly}</span>
            </button>
            <button
              onClick={() => setBillingMode('monthly')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all ${
                billingMode === 'monthly'
                  ? 'bg-[#133458] text-[#FAF7BB] shadow-sm'
                  : 'text-[#133458]/70 hover:text-[#133458]'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>{t.pricing.tabMonthly}</span>
            </button>
          </div>

          {/* Duration Selector Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center text-xs">
            <span className="text-[#133458]/70 font-semibold mr-1">{t.pricing.selectDuration}</span>
            {billingMode === 'hourly' ? (
              <>
                {[1, 3, 8, 24].map((hrs) => (
                  <button
                    key={hrs}
                    onClick={() => setHourlyDuration(hrs)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl font-bold border transition-all text-xs ${
                      hourlyDuration === hrs
                        ? 'border-[#133458] bg-[#FAF7BB] text-[#133458] shadow-xs'
                        : 'border-[#133458]/15 bg-white text-[#133458]/70 hover:text-[#133458] hover:border-[#133458]/30'
                    }`}
                  >
                    {hrs} {lang === 'uk' ? 'год' : 'hrs'}
                    {hrs === 3 && ' (-10%)'}
                    {hrs === 8 && ' (-15%)'}
                    {hrs === 24 && ' (-25%)'}
                  </button>
                ))}
              </>
            ) : (
              <>
                {[1, 3, 12].map((mos) => (
                  <button
                    key={mos}
                    onClick={() => setMonthlyDuration(mos)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl font-bold border transition-all text-xs ${
                      monthlyDuration === mos
                        ? 'border-[#133458] bg-[#FAF7BB] text-[#133458] shadow-xs'
                        : 'border-[#133458]/15 bg-white text-[#133458]/70 hover:text-[#133458] hover:border-[#133458]/30'
                    }`}
                  >
                    {mos}{' '}
                    {lang === 'uk'
                      ? mos === 1
                        ? 'місяць'
                        : mos === 3
                        ? 'місяці'
                        : 'місяців'
                      : mos === 1
                      ? 'month'
                      : 'months'}
                    {mos === 3 && ' (-15%)'}
                    {mos === 12 && ' (-30%)'}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Pricing Cards Grid (3 Individual + 1 Featured Bundle) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
          {/* Products 1, 2, 3 */}
          {products.map((product) => {
            const isHourly = billingMode === 'hourly';
            const baseRate = isHourly ? product.hourlyPriceUah : product.monthlyPriceUah;
            const duration = isHourly ? hourlyDuration : monthlyDuration;
            const mult = isHourly
              ? getHourlyDiscountMultiplier(duration)
              : getMonthlyDiscountMultiplier(duration);
            const finalAmount = Math.round(baseRate * duration * mult);

            return (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl sm:rounded-3xl border border-[#133458]/15 bg-white p-4 sm:p-6 lg:p-7 hover:border-[#838921]/50 hover:shadow-lg transition-all shadow-xs"
              >
                {/* Category & Name */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#133458] bg-[#FAF7BB]/60 px-2.5 py-1 rounded-full border border-[#D99B21]/30 uppercase tracking-wider">
                    {product.category[lang]}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#133458] mt-2.5 font-['Space_Grotesk']">
                    {product.name[lang]}
                  </h3>
                  <p className="text-xs text-[#133458]/60 mt-1 line-clamp-2">
                    {product.tagline[lang]}
                  </p>
                </div>

                {/* Price Display */}
                <div className="rounded-2xl bg-[#FAF7BB]/25 border border-[#133458]/10 p-3.5 sm:p-4 mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#133458]">{finalAmount}</span>
                    <span className="text-base font-bold text-[#D99B21]">₴</span>
                    <span className="text-xs font-semibold text-[#133458]/60 ml-1">
                      / {duration} {isHourly ? (lang === 'uk' ? 'год' : 'hrs') : (lang === 'uk' ? 'міс' : 'mo')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#133458]/60 font-medium mt-1">
                    {isHourly
                      ? `${product.hourlyPriceUah} ₴/${lang === 'uk' ? 'год' : 'hr'} ${lang === 'uk' ? 'базовий тариф' : 'base rate'}`
                      : `${product.monthlyPriceUah} ₴/${lang === 'uk' ? 'міс' : 'mo'} ${lang === 'uk' ? 'базовий тариф' : 'base rate'}`}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 text-xs text-[#133458]/75 mb-5 flex-grow">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                    <span>{lang === 'uk' ? 'Власна R&D розробка ТОВ «Рекрієйт»' : 'Proprietary R&D by LLC «Recreate»'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                    <span>{lang === 'uk' ? 'Доступ до всіх релізів на GitHub' : 'Access to all releases on GitHub'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                    <span>{lang === 'uk' ? 'Миттєва генерація ліцензійного ключа' : 'Instant license key generation'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                    <span>{lang === 'uk' ? 'Офіційний чек та ліцензія ТОВ' : 'Official LLC receipt and license'}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() =>
                    onSelectCheckout(
                      product.id,
                      product.name[lang],
                      isHourly ? 'hourly' : 'monthly',
                      duration,
                      finalAmount
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[#133458]/20 bg-[#FAF7BB]/30 py-3 sm:py-3.5 text-xs font-bold text-[#133458] hover:bg-[#133458] hover:text-[#FAF7BB] hover:border-[#133458] shadow-xs transition-colors"
                >
                  <CreditCard className="h-4 w-4 shrink-0" />
                  <span>{isHourly ? t.pricing.btnPayHourly : t.pricing.btnPayMonthly}</span>
                </button>
              </div>
            );
          })}

          {/* Featured Bundle Card (3 Products in 1) */}
          <div className="relative flex flex-col rounded-2xl sm:rounded-3xl border-2 border-[#D99B21] bg-gradient-to-b from-[#FAF7BB]/40 via-white to-white p-4 sm:p-6 lg:p-7 shadow-xl shadow-[#D99B21]/15">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#133458] to-[#838921] px-3.5 sm:px-4 py-1 text-[10px] sm:text-[11px] font-extrabold text-[#FAF7BB] shadow-md uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
              <Zap className="h-3 w-3 fill-current shrink-0 text-[#D99B21]" />
              <span>{lang === 'uk' ? 'ХІТ • 3-В-1 СТУДІЯ' : 'BEST VALUE • 3-IN-1 STUDIO'}</span>
            </div>

            {/* Bundle Header */}
            <div className="mb-4 mt-2">
              <span className="text-[11px] font-extrabold text-[#838921] uppercase tracking-wider">
                {lang === 'uk' ? 'Максимальна економія 25%' : 'Maximum 25% Savings'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#133458] mt-2 font-['Space_Grotesk']">
                {t.pricing.bundleTitle}
              </h3>
              <p className="text-xs text-[#133458]/60 mt-1">
                {t.pricing.bundleDesc}
              </p>
            </div>

            {/* Price Display */}
            {(() => {
              const isHourly = billingMode === 'hourly';
              const duration = isHourly ? hourlyDuration : monthlyDuration;
              const mult = isHourly
                ? getHourlyDiscountMultiplier(duration)
                : getMonthlyDiscountMultiplier(duration);
              const base = isHourly ? baseBundleHourly : baseBundleMonthly;
              const bundleTotal = Math.round(base * duration * mult);

              return (
                <>
                  <div className="rounded-2xl bg-[#FAF7BB]/60 border border-[#D99B21]/30 p-3.5 sm:p-4 mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#133458]">{bundleTotal}</span>
                      <span className="text-base font-bold text-[#D99B21]">₴</span>
                      <span className="text-xs font-semibold text-[#133458]/70 ml-1">
                        / {duration} {isHourly ? (lang === 'uk' ? 'год' : 'hrs') : (lang === 'uk' ? 'міс' : 'mo')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#616616] font-bold mt-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#D99B21] shrink-0" />
                      <span>{lang === 'uk' ? 'Включає всі 3 програмні продукти' : 'Includes all 3 software products'}</span>
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 text-xs text-[#133458]/80 mb-5 flex-grow font-medium">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                      <span><strong>{lang === 'uk' ? 'Заклади соц. реабілітації' : 'Child Rehab Centers'}</strong> ({lang === 'uk' ? 'Модулі 4.1-4.10, медблок 079/о' : 'Modules 4.1-4.10, 079/o'})</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                      <span><strong>{lang === 'uk' ? 'Моніторинг активів & витрат' : 'Asset & Expense Monitor'}</strong> ({lang === 'uk' ? 'ФОП 3 група 5%, Net Worth, чеки' : 'FOP 5% tax, Net Worth'})</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                      <span><strong>{lang === 'uk' ? 'Дробове інвестування' : 'Fractional Real Estate'}</strong> ({lang === 'uk' ? 'Частки від $50, ERC-3643, дивіденди' : 'Shares from $50, ERC-3643'})</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                      <span>{lang === 'uk' ? 'Пріоритетний супровід ТОВ «Рекрієйт»' : 'Priority support by LLC «Recreate»'}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() =>
                      onSelectCheckout(
                        'bundle-all',
                        lang === 'uk'
                          ? 'Пакет «Все включено: 3 продукти ТОВ Рекрієйт»'
                          : 'All-Inclusive Bundle: 3 Products by LLC Recreate',
                        isHourly ? 'bundle_hourly' : 'bundle_monthly',
                        duration,
                        bundleTotal
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#133458] via-[#838921] to-[#D99B21] py-3 sm:py-3.5 text-xs font-bold text-white shadow-lg shadow-[#133458]/20 hover:opacity-95 transition-all"
                  >
                    <span>{t.pricing.btnPayWfp}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#FAF7BB]" />
                  </button>
                </>
              );
            })()}
          </div>
        </div>

        {/* WayForPay Trust banner */}
        <div className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl border border-[#133458]/15 bg-white p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#133458]/60 shadow-xs">
          <div className="flex items-center gap-2 text-[#133458] font-semibold text-center sm:text-left">
            <ShieldCheck className="h-5 w-5 text-[#838921] shrink-0" />
            <span>{t.pricing.securePaymentNote}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-bold text-[#133458]/70 text-[10px] sm:text-xs">
            <span className="px-2 py-0.5 rounded bg-[#FAF7BB]/50 border border-[#133458]/10">Visa</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7BB]/50 border border-[#133458]/10">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7BB]/50 border border-[#133458]/10">Apple Pay</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7BB]/50 border border-[#133458]/10">Google Pay</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7BB]/50 border border-[#133458]/10">{lang === 'uk' ? 'Приват24' : 'Privat24'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
