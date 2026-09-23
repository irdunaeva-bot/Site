import React, { useState } from 'react';
import { Language, ActiveLicense } from '../types';
import { translations } from '../data/translations';
import {
  Code2,
  KeyRound,
  Settings2,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeLicenses: ActiveLicense[];
  onOpenEditLinks: () => void;
  onOpenMyAccess: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  activeLicenses,
  onOpenEditLinks,
  onOpenMyAccess,
}) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hasActiveLicense = activeLicenses.some((l) => l.expiresAt > Date.now());

  return (
    <header className="sticky top-0 z-40 w-full max-w-full border-b border-[#133458]/10 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Studio Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
          <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#133458] via-[#1c4b7e] to-[#D99B21] text-white shadow-md shadow-[#133458]/25 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#838921] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#838921]"></span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#133458] font-['Space_Grotesk'] leading-none">
                RECREATE
              </span>
              <span className="hidden sm:inline-block rounded-full bg-[#FAF7BB] border border-[#D99B21]/40 px-2 py-0.5 text-[10px] font-bold text-[#133458] tracking-wider">
                ТОВ «РЕКРІЄЙТ»
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[#838921] font-semibold leading-none mt-0.5">
              {lang === 'uk' ? 'ТОВ «Рекрієйт» • IT-студія' : 'LLC «Recreate» • IT Studio'}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#133458]/80">
          <a
            href="#products"
            className="hover:text-[#D99B21] transition-colors duration-150 py-1"
          >
            {t.nav.products}
          </a>
          <a
            href="#about"
            className="hover:text-[#D99B21] transition-colors duration-150 py-1"
          >
            {t.nav.about}
          </a>
          <a
            href="#values"
            className="hover:text-[#D99B21] transition-colors duration-150 py-1"
          >
            {t.nav.values}
          </a>
          <a
            href="#milestones"
            className="hover:text-[#D99B21] transition-colors duration-150 py-1"
          >
            {t.nav.milestones}
          </a>
          <a
            href="#pricing"
            className="hover:text-[#D99B21] transition-colors duration-150 py-1"
          >
            {t.nav.pricing}
          </a>
          <a
            href="#contacts"
            className="hover:text-[#D99B21] transition-colors duration-150 py-1"
          >
            {t.nav.contacts}
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Active License status button */}
          {hasActiveLicense ? (
            <button
              onClick={onOpenMyAccess}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-[#838921]/40 bg-[#FAF7BB]/80 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-[#616616] hover:bg-[#FAF7BB] shadow-xs transition-colors"
              title={lang === 'uk' ? 'Активна ліцензія ТОВ' : 'Active LLC License'}
            >
              <KeyRound className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#838921] animate-pulse shrink-0" />
              <span className="hidden sm:inline">{t.nav.myAccess}</span>
              <span className="flex h-2 w-2 rounded-full bg-[#838921] shrink-0"></span>
            </button>
          ) : (
            <button
              onClick={onOpenMyAccess}
              className="flex items-center gap-1.5 rounded-xl border border-[#133458]/20 bg-white p-2 sm:px-3 sm:py-2 text-xs font-semibold text-[#133458] hover:border-[#D99B21] hover:text-[#D99B21] shadow-xs transition-colors"
              title={t.nav.myAccess}
            >
              <KeyRound className="h-3.5 w-3.5 text-[#133458]/60 shrink-0" />
              <span className="hidden sm:inline">{t.nav.myAccess}</span>
            </button>
          )}

          {/* Edit Custom Repos & Demos gear */}
          <button
            onClick={onOpenEditLinks}
            className="hidden sm:flex p-2 rounded-xl border border-[#133458]/20 bg-white text-[#133458]/70 hover:text-[#D99B21] hover:border-[#D99B21] shadow-xs transition-colors"
            title={t.nav.editLinks}
            aria-label={t.nav.editLinks}
          >
            <Settings2 className="h-4 w-4" />
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-xl border border-[#133458]/15 bg-[#FAF7BB]/40 p-0.5 sm:p-1">
            <button
              onClick={() => onLanguageChange('uk')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all ${
                lang === 'uk'
                  ? 'bg-[#133458] text-white shadow-xs'
                  : 'text-[#133458]/70 hover:text-[#133458]'
              }`}
            >
              UA
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-[#133458] text-white shadow-xs'
                  : 'text-[#133458]/70 hover:text-[#133458]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#133458]/20 text-[#133458] hover:bg-[#FAF7BB]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#133458]/10 bg-white px-4 py-4 space-y-2.5 shadow-lg max-w-full overflow-hidden">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#133458] hover:text-[#D99B21] py-1.5"
          >
            {t.nav.products}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#133458] hover:text-[#D99B21] py-1.5"
          >
            {t.nav.about}
          </a>
          <a
            href="#values"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#133458] hover:text-[#D99B21] py-1.5"
          >
            {t.nav.values}
          </a>
          <a
            href="#milestones"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#133458] hover:text-[#D99B21] py-1.5"
          >
            {t.nav.milestones}
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#133458] hover:text-[#D99B21] py-1.5"
          >
            {t.nav.pricing}
          </a>
          <a
            href="#contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#133458] hover:text-[#D99B21] py-1.5"
          >
            {t.nav.contacts}
          </a>

          {/* Additional quick actions in mobile menu */}
          <div className="pt-2 border-t border-[#133458]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditLinks();
              }}
              className="flex items-center gap-2 text-left text-xs font-semibold text-[#133458]/80 hover:text-[#D99B21] py-1.5"
            >
              <Settings2 className="h-4 w-4 text-[#133458]/50" />
              <span>{t.nav.editLinks}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyAccess();
              }}
              className="flex items-center gap-2 text-left text-xs font-semibold text-[#133458]/80 hover:text-[#D99B21] py-1.5"
            >
              <KeyRound className="h-4 w-4 text-[#133458]/50" />
              <span>{t.nav.myAccess}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#133458]/10 flex items-center justify-between">
            <span className="text-xs text-[#133458]/60">WayForPay Verified Gateway</span>
            <span className="text-xs font-semibold text-[#838921] flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> {lang === 'uk' ? 'ТОВ «Рекрієйт»' : 'LLC «Recreate»'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
