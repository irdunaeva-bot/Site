import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Zap, Shield, Sparkles, HeartHandshake, Award, Clock, ArrowUpRight } from 'lucide-react';

interface ValuesAndMilestonesSectionProps {
  lang: Language;
}

export const ValuesAndMilestonesSection: React.FC<ValuesAndMilestonesSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="values" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Values Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.values.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            {t.values.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600 leading-relaxed">
            {t.values.subtitle}
          </p>
        </div>

        {/* Values 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          <div className="rounded-2xl sm:rounded-3xl border border-blue-100 bg-blue-50/40 p-5 sm:p-7 hover:bg-blue-50/80 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 mb-4 sm:mb-5">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 font-['Space_Grotesk']">
              {t.values.val1Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.values.val1Desc}
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-7 hover:bg-indigo-50/80 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 mb-4 sm:mb-5">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 font-['Space_Grotesk']">
              {t.values.val2Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.values.val2Desc}
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-amber-100 bg-amber-50/40 p-5 sm:p-7 hover:bg-amber-50/80 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 mb-4 sm:mb-5">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 font-['Space_Grotesk']">
              {t.values.val3Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.values.val3Desc}
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-7 hover:bg-emerald-50/80 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 mb-4 sm:mb-5">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 font-['Space_Grotesk']">
              {t.values.val4Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.values.val4Desc}
            </p>
          </div>
        </div>

        {/* Milestones / Цифри в стилі Murka */}
        <div id="milestones" className="pt-4 sm:pt-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold text-slate-700 mb-3">
              <Award className="h-3.5 w-3.5 text-blue-600" />
              <span>{t.milestones.kicker}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              {t.milestones.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-center hover:bg-white hover:shadow-lg transition-all">
              <p className="text-3xl sm:text-5xl font-extrabold text-blue-600 font-['Space_Grotesk'] mb-1 sm:mb-2">
                {t.milestones.m1Num}
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">{t.milestones.m1Title}</p>
              <p className="text-[11px] sm:text-xs text-slate-500">{t.milestones.m1Sub}</p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-center hover:bg-white hover:shadow-lg transition-all">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-600 font-['Space_Grotesk'] mb-1 sm:mb-2">
                {t.milestones.m2Num}
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">{t.milestones.m2Title}</p>
              <p className="text-[11px] sm:text-xs text-slate-500">{t.milestones.m2Sub}</p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-center hover:bg-white hover:shadow-lg transition-all">
              <p className="text-3xl sm:text-5xl font-extrabold text-indigo-600 font-['Space_Grotesk'] mb-1 sm:mb-2">
                {t.milestones.m3Num}
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">{t.milestones.m3Title}</p>
              <p className="text-[11px] sm:text-xs text-slate-500">{t.milestones.m3Sub}</p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-center hover:bg-white hover:shadow-lg transition-all">
              <p className="text-3xl sm:text-5xl font-extrabold text-amber-500 font-['Space_Grotesk'] mb-1 sm:mb-2">
                {t.milestones.m4Num}
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">{t.milestones.m4Title}</p>
              <p className="text-[11px] sm:text-xs text-slate-500">{t.milestones.m4Sub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
