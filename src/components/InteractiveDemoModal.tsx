import React, { useState } from 'react';
import { Product, Language, ProductVersion } from '../types';
import { translations } from '../data/translations';
import {
  X,
  ExternalLink,
  Github,
  Play,
  FileText,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  BarChart3,
  Image as ImageIcon,
  Terminal,
  Clock,
  CreditCard,
  ShieldCheck,
  Building2,
  Users,
  HeartPulse,
  DollarSign,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface InteractiveDemoModalProps {
  product: Product | null;
  initialVersion?: ProductVersion;
  lang: Language;
  onClose: () => void;
  onUnlockAccess: (product: Product, plan: 'hourly' | 'monthly') => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  product,
  initialVersion,
  lang,
  onClose,
  onUnlockAccess,
}) => {
  if (!product) return null;

  const t = translations[lang];
  const [selectedVer, setSelectedVer] = useState<string>(
    initialVersion?.version || product.currentVersion
  );

  // Copied state
  const [copied, setCopied] = useState(false);

  // Child-centr simulation state
  const [childTab, setChildTab] = useState<'dossier' | 'medical' | 'reports'>('dossier');
  const [selectedPupil, setSelectedPupil] = useState<'p1' | 'p2' | 'p3'>('p1');

  // Vytraty simulation state
  const [vytratyTab, setVytratyTab] = useState<'assets' | 'ledger' | 'taxes'>('taxes');
  const [quarterRevenue, setQuarterRevenue] = useState<number>(385000);

  // Chastka Realty simulation state
  const [realtyTab, setRealtyTab] = useState<'marketplace' | 'calculator' | 'dividends'>('calculator');
  const [investAmountUsd, setInvestAmountUsd] = useState<number>(500);
  const [selectedObject, setSelectedObject] = useState<'hotel' | 'warehouse' | 'retail'>('hotel');

  const activeVersionObj =
    product.versions.find((v) => v.version === selectedVer) || product.versions[0];

  const handleCopyJson = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-3.5 sm:px-6 py-3 sm:py-4 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600 text-white shadow-xs shrink-0">
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Space_Grotesk'] truncate">
                  {product.name[lang]}
                </h3>
                <span className="rounded-full bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 text-[11px] sm:text-xs font-bold shrink-0">
                  {selectedVer}
                </span>
                <span className="hidden xs:inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-800 shrink-0">
                  <ShieldCheck className="h-3 w-3" />
                  {t.demoModal.inHouseDev}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{product.tagline[lang]}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Direct external links */}
            <a
              href={product.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 shadow-2xs transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>

            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors shadow-xs"
            >
              <span>{lang === 'uk' ? 'Перейти до ПЗ' : 'Launch App'}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Subheader: Version Tabs & Commit Hash */}
        <div className="bg-white border-b border-slate-200 px-3.5 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold">{t.demoModal.version}</span>
            <div className="flex gap-1.5">
              {product.versions.map((v) => (
                <button
                  key={v.version}
                  onClick={() => setSelectedVer(v.version)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedVer === v.version
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {v.version} {v.isLatest && `(${t.products.latestBadge})`}
                </button>
              ))}
            </div>
          </div>
          <div className="text-slate-500 flex items-center gap-1.5 font-medium">
            <span className="font-bold text-slate-700">Commit:</span>
            <code className="text-blue-600 font-mono font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
              {activeVersionObj.commitHash}
            </code>
            <span className="text-slate-300">•</span>
            <span>{activeVersionObj.date}</span>
          </div>
        </div>

        {/* Direct Link Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-2.5 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">
              {lang === 'uk' ? 'Офіційне онлайн посилання на ПЗ:' : 'Official live software link:'}
            </span>
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono underline font-bold bg-white/20 px-2 py-0.5 rounded hover:bg-white/30 transition-colors"
            >
              {product.demoUrl}
            </a>
          </div>
          <a
            href={product.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-white text-blue-700 font-bold px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors shadow-xs"
          >
            <span>{lang === 'uk' ? 'Відкрити у повному вікні' : 'Open in Full Window'}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Modal Body: Interactive Functional Simulator */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-grow bg-slate-50/60">
          
          {/* SIMULATOR 1: child-centr */}
          {product.mockPreviewType === 'child-centr' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">
                      {lang === 'uk' ? 'Модулі системи автоматизації:' : 'Automation System Modules:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setChildTab('dossier')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        childTab === 'dossier'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Особові справи & ІПР (4.1)' : 'Pupil Dossier & IPR (4.1)'}
                    </button>
                    <button
                      onClick={() => setChildTab('medical')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        childTab === 'medical'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Медичний блок 079/о (4.4)' : 'Medical Block 079/o (4.4)'}
                    </button>
                    <button
                      onClick={() => setChildTab('reports')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        childTab === 'reports'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Звітність Мінсоц & ССД (4.7)' : 'SSD & Ministry Reports (4.7)'}
                    </button>
                  </div>
                </div>

                {/* Pupil Selector */}
                {childTab === 'dossier' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">
                        {lang === 'uk' ? 'Оберіть вихованця:' : 'Select pupil:'}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedPupil('p1')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            selectedPupil === 'p1' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Коваленко Максим (12 р.)
                        </button>
                        <button
                          onClick={() => setSelectedPupil('p2')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            selectedPupil === 'p2' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Мельник Софія (9 р.)
                        </button>
                        <button
                          onClick={() => setSelectedPupil('p3')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            selectedPupil === 'p3' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Шевченко Богдан (15 р.)
                        </button>
                      </div>
                    </div>

                    {/* Dossier Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                          <span className="font-bold text-slate-900">
                            {selectedPupil === 'p1' ? 'Коваленко Максим Олександрович' : selectedPupil === 'p2' ? 'Мельник Софія Сергіївна' : 'Шевченко Богдан Ігорович'}
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                            {lang === 'uk' ? 'Активний статус' : 'Active Status'}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-slate-600">
                          <div className="flex justify-between">
                            <span className="text-slate-500">{lang === 'uk' ? 'Підстава прийому:' : 'Admission Grounds:'}</span>
                            <span className="font-semibold text-slate-800">Рішення ССД № 142/26</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{lang === 'uk' ? 'ІПР план:' : 'IPR Roadmap:'}</span>
                            <span className="font-bold text-blue-600">4 з 5 етапів пройдено (80%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{lang === 'uk' ? 'Освітня база (ЄДЕБО):' : 'EDEBO synced:'}</span>
                            <span className="font-semibold text-slate-800">Ліцей № 24, 7-Б клас</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{lang === 'uk' ? 'Закріплений ФОП-фахівець:' : 'Contract Specialist:'}</span>
                            <span className="font-semibold text-slate-800">Психолог Грищенко О.В. (ФОП)</span>
                          </div>
                        </div>
                      </div>

                      {/* Audit Log Box */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                            <Terminal className="h-3.5 w-3.5 text-blue-400" />
                            WORM Cryptographic Audit Log
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-mono">
                            VERIFIED
                          </span>
                        </div>
                        <pre className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl overflow-x-auto max-h-40 leading-relaxed border border-slate-800">
{`{
  "record_id": "REHAB-2026-${selectedPupil.toUpperCase()}",
  "module": "4.1 Dossier & 4.2 IPR",
  "audit_standard": "WORM-Immutable-Log",
  "hash": "e93f81c9a41b2e8870198fba01",
  "timestamp": "2026-09-23T11:42:15Z",
  "actor": "ТОВ «Рекрієйт» (ЄДРПОУ 44829103)",
  "compliance": "Закон України «Про захист персональних даних»"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Medical View */}
                {childTab === 'medical' && (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HeartPulse className="h-4 w-4 text-rose-600" />
                        <span className="font-bold text-slate-900">
                          {lang === 'uk' ? 'Медичний блок: Довідка форми 079/о та огляди' : 'Medical Block: Form 079/o and Examinations'}
                        </span>
                      </div>
                      <span className="text-blue-700 font-bold bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                        {lang === 'uk' ? 'Модуль 4.4 Захищено' : 'Module 4.4 Protected'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-medium">{lang === 'uk' ? 'Вакцинація за віком:' : 'Vaccinations:'}</span>
                        <p className="font-bold text-emerald-600 mt-1">100% Завершено</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-medium">{lang === 'uk' ? 'Дієтичний стіл:' : 'Dietary Plan:'}</span>
                        <p className="font-bold text-slate-800 mt-1">Стіл № 5 (Гіпоалергенний)</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-medium">{lang === 'uk' ? 'Плановий огляд педіатра:' : 'Next Checkup:'}</span>
                        <p className="font-bold text-blue-600 mt-1">26.09.2026 (ОКЛ Київ)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reports View */}
                {childTab === 'reports' && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                        <span className="font-bold text-slate-900">
                          {lang === 'uk' ? 'Регламентована державна звітність (Модуль 4.7)' : 'Statutory State Reports (Module 4.7)'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {lang === 'uk' ? 'Стандарти Мінсоцполітики 2026' : '2026 Standards'}
                      </span>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="font-semibold text-slate-800">Форма 1-ССД: Звіт про рух вихованців за поточний місяць</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Згенеровано (PDF/Excel)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="font-semibold text-slate-800">Відомість надання психолого-педагогічних послуг ФОП</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Готово до підписання КЕП</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATOR 2: vytraty */}
          {product.mockPreviewType === 'vytraty' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">
                      {lang === 'uk' ? 'Модулі моніторингу активів та податків:' : 'Asset & Tax Monitoring Modules:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setVytratyTab('taxes')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        vytratyTab === 'taxes'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'ФОП 3 група (5%) & Ліміт' : 'FOP 5% Tax & Cap'}
                    </button>
                    <button
                      onClick={() => setVytratyTab('assets')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        vytratyTab === 'assets'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Активи & Net Worth' : 'Assets & Net Worth'}
                    </button>
                    <button
                      onClick={() => setVytratyTab('ledger')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        vytratyTab === 'ledger'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Журнал витрат & Чеки' : 'Ledger & Receipts'}
                    </button>
                  </div>
                </div>

                {/* Tax Calculator Mode */}
                {vytratyTab === 'taxes' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">
                          {lang === 'uk' ? 'Дохід ФОП 3 групи за квартал (грн):' : 'Quarterly FOP Revenue (UAH):'}
                        </label>
                        <input
                          type="number"
                          value={quarterRevenue}
                          onChange={(e) => setQuarterRevenue(Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
                        />
                        <p className="text-[11px] text-slate-500">
                          {lang === 'uk' ? 'Річний ліміт доходу ФОП 3 групи: 8 280 000 ₴' : 'FOP 3 Group annual threshold: 8,280,000 UAH'}
                        </p>
                      </div>

                      {/* Calculations */}
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">{lang === 'uk' ? 'Єдиний податок (5%):' : 'Single Tax (5%):'}</span>
                          <span className="font-extrabold text-blue-700">
                            {Math.round(quarterRevenue * 0.05).toLocaleString('uk-UA')} ₴
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">{lang === 'uk' ? 'ЄСВ (22% за 3 міс):' : 'ESV (3 months):'}</span>
                          <span className="font-bold text-slate-800">5 280 ₴</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                          <span>{lang === 'uk' ? 'Разом до сплати в ДПС:' : 'Total Payable to Tax Office:'}</span>
                          <span className="text-emerald-700">
                            {(Math.round(quarterRevenue * 0.05) + 5280).toLocaleString('uk-UA')} ₴
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar: Annual Threshold */}
                    <div className="rounded-xl border border-slate-200 p-3 bg-white space-y-1.5 text-xs">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>{lang === 'uk' ? 'Моніторинг річного ліміту 8.28 млн грн:' : 'Annual UAH 8.28M Limit Progress:'}</span>
                        <span className="font-bold text-blue-700">
                          {((quarterRevenue * 3 / 8280000) * 100).toFixed(1)}% використано
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          style={{ width: `${Math.min(100, (quarterRevenue * 3 / 8280000) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assets & Net Worth */}
                {vytratyTab === 'assets' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <span className="text-slate-500 font-medium">{lang === 'uk' ? 'Загальні активи (Fair Value):' : 'Total Assets (Fair Value):'}</span>
                      <p className="text-lg font-bold text-slate-900 mt-1">2 850 000 ₴</p>
                      <span className="text-[11px] text-emerald-600 font-semibold">+8.4% переоцінка</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <span className="text-slate-500 font-medium">{lang === 'uk' ? 'Зобов’язання:' : 'Liabilities:'}</span>
                      <p className="text-lg font-bold text-slate-900 mt-1">140 000 ₴</p>
                      <span className="text-[11px] text-slate-500">Поточні рахунки</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5">
                      <span className="text-blue-700 font-bold">{lang === 'uk' ? 'Чистий капітал (Net Worth):' : 'Net Worth:'}</span>
                      <p className="text-lg font-extrabold text-blue-900 mt-1">2 710 000 ₴</p>
                      <span className="text-[11px] text-blue-700 font-semibold">Офіційний розрахунок</span>
                    </div>
                  </div>
                )}

                {/* Ledger & Receipts */}
                {vytratyTab === 'ledger' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-bold text-slate-800">Оренда офісного приміщення (вул. Жилянська)</p>
                          <p className="text-[11px] text-slate-500">Чек № 849103 • ТОВ «Рекрієйт»</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">-24 000.00 ₴</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-emerald-600" />
                        <div>
                          <p className="font-bold text-slate-800">Ліцензія на хмарні сервери та хостинг</p>
                          <p className="text-[11px] text-slate-500">Прив’язано фіскальний інвойс PDF</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">-6 450.00 ₴</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATOR 3: chastka-realty */}
          {product.mockPreviewType === 'chastka-realty' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">
                      {lang === 'uk' ? 'Модулі інвестування в нерухомість:' : 'Real Estate Investment Modules:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setRealtyTab('calculator')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        realtyTab === 'calculator'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Калькулятор ROI & Смарт-контракт' : 'ROI Calculator & ERC-3643'}
                    </button>
                    <button
                      onClick={() => setRealtyTab('marketplace')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        realtyTab === 'marketplace'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Маркетплейс часток (від $50)' : 'Marketplace (from $50)'}
                    </button>
                    <button
                      onClick={() => setRealtyTab('dividends')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        realtyTab === 'dividends'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Кабінет & Виплати на IBAN' : 'Cabinet & IBAN Payouts'}
                    </button>
                  </div>
                </div>

                {/* Calculator Mode */}
                {realtyTab === 'calculator' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-700">
                          {lang === 'uk' ? 'Сума інвестиції в частки (USD):' : 'Investment in shares (USD):'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="50"
                            max="5000"
                            step="50"
                            value={investAmountUsd}
                            onChange={(e) => setInvestAmountUsd(Number(e.target.value))}
                            className="w-full accent-blue-600"
                          />
                          <span className="font-extrabold text-blue-700 font-mono text-sm w-20 text-right">
                            ${investAmountUsd}
                          </span>
                        </div>

                        {/* Preset buttons */}
                        <div className="flex gap-1.5">
                          {[50, 200, 500, 1500, 3000].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setInvestAmountUsd(amt)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                investAmountUsd === amt
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              ${amt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Calculations Yield Display */}
                      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200 p-4 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">{lang === 'uk' ? 'Прогнозована річна ставка:' : 'Projected Annual ROI:'}</span>
                          <span className="font-extrabold text-emerald-600 text-sm">15.8% річних</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">{lang === 'uk' ? 'Щомісячний дивіденд на рахунок:' : 'Monthly Dividend Payout:'}</span>
                          <span className="font-bold text-slate-900 text-sm">
                            ${((investAmountUsd * 0.158) / 12).toFixed(2)} / міс (≈ {Math.round(((investAmountUsd * 0.158) / 12) * 41.5)} ₴)
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-blue-200 pt-2 font-bold">
                          <span className="text-blue-900">{lang === 'uk' ? 'Чистий прибуток за 3 роки:' : '3-Year Total Return:'}</span>
                          <span className="text-blue-700 text-sm">
                            +${(investAmountUsd * 0.158 * 3).toFixed(2)} USD
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Smart Contract ERC-3643 Badge */}
                    <div className="rounded-xl border border-slate-200 bg-slate-900 p-3 text-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>
                          {lang === 'uk'
                            ? 'Смарт-контракт ERC-3643: Право на виплату дивідендів захищено в блокчейні'
                            : 'ERC-3643 Smart Contract: Dividend entitlement immutably secured on-chain'}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-blue-300 bg-slate-800 px-2 py-0.5 rounded">
                        STANDARDS-COMPLIANT
                      </span>
                    </div>
                  </div>
                )}

                {/* Marketplace Mode */}
                {realtyTab === 'marketplace' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">Apart-Hotel Premier (Буковель)</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">16.5% ROI</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Готельний фонд класу Luxe, оператор Reikartz. Вхід від $50.</p>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Заповненість: 84%</span>
                        <span className="text-blue-600 font-bold">Зібрано 92% пулу</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">Логістичний парк West Hub (Львів)</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">15.2% ROI</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Складські площі класу А, довгострокова оренда Нова Пошта.</p>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Орендар: 100%</span>
                        <span className="text-blue-600 font-bold">Зібрано 78% пулу</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dividends Mode */}
                {realtyTab === 'dividends' && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900">
                        {lang === 'uk' ? 'Автоматичні виплати дивідендів на рахунки IBAN' : 'Automated Dividend Disbursements to IBAN'}
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Щомісяця 5 числа
                      </span>
                    </div>
                    <div className="space-y-1.5 text-slate-600">
                      <p>• {lang === 'uk' ? 'Прив’язка офіційного банківського IBAN для ТОВ та Фізичних осіб' : 'Direct IBAN settlement for LLC and private individuals'}</p>
                      <p>• {lang === 'uk' ? 'Автоматичне утримання податку на доходи (ПДФО 18% + ВЗ 1.5%) при виплаті' : 'Automated statutory tax withholding upon withdrawal'}</p>
                      <p>• {lang === 'uk' ? 'Експорт податкових виписок для декларацій' : 'One-click tax report generation for annual declaration'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Product description & version change details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              {activeVersionObj.title[lang]}
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {activeVersionObj.description[lang]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeVersionObj.changes[lang].map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer: Purchase Access CTA */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-slate-600 font-medium">
              {t.demoModal.buyToUnlock}
            </p>
            <p className="text-xs text-blue-700 font-bold">
              {lang === 'uk'
                ? 'Власник та розробник: ТОВ «Рекрієйт» • Миттєва оплата через WayForPay'
                : 'Developer & Owner: LLC «Recreate» • Instant checkout via WayForPay'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onUnlockAccess(product, 'hourly');
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-slate-300 hover:text-blue-600 shadow-2xs transition-colors"
            >
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              <span>{lang === 'uk' ? `Погодинно (${product.hourlyPriceUah} ₴)` : `Hourly (${product.hourlyPriceUah} ₴)`}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onUnlockAccess(product, 'monthly');
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>{lang === 'uk' ? `Місяць (${product.monthlyPriceUah} ₴)` : `Monthly (${product.monthlyPriceUah} ₴)`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
