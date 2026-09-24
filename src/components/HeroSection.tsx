import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
  CreditCard,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onExploreClick: () => void;
  onDemoClick: () => void;
  onPricingClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreClick,
  onDemoClick,
  onPricingClick,
}) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#FAF7BB]/35 via-white to-[#fefdf9] border-b border-[#133458]/10 w-full max-w-full">
      {/* Ambient warm palette lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] h-[350px] bg-gradient-to-r from-[#133458]/10 via-[#838921]/15 to-[#D99B21]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="hidden sm:block absolute top-1/3 -left-20 w-[350px] h-[350px] bg-[#FAF7BB]/60 blur-[100px] pointer-events-none rounded-full" />
      <div className="hidden sm:block absolute top-1/4 -right-20 w-[350px] h-[350px] bg-[#D99B21]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 text-center">
        {/* Top Studio Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D99B21]/40 bg-[#FAF7BB]/50 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-[#133458] shadow-xs mb-6 sm:mb-8">
          <Sparkles className="h-4 w-4 text-[#D99B21] animate-spin shrink-0" style={{ animationDuration: '8s' }} />
          <span>{t.hero.kicker}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#133458] max-w-4xl mx-auto leading-[1.2] sm:leading-[1.15] font-['Space_Grotesk']">
          {lang === 'uk' ? (
            <>
              Створюємо програмні продукти <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#133458] via-[#838921] to-[#D99B21] bg-clip-text text-transparent">
                нового покоління
              </span>
            </>
          ) : (
            <>
              Building Next-Generation <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#133458] via-[#838921] to-[#D99B21] bg-clip-text text-transparent">
                Software Solutions
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-[#133458]/75 max-w-3xl mx-auto leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          <button
            onClick={onExploreClick}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#133458] hover:bg-[#1b497c] px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#133458]/25 hover:shadow-xl hover:shadow-[#133458]/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{t.hero.btnExplore}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#FAF7BB]" />
          </button>

          <button
            onClick={onDemoClick}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#133458]/20 bg-white px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#133458] shadow-xs hover:border-[#838921] hover:bg-[#FAF7BB]/30 hover:text-[#838921] hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAF7BB] text-[#838921] shrink-0">
              <Play className="h-3 w-3 fill-current ml-0.5" />
            </div>
            <span>{t.hero.btnDemo}</span>
          </button>

          <button
            onClick={onPricingClick}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#D99B21]/50 bg-[#D99B21]/10 px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#b88219] shadow-xs hover:bg-[#D99B21]/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <CreditCard className="h-4 w-4 text-[#D99B21] shrink-0" />
            <span>{t.hero.btnPricing}</span>
          </button>
        </div>

        {/* Numbers Strip / Milestones Counter */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#133458]/10 bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#133458]/10 text-[#133458] border border-[#133458]/20 shrink-0">
                <Layers className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-3xl font-extrabold text-[#133458] font-['Space_Grotesk'] leading-tight">
                  {t.hero.stats.productsCount}
                </p>
                <p className="text-[11px] sm:text-sm font-semibold text-[#133458]/60 truncate">
                  {t.hero.stats.productsLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#133458]/10 bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#838921]/15 text-[#838921] border border-[#838921]/30 shrink-0">
                <Award className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-3xl font-extrabold text-[#133458] font-['Space_Grotesk'] leading-tight">
                  {t.hero.stats.rndRate}
                </p>
                <p className="text-[11px] sm:text-sm font-semibold text-[#133458]/60 truncate">
                  {t.hero.stats.rndLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#133458]/10 bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FAF7BB] text-[#133458] border border-[#D99B21]/30 shrink-0">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-3xl font-extrabold text-[#133458] font-['Space_Grotesk'] leading-tight">
                  {t.hero.stats.uptime}
                </p>
                <p className="text-[11px] sm:text-sm font-semibold text-[#133458]/60 truncate">
                  {t.hero.stats.uptimeLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#133458]/10 bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#D99B21]/15 text-[#D99B21] border border-[#D99B21]/30 shrink-0">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-3xl font-extrabold text-[#133458] font-['Space_Grotesk'] leading-tight">
                  {t.hero.stats.requests}
                </p>
                <p className="text-[11px] sm:text-sm font-semibold text-[#133458]/60 truncate">
                  {t.hero.stats.requestsLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
