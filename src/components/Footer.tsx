import React from 'react';
import { Language, CompanyRequisites } from '../types';
import { translations } from '../data/translations';
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  Code2,
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  company: CompanyRequisites;
  onOpenLegal: (tab: 'offer' | 'privacy' | 'refund') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, company, onOpenLegal }) => {
  const t = translations[lang];

  return (
    <footer id="contacts" className="border-t border-[#133458]/20 bg-[#133458] text-[#FAF7BB]/80 text-xs w-full max-w-full overflow-hidden">
      {/* Top Company Info Block */}
      <div id="company-info" className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Col 1: About TOV Recreate */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D99B21] text-[#133458] shadow-xs">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold font-['Space_Grotesk'] text-[#FAF7BB]">
                RECREATE
              </span>
            </div>
            <p className="text-[#FAF7BB]/70 leading-relaxed text-xs">
              {t.footer.aboutCompany}
            </p>
            <div className="inline-block rounded-lg bg-[#FAF7BB]/10 border border-[#FAF7BB]/20 px-3 py-1 text-[#FAF7BB] font-mono text-xs font-bold shadow-2xs">
              {t.footer.edrpou}
            </div>
          </div>

          {/* Col 2: Requisites & Address */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#D99B21] uppercase tracking-wider">
              {lang === 'uk' ? 'Юридична адреса' : 'Legal Address'}
            </h4>
            <div className="flex items-start gap-2 text-[#FAF7BB]/80">
              <MapPin className="h-4 w-4 text-[#D99B21] shrink-0 mt-0.5" />
              <span>{lang === 'uk' ? company.addressUk : company.addressEn}</span>
            </div>
            <div className="flex items-center gap-2 text-[#FAF7BB]/60 pt-1">
              <Building2 className="h-4 w-4 text-[#FAF7BB]/40 shrink-0" />
              <span>{lang === 'uk' ? company.bankUk : company.bankEn}</span>
            </div>
          </div>

          {/* Col 3: Contacts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#D99B21] uppercase tracking-wider">
              {t.footer.contacts}
            </h4>
            <div className="flex items-center gap-2 text-[#FAF7BB] font-medium">
              <Phone className="h-4 w-4 text-[#D99B21] shrink-0" />
              <a href={`tel:${company.phone}`} className="hover:text-[#D99B21] transition-colors">
                {company.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[#FAF7BB] font-medium">
              <Mail className="h-4 w-4 text-[#D99B21] shrink-0" />
              <a href={`mailto:${company.email}`} className="hover:text-[#D99B21] transition-colors">
                {company.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[#FAF7BB]/60 pt-1">
              <Clock className="h-4 w-4 text-[#FAF7BB]/40 shrink-0" />
              <span>{lang === 'uk' ? company.supportHoursUk : company.supportHoursEn}</span>
            </div>
          </div>

          {/* Col 4: WayForPay & Payment Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#D99B21] uppercase tracking-wider">
              {lang === 'uk' ? 'Безпека платежів' : 'Payment Security'}
            </h4>
            <div className="rounded-2xl border border-[#FAF7BB]/20 bg-[#FAF7BB]/10 p-4 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[#FAF7BB] font-bold">
                <ShieldCheck className="h-4 w-4 text-[#D99B21]" />
                <span>WayForPay Certified</span>
              </div>
              <p className="text-[11px] text-[#FAF7BB]/70 leading-relaxed">
                {lang === 'uk'
                  ? 'Платежі захищено стандартом PCI DSS Level 1 та 3D-Secure.'
                  : 'Payments are secured with PCI DSS Level 1 and 3D-Secure standards.'}
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-[#FAF7BB] pt-1 border-t border-[#FAF7BB]/15">
                <span className="bg-[#FAF7BB]/20 px-2 py-0.5 rounded">Visa</span>
                <span className="bg-[#FAF7BB]/20 px-2 py-0.5 rounded">Mastercard</span>
                <span className="bg-[#FAF7BB]/20 px-2 py-0.5 rounded">Apple Pay</span>
                <span className="bg-[#FAF7BB]/20 px-2 py-0.5 rounded">Google Pay</span>
                <span className="bg-[#FAF7BB]/20 px-2 py-0.5 rounded">Privat24</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Documents Links Bar */}
        <div className="border-t border-[#FAF7BB]/15 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-semibold">
            <button
              onClick={() => onOpenLegal('offer')}
              className="text-[#FAF7BB]/80 hover:text-[#D99B21] transition-colors"
            >
              {t.footer.publicOffer}
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-[#FAF7BB]/80 hover:text-[#D99B21] transition-colors"
            >
              {t.footer.privacyPolicy}
            </button>
            <button
              onClick={() => onOpenLegal('refund')}
              className="text-[#FAF7BB]/80 hover:text-[#D99B21] transition-colors"
            >
              {t.footer.refundPolicy}
            </button>
          </div>

          <div className="text-[#FAF7BB]/60 text-[11px]">
            {t.footer.allRights}
          </div>
        </div>
      </div>
    </footer>
  );
};
