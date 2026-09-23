import React, { useState, useEffect } from 'react';
import { ActiveLicense, Language } from '../types';
import { translations } from '../data/translations';
import {
  X,
  KeyRound,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface MyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLicenses: ActiveLicense[];
  lang: Language;
  onDeleteLicense: (orderRef: string) => void;
  onExtendPlan: () => void;
}

export const MyAccessModal: React.FC<MyAccessModalProps> = ({
  isOpen,
  onClose,
  activeLicenses,
  lang,
  onDeleteLicense,
  onExtendPlan,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatRemainingTime = (expiresAt: number) => {
    const diff = expiresAt - currentTime;
    if (diff <= 0) return lang === 'uk' ? 'Термін минув' : 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${lang === 'uk' ? 'днів' : 'days'} ${hours % 24} ${lang === 'uk' ? 'год' : 'hrs'}`;
    }
    return `${hours} ${lang === 'uk' ? 'год' : 'h'} : ${minutes} ${lang === 'uk' ? 'хв' : 'm'} : ${seconds} ${lang === 'uk' ? 'с' : 's'}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-500 text-white shadow-xs shrink-0">
              <KeyRound className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Space_Grotesk'] leading-tight">
                {t.activeAccess.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {lang === 'uk'
                  ? 'Керування оплаченими ліцензіями та ключами доступу ТОВ «Рекрієйт»'
                  : 'Manage paid licenses and access keys of LLC «Recreate»'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-grow bg-slate-50/50">
          {activeLicenses.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <KeyRound className="h-12 w-12 text-slate-400 mx-auto" />
              <p className="text-sm text-slate-800 font-bold">
                {lang === 'uk' ? 'У вас поки немає активних ліцензій' : 'You do not have active licenses yet'}
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {lang === 'uk'
                  ? 'Оберіть потрібний програмний продукт та оформіть погодинний або місячний доступ через WayForPay.'
                  : 'Choose the software product you need and subscribe to hourly or monthly access via WayForPay.'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExtendPlan();
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>{lang === 'uk' ? 'Обрати тариф та програму' : 'Choose Plan & Software'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeLicenses.map((lic) => {
                const isExpired = lic.expiresAt < currentTime;

                return (
                  <div
                    key={lic.orderReference}
                    className={`rounded-2xl border p-5 transition-all ${
                      isExpired
                        ? 'border-slate-200 bg-slate-100 opacity-70'
                        : 'border-emerald-200 bg-emerald-50/50 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5">
                          {lic.planType.includes('hourly')
                            ? (lang === 'uk' ? 'Погодинний доступ' : 'Hourly Access')
                            : (lang === 'uk' ? 'Місячна підписка' : 'Monthly Subscription')}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1.5">{lic.productName}</h4>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                            isExpired
                              ? 'bg-slate-200 text-slate-600'
                              : 'bg-emerald-100 border border-emerald-200 text-emerald-800'
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          {formatRemainingTime(lic.expiresAt)}
                        </span>
                      </div>
                    </div>

                    {/* Key Box */}
                    <div className="rounded-xl bg-white border border-slate-200 p-3 flex items-center justify-between gap-2 mb-3 shadow-2xs">
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-700">
                        <span className="text-slate-500 font-sans font-medium">{t.activeAccess.key}</span>
                        <span className="font-bold">{lic.licenseKey}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(lic.licenseKey)}
                        className="p-1 rounded text-slate-500 hover:text-slate-900"
                        title="Copy key"
                      >
                        {copiedKey === lic.licenseKey ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                      <span>{lang === 'uk' ? 'Замовлення:' : 'Order:'} {lic.orderReference}</span>
                      <button
                        onClick={() => onDeleteLicense(lic.orderReference)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-semibold"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>{lang === 'uk' ? 'Видалити' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {lang === 'uk' ? 'ТОВ «Рекрієйт» • WayForPay Сертифіковано' : 'LLC «Recreate» • WayForPay Certified'}
          </span>
          <button
            onClick={() => {
              onClose();
              onExtendPlan();
            }}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white transition-colors shadow-2xs"
          >
            {t.activeAccess.extend}
          </button>
        </div>
      </div>
    </div>
  );
};
