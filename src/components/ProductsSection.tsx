import React, { useState } from 'react';
import { Product, Language, ProductVersion } from '../types';
import { translations } from '../data/translations';
import {
  Github,
  Play,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Calendar,
  Sparkles,
  CreditCard,
  Layers,
  Award,
  ShieldCheck,
} from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  lang: Language;
  onOpenDemo: (product: Product, version?: ProductVersion) => void;
  onSelectPlanForProduct: (product: Product, plan: 'hourly' | 'monthly') => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  lang,
  onOpenDemo,
  onSelectPlanForProduct,
}) => {
  const t = translations[lang];

  // Keep track of selected version per product
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      initial[p.id] = p.currentVersion;
    });
    return initial;
  });

  const handleVersionChange = (productId: string, versionStr: string) => {
    setSelectedVersions((prev) => ({
      ...prev,
      [productId]: versionStr,
    }));
  };

  // Color theme helpers for Murka playful visual identity
  const getProductColorTheme = (id: string) => {
    if (id === 'documind-ai') {
      return {
        badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
        accentGradient: 'from-blue-600 to-cyan-600',
        buttonGradient: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/20',
        lightBg: 'bg-blue-50/60',
        ringColor: 'hover:border-blue-300',
      };
    }
    if (id === 'visioncraft-studio') {
      return {
        badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
        accentGradient: 'from-purple-600 to-pink-600',
        buttonGradient: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/20',
        lightBg: 'bg-purple-50/60',
        ringColor: 'hover:border-purple-300',
      };
    }
    return {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentGradient: 'from-emerald-600 to-teal-600',
      buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/20',
      lightBg: 'bg-emerald-50/60',
      ringColor: 'hover:border-emerald-300',
    };
  };

  return (
    <section id="products" className="py-20 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>{t.products.sectionKicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            {t.products.sectionTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.products.sectionSubtitle}
          </p>
        </div>

        {/* Products Grid - 3 Distinct Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const currentVerStr = selectedVersions[product.id] || product.currentVersion;
            const currentVersionObj =
              product.versions.find((v) => v.version === currentVerStr) || product.versions[0];
            const theme = getProductColorTheme(product.id);

            return (
              <div
                key={product.id}
                className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${theme.ringColor}`}
              >
                {/* 100% In-house badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${theme.badgeBg}`}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {t.products.inHouseBadge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {product.category[lang]}
                  </span>
                </div>

                {/* Product Title */}
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk'] group-hover:text-blue-600 transition-colors">
                    {product.name[lang]}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {product.tagline[lang]}
                  </p>
                </div>

                {/* Engine Architecture Tag */}
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-2 mb-4">
                  <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="truncate">{product.engineArchitecture}</span>
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {product.shortDescription[lang]}
                </p>

                {/* Version Selector & Releases Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-blue-600" />
                      {t.products.selectVersion}
                    </span>
                    {/* Version Pills */}
                    <div className="flex gap-1.5">
                      {product.versions.map((ver) => (
                        <button
                          key={ver.version}
                          onClick={() => handleVersionChange(product.id, ver.version)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                            currentVerStr === ver.version
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                          }`}
                        >
                          {ver.version}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current selected release info */}
                  {currentVersionObj && (
                    <div className="space-y-2 border-t border-slate-200 pt-3 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-slate-800 truncate pr-2">
                          {currentVersionObj.title[lang]}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-500 whitespace-nowrap">
                          <Calendar className="h-3 w-3" />
                          {currentVersionObj.date}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {currentVersionObj.description[lang]}
                      </p>
                      {/* Changes bullet list */}
                      <ul className="space-y-1 pt-1">
                        {currentVersionObj.changes[lang].slice(0, 2).map((ch, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span className="truncate">{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Action Links (Demo + GitHub) */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Demo Button */}
                  <button
                    onClick={() => onOpenDemo(product, currentVersionObj)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r ${theme.buttonGradient} py-3 px-3 text-xs font-bold text-white shadow-md transition-all`}
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{t.products.viewDemo}</span>
                  </button>

                  {/* GitHub Repo Button */}
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 px-3 text-xs font-bold text-slate-700 hover:border-slate-300 hover:text-blue-600 shadow-xs transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                </div>

                {/* Key Features */}
                <div className="space-y-2.5 mb-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.products.keyFeatures}
                  </p>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800 font-semibold">{feat.title[lang]}:</strong>{' '}
                          {feat.desc[lang]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Checkout CTA */}
                <div className="mt-auto border-t border-slate-100 pt-5">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs font-medium text-slate-500">{t.products.hourlyFrom}</span>
                      <p className="text-lg font-extrabold text-slate-900">
                        {product.hourlyPriceUah} {t.products.perHour}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-slate-500">{t.products.monthlyFrom}</span>
                      <p className="text-lg font-extrabold text-blue-600">
                        {product.monthlyPriceUah} {t.products.perMonth}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onSelectPlanForProduct(product, 'hourly')}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    >
                      {lang === 'uk' ? 'Погодинно' : 'Hourly Access'}
                    </button>
                    <button
                      onClick={() => onSelectPlanForProduct(product, 'monthly')}
                      className="w-full rounded-xl bg-slate-900 py-2.5 px-2 text-center text-xs font-bold text-white hover:bg-blue-600 shadow-xs transition-colors"
                    >
                      {lang === 'uk' ? 'Місячний доступ' : 'Monthly Plan'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
