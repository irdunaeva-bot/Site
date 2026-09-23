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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Studio Logo in Murka Style */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
            <Code2 className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-['Space_Grotesk']">
                RECREATE
              </span>
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-700 tracking-wider">
                ТОВ «РЕКРІЄЙТ»
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-medium">
              {lang === 'uk' ? 'Українська продуктова IT-студія' : 'Ukrainian Product IT Studio'}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a
            href="#products"
            className="hover:text-blue-600 transition-colors duration-150 py-1"
          >
            {t.nav.products}
          </a>
          <a
            href="#about"
            className="hover:text-blue-600 transition-colors duration-150 py-1"
          >
            {t.nav.about}
          </a>
          <a
            href="#values"
            className="hover:text-blue-600 transition-colors duration-150 py-1"
          >
            {t.nav.values}
          </a>
          <a
            href="#milestones"
            className="hover:text-blue-600 transition-colors duration-150 py-1"
          >
            {t.nav.milestones}
          </a>
          <a
            href="#pricing"
            className="hover:text-blue-600 transition-colors duration-150 py-1"
          >
            {t.nav.pricing}
          </a>
          <a
            href="#contacts"
            className="hover:text-blue-600 transition-colors duration-150 py-1"
          >
            {t.nav.contacts}
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Active License status button */}
          {hasActiveLicense ? (
            <button
              onClick={onOpenMyAccess}
              className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 shadow-xs transition-colors"
              title={lang === 'uk' ? 'Активна ліцензія ТОВ' : 'Active LLC License'}
            >
              <KeyRound className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span>{t.nav.myAccess}</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </button>
          ) : (
            <button
              onClick={onOpenMyAccess}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:text-blue-600 shadow-xs transition-colors"
            >
              <KeyRound className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">{t.nav.myAccess}</span>
            </button>
          )}

          {/* Edit Custom Repos & Demos gear */}
          <button
            onClick={onOpenEditLinks}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-xs transition-colors"
            title={t.nav.editLinks}
            aria-label={t.nav.editLinks}
          >
            <Settings2 className="h-4 w-4" />
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              onClick={() => onLanguageChange('uk')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                lang === 'uk'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-2.5 shadow-lg">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-blue-600 py-1"
          >
            {t.nav.products}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-blue-600 py-1"
          >
            {t.nav.about}
          </a>
          <a
            href="#values"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-blue-600 py-1"
          >
            {t.nav.values}
          </a>
          <a
            href="#milestones"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-blue-600 py-1"
          >
            {t.nav.milestones}
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-blue-600 py-1"
          >
            {t.nav.pricing}
          </a>
          <a
            href="#contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-blue-600 py-1"
          >
            {t.nav.contacts}
          </a>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">WayForPay Verified Gateway</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> {lang === 'uk' ? 'ТОВ «Рекрієйт»' : 'LLC «Recreate»'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
