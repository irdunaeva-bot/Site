import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Cpu, Code2, CheckCircle, FileCheck2, Building2 } from 'lucide-react';

interface AboutStudioSectionProps {
  lang: Language;
}

export const AboutStudioSection: React.FC<AboutStudioSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-4">
            <Building2 className="h-3.5 w-3.5" />
            <span>{t.about.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            {t.about.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 mb-6">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Space_Grotesk']">
              {t.about.card1Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.card1Desc}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 mb-6">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Space_Grotesk']">
              {t.about.card2Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.card2Desc}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mb-6">
              <FileCheck2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Space_Grotesk']">
              {t.about.card3Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.card3Desc}
            </p>
          </div>
        </div>

        {/* Company Requisites Trust Banner in Murka Style */}
        <div className="mt-12 rounded-3xl border border-blue-200/80 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'uk' ? 'Офіційна реєстрація в Україні' : 'Official Ukrainian Entity Registration'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === 'uk'
                  ? 'Товариство з обмеженою відповідальністю «Рекрієйт» • ЄДРПОУ: 44829103 • м. Київ'
                  : 'Limited Liability Company «Recreate» • USREOU: 44829103 • Kyiv, Ukraine'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              100% In-house R&D
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              WayForPay Partner
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
