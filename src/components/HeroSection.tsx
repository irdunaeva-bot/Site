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
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200/80">
      {/* Friendly, optimistic ambient lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-400/15 via-indigo-400/10 to-amber-300/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-cyan-400/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-20 w-[350px] h-[350px] bg-amber-400/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Studio Badge in Murka Style */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-bold text-blue-700 shadow-xs mb-8">
          <Sparkles className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{t.hero.kicker}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15] font-['Space_Grotesk']">
          {lang === 'uk' ? (
            <>
              Створюємо програмні продукти <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                нового покоління
              </span>
            </>
          ) : (
            <>
              Building Next-Generation <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Software Solutions
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons in Murka Interactive Style */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{t.hero.btnExplore}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onDemoClick}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm sm:text-base font-bold text-slate-800 shadow-xs hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Play className="h-3 w-3 fill-current ml-0.5" />
            </div>
            <span>{t.hero.btnDemo}</span>
          </button>

          <button
            onClick={onPricingClick}
            className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/70 px-6 py-4 text-sm sm:text-base font-bold text-amber-900 shadow-xs hover:bg-amber-100/80 hover:-translate-y-0.5 transition-all duration-200"
          >
            <CreditCard className="h-4 w-4 text-amber-600" />
            <span>{t.hero.btnPricing}</span>
          </button>
        </div>

        {/* Murka Numbers Strip / Milestones Counter */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                  {t.hero.stats.productsCount}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {t.hero.stats.productsLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                  {t.hero.stats.rndRate}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {t.hero.stats.rndLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                  {t.hero.stats.uptime}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {t.hero.stats.uptimeLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                  {t.hero.stats.requests}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
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
