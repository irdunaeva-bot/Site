import React, { useState, useEffect } from 'react';
import { ActiveLicense, Language } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface ActiveAccessBannerProps {
  licenses: ActiveLicense[];
  lang: Language;
  onOpenMyAccess: () => void;
}

export const ActiveAccessBanner: React.FC<ActiveAccessBannerProps> = ({
  licenses,
  lang,
  onOpenMyAccess,
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const validLicenses = licenses.filter((l) => l.expiresAt > currentTime);
  if (validLicenses.length === 0) return null;

  const primary = validLicenses[0];
  const diff = primary.expiresAt - currentTime;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const timeFormatted =
    hours > 24
      ? `${Math.floor(hours / 24)} ${lang === 'uk' ? 'дн' : 'd'} ${hours % 24} ${lang === 'uk' ? 'год' : 'h'}`
      : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="bg-gradient-to-r from-[#FAF7BB] via-[#FAF7BB]/80 to-[#FAF7BB]/50 border-b border-[#838921]/30 px-3.5 sm:px-4 py-2 text-xs w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#838921] animate-pulse shrink-0" />
          <span className="font-bold text-[#616616] shrink-0">
            {lang === 'uk' ? 'Активний доступ:' : 'Active License:'}
          </span>
          <span className="text-[#133458] font-semibold truncate max-w-[120px] sm:max-w-none">{primary.productName}</span>
          <span className="text-[#133458]/60 font-mono hidden md:inline">
            ({primary.licenseKey})
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 font-mono font-bold text-[#616616] bg-white px-2 sm:px-2.5 py-0.5 rounded-lg border border-[#838921]/30 shadow-2xs text-[11px] sm:text-xs">
            <Clock className="h-3 w-3 text-[#838921] shrink-0" />
            <span>{timeFormatted}</span>
          </div>

          <button
            onClick={onOpenMyAccess}
            className="flex items-center gap-1 font-bold text-[#133458] hover:text-[#D99B21] transition-colors text-xs"
          >
            <span>{lang === 'uk' ? 'Керувати доступом' : 'Manage Access'}</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
