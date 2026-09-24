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

  // Color theme helpers for palette: Navy (#133458), Olive (#838921), Gold (#D99B21), Cream (#FAF7BB)
  const getProductColorTheme = (id: string) => {
    if (id === 'documind-ai') {
      return {
        badgeBg: 'bg-[#133458]/10 text-[#133458] border-[#133458]/25',
        accentGradient: 'from-[#133458] to-[#1b497c]',
        buttonGradient: 'from-[#133458] to-[#1b497c] hover:from-[#0c223a] hover:to-[#133458] shadow-[#133458]/20',
        lightBg: 'bg-[#133458]/5',
        ringColor: 'hover:border-[#133458]/50',
      };
    }
    if (id === 'visioncraft-studio') {
      return {
        badgeBg: 'bg-[#FAF7BB] text-[#b88219] border-[#D99B21]/40',
        accentGradient: 'from-[#D99B21] to-[#e5ad3a]',
        buttonGradient: 'from-[#D99B21] to-[#b88219] hover:from-[#b88219] hover:to-[#966810] shadow-[#D99B21]/20',
        lightBg: 'bg-[#FAF7BB]/40',
        ringColor: 'hover:border-[#D99B21]/50',
      };
    }
    return {
      badgeBg: 'bg-[#FAF7BB] text-[#616616] border-[#838921]/40',
      accentGradient: 'from-[#838921] to-[#9ea52a]',
      buttonGradient: 'from-[#838921] to-[#616616] hover:from-[#616616] hover:to-[#464a0f] shadow-[#838921]/20',
      lightBg: 'bg-[#FAF7BB]/30',
      ringColor: 'hover:border-[#838921]/50',
    };
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-white border-b border-[#133458]/10 w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D99B21]/40 bg-[#FAF7BB]/60 px-3.5 py-1 text-xs font-bold text-[#133458] mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#D99B21] shrink-0" />
            <span>{t.products.sectionKicker}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#133458] tracking-tight font-['Space_Grotesk']">
            {t.products.sectionTitle}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#133458]/70 leading-relaxed">
            {t.products.sectionSubtitle}
          </p>
        </div>

        {/* Products Grid - 3 Distinct Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => {
            const currentVerStr = selectedVersions[product.id] || product.currentVersion;
            const currentVersionObj =
              product.versions.find((v) => v.version === currentVerStr) || product.versions[0];
            const theme = getProductColorTheme(product.id);

            return (
              <div
                key={product.id}
                className={`group relative flex flex-col rounded-2xl sm:rounded-3xl border border-[#133458]/15 bg-white p-4 sm:p-7 lg:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${theme.ringColor}`}
              >
                {/* 100% In-house badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${theme.badgeBg}`}>
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    {t.products.inHouseBadge}
                  </span>
                  <span className="text-[11px] font-semibold text-[#133458]/60 uppercase tracking-wider">
                    {product.category[lang]}
                  </span>
                </div>

                {/* Product Title */}
                <div className="mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#133458] font-['Space_Grotesk'] group-hover:text-[#D99B21] transition-colors">
                    {product.name[lang]}
                  </h3>
                  <p className="text-xs font-semibold text-[#838921] mt-1">
                    {product.tagline[lang]}
                  </p>
                </div>

                {/* Engine Architecture Tag */}
                <div className="rounded-xl bg-[#FAF7BB]/30 border border-[#133458]/10 px-3 py-2 mb-4">
                  <p className="text-[11px] font-semibold text-[#133458]/80 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#838921] animate-pulse shrink-0"></span>
                    <span className="truncate">{product.engineArchitecture}</span>
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#133458]/70 leading-relaxed mb-5">
                  {product.shortDescription[lang]}
                </p>

                {/* Version Selector & Releases Box */}
                <div className="rounded-2xl border border-[#133458]/15 bg-[#FAF7BB]/20 p-3 sm:p-4 mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[#133458] flex items-center gap-1.5 shrink-0">
                      <GitBranch className="h-3.5 w-3.5 text-[#838921] shrink-0" />
                      {t.products.selectVersion}
                    </span>
                    {/* Version Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.versions.map((ver) => (
                        <button
                          key={ver.version}
                          onClick={() => handleVersionChange(product.id, ver.version)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                            currentVerStr === ver.version
                              ? 'bg-[#133458] text-[#FAF7BB] shadow-xs'
                              : 'bg-white text-[#133458]/70 hover:text-[#133458] border border-[#133458]/15'
                          }`}
                        >
                          {ver.version}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current selected release info */}
                  {currentVersionObj && (
                    <div className="space-y-2 border-t border-[#133458]/10 pt-3 text-xs">
                      <div className="flex items-center justify-between text-[#133458] gap-2">
                        <span className="font-bold text-[#133458] truncate">
                          {currentVersionObj.title[lang]}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#133458]/60 whitespace-nowrap shrink-0">
                          <Calendar className="h-3 w-3" />
                          {currentVersionObj.date}
                        </span>
                      </div>
                      <p className="text-[#133458]/75 leading-relaxed text-[11px] sm:text-xs">
                        {currentVersionObj.description[lang]}
                      </p>
                      {/* Changes bullet list */}
                      <ul className="space-y-1 pt-1">
                        {currentVersionObj.changes[lang].slice(0, 2).map((ch, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[#133458]/85 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#838921] shrink-0 mt-1" />
                            <span className="break-words leading-tight">{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Software Link Display */}
                <div className="mb-4 rounded-xl bg-[#FAF7BB]/30 border border-[#133458]/10 p-2.5 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-[#838921] shrink-0"></span>
                    <span className="text-[#133458]/60 font-medium shrink-0">
                      {lang === 'uk' ? 'Посилання:' : 'Link:'}
                    </span>
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-[#133458] hover:text-[#D99B21] hover:underline truncate"
                      title={product.demoUrl}
                    >
                      {product.demoUrl}
                    </a>
                  </div>
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[#133458] hover:text-[#D99B21] flex items-center gap-0.5 font-bold"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Direct Action Links (Open Live + Simulator + GitHub) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-5">
                  {/* Direct Launch Button */}
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r ${theme.buttonGradient} py-2.5 px-3 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all w-full min-w-0`}
                  >
                    <span>{lang === 'uk' ? 'Відкрити онлайн ПЗ' : 'Launch Online App'}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>

                  {/* Simulator / Demo Button */}
                  <button
                    onClick={() => onOpenDemo(product, currentVersionObj)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[#133458]/20 bg-white py-2.5 px-3 text-xs font-bold text-[#133458] hover:border-[#838921] hover:bg-[#FAF7BB]/30 hover:text-[#838921] shadow-xs transition-colors w-full min-w-0"
                  >
                    <Play className="h-3.5 w-3.5 fill-current text-[#838921] shrink-0" />
                    <span className="truncate">{lang === 'uk' ? 'Демо-огляд' : 'Demo Overview'}</span>
                  </button>
                </div>

                {/* Key Features */}
                <div className="space-y-2.5 mb-5 border-t border-[#133458]/10 pt-4">
                  <p className="text-xs font-bold text-[#133458]/60 uppercase tracking-wider">
                    {t.products.keyFeatures}
                  </p>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#133458]/75">
                        <CheckCircle2 className="h-4 w-4 text-[#838921] shrink-0 mt-0.5" />
                        <span className="break-words">
                          <strong className="text-[#133458] font-semibold">{feat.title[lang]}:</strong>{' '}
                          {feat.desc[lang]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Checkout CTA */}
                <div className="mt-auto border-t border-[#133458]/10 pt-4">
                  <div className="flex items-center justify-between text-[11px] text-[#133458]/60 mb-2.5">
                    <span className="font-medium text-[#133458]/60">{lang === 'uk' ? 'Репозиторій коду:' : 'Source Repository:'}</span>
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#133458] hover:text-[#D99B21] transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="h-2.5 w-2.5 text-[#133458]/50" />
                    </a>
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs font-medium text-[#133458]/60">{t.products.hourlyFrom}</span>
                      <p className="text-base sm:text-lg font-extrabold text-[#133458]">
                        {product.hourlyPriceUah} {t.products.perHour}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-[#133458]/60">{t.products.monthlyFrom}</span>
                      <p className="text-base sm:text-lg font-extrabold text-[#D99B21]">
                        {product.monthlyPriceUah} {t.products.perMonth}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    <button
                      onClick={() => onSelectPlanForProduct(product, 'hourly')}
                      className="w-full min-w-0 rounded-xl border border-[#133458]/20 bg-[#FAF7BB]/30 py-2.5 px-2 text-center text-xs font-bold text-[#133458] hover:bg-[#FAF7BB] hover:border-[#D99B21]/50 transition-colors truncate"
                    >
                      {lang === 'uk' ? 'Погодинно' : 'Hourly Access'}
                    </button>
                    <button
                      onClick={() => onSelectPlanForProduct(product, 'monthly')}
                      className="w-full min-w-0 rounded-xl bg-[#133458] py-2.5 px-2 text-center text-xs font-bold text-white hover:bg-[#D99B21] shadow-xs transition-colors truncate"
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
