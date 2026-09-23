import React, { useState } from 'react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';
import { X, Save, RotateCcw, Github, Play, Check } from 'lucide-react';

interface EditLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  lang: Language;
  onSaveProducts: (updatedProducts: Product[]) => void;
  onResetDefaults: () => void;
}

export const EditLinksModal: React.FC<EditLinksModalProps> = ({
  isOpen,
  onClose,
  products,
  lang,
  onSaveProducts,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  // Local draft state
  const [draftProducts, setDraftProducts] = useState<Product[]>(() =>
    JSON.parse(JSON.stringify(products))
  );
  const [savedNotice, setSavedNotice] = useState(false);

  const handleUrlChange = (id: string, field: 'githubUrl' | 'demoUrl', val: string) => {
    setDraftProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            [field]: val,
          };
        }
        return p;
      })
    );
  };

  const handleSave = () => {
    onSaveProducts(draftProducts);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
              {t.editLinksModal.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">{t.editLinksModal.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-grow bg-slate-50/50">
          {draftProducts.map((p) => (
            <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{p.name[lang]}</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {p.category[lang]}
                </span>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1">
                  <Github className="h-3.5 w-3.5 text-slate-500" />
                  <span>{t.editLinksModal.githubLabel}</span>
                </label>
                <input
                  type="url"
                  value={p.githubUrl}
                  onChange={(e) => handleUrlChange(p.id, 'githubUrl', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-blue-600 focus:bg-white focus:outline-hidden"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1">
                  <Play className="h-3.5 w-3.5 text-blue-600" />
                  <span>{t.editLinksModal.demoLabel}</span>
                </label>
                <input
                  type="url"
                  value={p.demoUrl}
                  onChange={(e) => handleUrlChange(p.id, 'demoUrl', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-blue-600 focus:bg-white focus:outline-hidden"
                  placeholder="https://...demo.recreate.ua"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.editLinksModal.resetBtn}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 shadow-2xs"
            >
              {lang === 'uk' ? 'Скасувати' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              {savedNotice ? <Check className="h-4 w-4 text-emerald-300" /> : <Save className="h-4 w-4" />}
              <span>{savedNotice ? (lang === 'uk' ? 'Збережено!' : 'Saved!') : t.editLinksModal.saveBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
