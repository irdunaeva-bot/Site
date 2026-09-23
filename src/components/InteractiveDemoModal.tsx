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

  // DocuMind simulation state
  const [docType, setDocType] = useState<'contract' | 'invoice' | 'act'>('contract');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);

  // VisionCraft simulation state
  const [promptText, setPromptText] = useState(
    lang === 'uk'
      ? 'Професійний рендер українського брендового продукту на гранітному фоні з м’яким студійним світлом'
      : 'Professional high-end product render on granite surface with soft studio lighting'
  );
  const [stylePreset, setStylePreset] = useState<'studio' | 'ecommerce' | 'cyberpunk'>('studio');
  const [generatingImg, setGeneratingImg] = useState(false);

  // DataSynth simulation state
  const [queryText, setQueryText] = useState(
    lang === 'uk'
      ? 'Порівняння динаміки виручки за Q2 та Q3 2026'
      : 'Revenue dynamics comparison between Q2 and Q3 2026'
  );
  const [executingSql, setExecutingSql] = useState(false);

  const activeVersionObj =
    product.versions.find((v) => v.version === selectedVer) || product.versions[0];

  const handleCopyJson = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runDocuMindAnalysis = () => {
    setAnalyzing(true);
    setAnalysisDone(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisDone(true);
    }, 900);
  };

  const runVisionCraftGen = () => {
    setGeneratingImg(true);
    setTimeout(() => {
      setGeneratingImg(false);
    }, 1100);
  };

  const runDataSynthQuery = () => {
    setExecutingSql(true);
    setTimeout(() => {
      setExecutingSql(false);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xs">
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                  {product.name[lang]}
                </h3>
                <span className="rounded-full bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-0.5 text-xs font-bold">
                  {selectedVer}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  <ShieldCheck className="h-3 w-3" />
                  {t.demoModal.inHouseDev}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{product.tagline[lang]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct external links */}
            <a
              href={product.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 shadow-2xs transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>

            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <span>{t.demoModal.openInNewTab}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Subheader: Version Tabs & Commit Hash */}
        <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
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

        {/* Modal Body: Interactive Functional Simulator */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow bg-slate-50/60">
          {/* DocuMind AI Sandbox */}
          {product.mockPreviewType === 'documind' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">
                      {lang === 'uk' ? 'Вибір зразка документа для аналізу:' : 'Select sample document to analyze:'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setDocType('contract');
                        runDocuMindAnalysis();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        docType === 'contract'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Договір поставки (PDF)' : 'Supply Contract (PDF)'}
                    </button>
                    <button
                      onClick={() => {
                        setDocType('invoice');
                        runDocuMindAnalysis();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        docType === 'invoice'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Рахунок-фактура (Скан)' : 'Commercial Invoice (Scan)'}
                    </button>
                    <button
                      onClick={() => {
                        setDocType('act');
                        runDocuMindAnalysis();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        docType === 'act'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang === 'uk' ? 'Акт виконаних робіт' : 'Acceptance Act'}
                    </button>
                  </div>
                </div>

                {analyzing ? (
                  <div className="py-12 text-center space-y-3">
                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                    <p className="text-sm text-blue-700 font-bold">
                      {lang === 'uk'
                        ? 'Нейромережевий рушій Recreate OCR Core аналізує документ...'
                        : 'Recreate OCR Core neural engine is parsing document...'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lang === 'uk'
                        ? 'Розпізнавання таблиць, тексту та верифікація реквізитів ЄДРПОУ (ТОВ «Рекрієйт»)'
                        : 'Table extraction, key-value parsing and USREOU verification (LLC «Recreate»)'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Extracted Structured Fields */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          {lang === 'uk' ? 'Розпізнані сутності (Structured OCR)' : 'Extracted Entities (Structured OCR)'}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {lang === 'uk' ? 'Точність: 99.8%' : 'Accuracy: 99.8%'}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-slate-200 pb-1.5">
                          <span className="text-slate-500 font-medium">
                            {lang === 'uk' ? 'Тип документа:' : 'Document Type:'}
                          </span>
                          <span className="font-bold text-slate-800">
                            {docType === 'contract'
                              ? (lang === 'uk' ? 'Договір купівлі-продажу обладнання' : 'Equipment Purchase Agreement')
                              : docType === 'invoice'
                              ? (lang === 'uk' ? 'Рахунок на оплату №SF-8902' : 'Payment Invoice #SF-8902')
                              : (lang === 'uk' ? 'Акт наданих послуг №104' : 'Services Acceptance Act #104')}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1.5">
                          <span className="text-slate-500 font-medium">
                            {lang === 'uk' ? 'Сторона 1 (Постачальник):' : 'Party 1 (Supplier):'}
                          </span>
                          <span className="font-bold text-slate-800">
                            {lang === 'uk' ? 'ТОВ «Рекрієйт» (ЄДРПОУ 44829103)' : 'LLC «Recreate» (USREOU 44829103)'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1.5">
                          <span className="text-slate-500 font-medium">
                            {lang === 'uk' ? 'Сума зобов’язань:' : 'Contract Amount:'}
                          </span>
                          <span className="font-bold text-blue-600">
                            {lang === 'uk' ? '148,500.00 UAH (з ПДВ 20%)' : '148,500.00 UAH (20% VAT incl.)'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1.5">
                          <span className="text-slate-500 font-medium">
                            {lang === 'uk' ? 'Строк оплати:' : 'Payment Term:'}
                          </span>
                          <span className="font-bold text-slate-800">
                            {lang === 'uk' ? '5 банківських днів' : '5 banking days'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1.5">
                          <span className="text-slate-500 font-medium">
                            {lang === 'uk' ? 'Юридичні ризики:' : 'Identified Risks:'}
                          </span>
                          <span className="font-bold text-amber-700">
                            {lang === 'uk'
                              ? 'Пункт 8.3: Пеня 0.5% за день (перевищує подвійну ставку НБУ)'
                              : 'Clause 8.3: Daily penalty 0.5% exceeds benchmark'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: JSON Schema Output */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 relative text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5 text-blue-400" />
                          JSON Response Schema
                        </span>
                        <button
                          onClick={() =>
                            handleCopyJson(
                              JSON.stringify(
                                {
                                  document_type: docType,
                                  version: selectedVer,
                                  developer: 'ТОВ Рекрієйт',
                                  edrpou: '44829103',
                                  amount_uah: 148500.0,
                                  vat_included: true,
                                  status: 'verified',
                                },
                                null,
                                2
                              )
                            )
                          }
                          className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
                        >
                          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          {copied ? t.checkoutModal.copied : t.checkoutModal.copyKey}
                        </button>
                      </div>

                      <pre className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl overflow-x-auto max-h-48 leading-relaxed border border-slate-800">
{`{
  "document_type": "${docType}",
  "engine": "Recreate-Neural-OCR-v2.2",
  "developer": "ТОВ «Рекрієйт» (ЄДРПОУ 44829103)",
  "version": "${selectedVer}",
  "parties": {
    "supplier": "ТОВ «Рекрієйт»",
    "edrpou": "44829103",
    "buyer": "АТ «УкрТрансЛогістик»"
  },
  "financials": {
    "total_uah": 148500.00,
    "currency": "UAH",
    "vat_rate": 0.20
  },
  "validation_status": "PASSED"
}`}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VisionCraft Studio Sandbox */}
          {product.mockPreviewType === 'visioncraft' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {lang === 'uk' ? 'Промпт для генерації медіа:' : 'Media generation prompt:'}
                    </label>
                    <input
                      type="text"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div className="w-full sm:w-48 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {lang === 'uk' ? 'Стиль брендбуку:' : 'Brand visual style:'}
                    </label>
                    <select
                      value={stylePreset}
                      onChange={(e: any) => setStylePreset(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-colors"
                    >
                      <option value="studio">{lang === 'uk' ? 'Студійний E-commerce' : 'Studio E-commerce'}</option>
                      <option value="ecommerce">{lang === 'uk' ? 'Каталог продукції' : 'Product Catalog'}</option>
                      <option value="cyberpunk">{lang === 'uk' ? 'Футуристичний неоновий' : 'Futuristic Neon'}</option>
                    </select>
                  </div>
                  <div className="sm:self-end">
                    <button
                      onClick={runVisionCraftGen}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{generatingImg ? (lang === 'uk' ? 'Генерація...' : 'Rendering...') : (lang === 'uk' ? 'Згенерувати' : 'Generate')}</span>
                    </button>
                  </div>
                </div>

                {/* Preview Canvas */}
                <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white p-6 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                  {generatingImg ? (
                    <div className="text-center space-y-2">
                      <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                      <p className="text-xs font-bold text-blue-700">
                        {lang === 'uk'
                          ? 'Авторський генеративний рушій Recreate Visual Core рендерить 4K...'
                          : 'Proprietary Recreate Visual Core engine is rendering 4K...'}
                      </p>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 max-w-md">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                          {lang === 'uk' ? 'Результат генерації Recreate Visual Core' : 'Recreate Visual Core Render Output'}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {lang === 'uk'
                            ? 'Фоторамка рекламного банера з точним збереженням фірмових кольорів ТОВ «Рекрієйт»'
                            : 'Ad banner frame maintaining strict color branding of LLC «Recreate»'}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {lang === 'uk'
                            ? 'Роздільна здатність: 3840 × 2160 (Ultra-HD). AI Inpainting підтримує заміну фону та адаптацію під формат маркетплейсів Rozetka, Prom та Amazon.'
                            : 'Resolution: 3840 × 2160 (Ultra-HD). AI Inpainting supports background swap and multi-marketplace aspect sizing.'}
                        </p>
                      </div>

                      {/* Mock Graphic Element */}
                      <div className="h-36 w-56 rounded-2xl border border-blue-200 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-600 flex flex-col items-center justify-center text-center p-4 relative shadow-lg text-white">
                        <ImageIcon className="h-8 w-8 text-blue-100 mb-2" />
                        <span className="text-[11px] font-extrabold tracking-wide">
                          VISIONCRAFT STUDIO
                        </span>
                        <span className="text-[9px] text-blue-100 font-medium">4K Render • Color Palette HEX #2563EB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DataSynth Bot Sandbox */}
          {product.mockPreviewType === 'datasynth' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {lang === 'uk' ? 'Запит природною мовою до бази даних:' : 'Natural language query to database:'}
                    </label>
                    <input
                      type="text"
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div className="sm:self-end">
                    <button
                      onClick={runDataSynthQuery}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      <span>{executingSql ? (lang === 'uk' ? 'Виконання...' : 'Executing...') : (lang === 'uk' ? 'Побудувати аналітику' : 'Synthesize Analytics')}</span>
                    </button>
                  </div>
                </div>

                {executingSql ? (
                  <div className="py-12 text-center space-y-2">
                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                    <p className="text-xs font-bold text-blue-700">
                      {lang === 'uk'
                        ? 'Recreate SQL Synthesizer генерує оптимізований SQL та розраховує бізнес-метрики...'
                        : 'Recreate SQL Synthesizer is generating optimized SQL and business metrics...'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Generated SQL query */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2 text-white">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold uppercase text-slate-200">
                          {lang === 'uk' ? 'Згенерований SQL (PostgreSQL / ClickHouse)' : 'Generated SQL (PostgreSQL / ClickHouse)'}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                          0.04s execution
                        </span>
                      </div>
                      <pre className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-3 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
{`SELECT 
  DATE_TRUNC('month', order_date) AS period,
  SUM(revenue_uah) AS total_revenue,
  AVG(order_margin) AS avg_margin_pct
FROM enterprise_sales
WHERE order_date >= '2026-04-01'
GROUP BY 1
ORDER BY period ASC;`}
                      </pre>
                    </div>

                    {/* Chart Mock / SVG metrics */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                      <span className="text-xs font-bold uppercase text-slate-700">
                        {lang === 'uk' ? 'Динаміка виручки (млн грн)' : 'Revenue Dynamics (M UAH)'}
                      </span>
                      <div className="space-y-2.5 pt-1 text-xs">
                        <div>
                          <div className="flex justify-between text-slate-600 font-medium mb-1">
                            <span>{lang === 'uk' ? 'Квітень 2026 (Q2)' : 'April 2026 (Q2)'}</span>
                            <span className="font-bold text-slate-900">4.2 {lang === 'uk' ? 'млн ₴' : 'M ₴'}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-slate-600 font-medium mb-1">
                            <span>{lang === 'uk' ? 'Травень 2026 (Q2)' : 'May 2026 (Q2)'}</span>
                            <span className="font-bold text-slate-900">5.1 {lang === 'uk' ? 'млн ₴' : 'M ₴'}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-slate-600 font-medium mb-1">
                            <span>{lang === 'uk' ? 'Червень 2026 (Q2)' : 'June 2026 (Q2)'}</span>
                            <span className="font-bold text-slate-900">5.8 {lang === 'uk' ? 'млн ₴' : 'M ₴'}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-slate-600 font-medium mb-1">
                            <span>{lang === 'uk' ? 'Липень 2026 (Q3)' : 'July 2026 (Q3)'}</span>
                            <span className="font-bold text-emerald-600">6.9 {lang === 'uk' ? 'млн ₴' : 'M ₴'} (+19%)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }}></div>
                          </div>
                        </div>
                      </div>
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
