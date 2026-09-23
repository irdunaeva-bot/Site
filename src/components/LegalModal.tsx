import React, { useState } from 'react';
import { Language, CompanyRequisites } from '../types';
import { translations } from '../data/translations';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'offer' | 'privacy' | 'refund';
  onClose: () => void;
  lang: Language;
  company: CompanyRequisites;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'offer',
  onClose,
  lang,
  company,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'offer' | 'privacy' | 'refund'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk'] truncate">
                {t.legal.companyTitle}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                {lang === 'uk' ? company.legalNameUk : company.legalNameEn} • {lang === 'uk' ? 'ЄДРПОУ' : 'USREOU'} {company.edrpou}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 sm:px-6 text-xs font-bold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('offer')}
            className={`py-3 px-3 sm:px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'offer'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.legal.tabOffer}
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-3 sm:px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'privacy'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.legal.tabPrivacy}
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`py-3 px-3 sm:px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'refund'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.legal.tabRefund}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed bg-white">
          {activeTab === 'offer' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                {lang === 'uk'
                  ? 'ПУБЛІЧНИЙ ДОГОВІР (ОФЕРТА) ПРО НАДАННЯ ДОСТУПУ ДО ПРОГРАМНОГО ЗАБЕЗПЕЧЕННЯ'
                  : 'PUBLIC OFFER AGREEMENT FOR SOFTWARE ACCESS PROVISION'}
              </h4>
              <p>
                {lang === 'uk'
                  ? 'Цей документ є офіційною пропозицією (публічною офертою) Товариства з обмеженою відповідальністю «Рекрієйт» (код ЄДРПОУ 44829103, місцезнаходження: 01033, м. Київ, вул. Жилянська, буд. 59, офіс 410) укласти договір про надання послуг електронного доступу до програмних продуктів власної розробки ТОВ «Рекрієйт» на зазначених нижче умовах.'
                  : 'This document is an official offer (public offer) of Limited Liability Company «Recreate» (USREOU/EDRPOU code 44829103, located at: 01033, Kyiv, 59 Zhylianska St., Office 410) to enter into an agreement for providing digital access to software products developed by LLC «Recreate» under the terms set forth below.'}
              </p>
              <h5 className="font-bold text-slate-900">
                {lang === 'uk' ? '1. ПРЕДМЕТ ДОГОВОРУ' : '1. SUBJECT OF THE AGREEMENT'}
              </h5>
              <p>
                {lang === 'uk'
                  ? '1.1. Виконавець (ТОВ «Рекрієйт») надає Замовнику послуги з надання тимчасового доступу до функціональних можливостей програмного забезпечення (DocuMind AI, VisionCraft Studio, DataSynth Bot) на основі обраного тарифного плану: погодинного (Hourly) або помісячного (Monthly).'
                  : '1.1. The Provider (LLC «Recreate») grants the Customer digital access to the functional capabilities of proprietary software (DocuMind AI, VisionCraft Studio, DataSynth Bot) based on the chosen pricing plan: Hourly or Monthly.'}
              </p>
              <p>
                {lang === 'uk'
                  ? '1.2. Оплата здійснюється в безготівковій формі через авторизованого платіжного провайдера WayForPay з використанням банківських карток Visa / Mastercard або сервісів Apple Pay / Google Pay / Privat24.'
                  : '1.2. Payment is made via cashless settlement through the authorized payment gateway WayForPay using Visa / Mastercard cards or Apple Pay / Google Pay / Privat24 services.'}
              </p>
              <h5 className="font-bold text-slate-900">
                {lang === 'uk' ? '2. ПОРЯДОК НАДАННЯ ДОСТУПУ' : '2. TERMS OF ACCESS ACTIVATION'}
              </h5>
              <p>
                {lang === 'uk'
                  ? '2.1. Доступ до програмного продукту активується автоматично та негайно після успішного підтвердження платежу системою WayForPay шляхом генерації унікального ліцензійного ключа та активації лічильника доступу.'
                  : '2.1. Access to the software is activated automatically and immediately upon successful payment confirmation by WayForPay via unique license key generation and access timer activation.'}
              </p>
              <p>
                {lang === 'uk'
                  ? '2.2. Замовник самостійно забезпечує наявність належного підключення до мережі Інтернет та сумісного веб-переглядача.'
                  : '2.2. The Customer is independently responsible for having adequate Internet connectivity and a compatible web browser.'}
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                {lang === 'uk'
                  ? 'ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ ТА ЗАХИСТУ ПЕРСОНАЛЬНИХ ДАНИХ ТОВ «РЕКРІЄЙТ»'
                  : 'PRIVACY POLICY & PERSONAL DATA PROTECTION OF LLC «RECREATE»'}
              </h4>
              <p>
                {lang === 'uk'
                  ? 'ТОВ «Рекрієйт» з повагою ставиться до конфіденційної інформації користувачів. Дана Політика регулює порядок збору, обробки та захисту персональних даних відповідно до Закону України «Про захист персональних даних» та Регламенту GDPR.'
                  : 'LLC «Recreate» respects user confidentiality. This Policy governs the collection, processing, and protection of personal data in accordance with Ukrainian legislation and the GDPR regulation.'}
              </p>
              <h5 className="font-bold text-slate-900">
                {lang === 'uk' ? '1. ЯКІ ДАНІ МИ ОБРОБЛЯЄМО' : '1. DATA WE COLLECT'}
              </h5>
              <p>
                {lang === 'uk'
                  ? 'Під час оформлення замовлення ми збираємо: ім’я та прізвище клієнта, контактний номер телефону та адресу електронної пошти для відправки ключів доступу та фінансових чеків.'
                  : 'During order checkout, we collect customer name, contact phone number, and email address solely for license key dispatch and financial receipts.'}
              </p>
              <h5 className="font-bold text-slate-900">
                {lang === 'uk' ? '2. БЕЗПЕКА ПЛАТІЖНИХ ДАНИХ (WAYFORPAY)' : '2. PAYMENT DATA SECURITY (WAYFORPAY)'}
              </h5>
              <p>
                {lang === 'uk'
                  ? 'ТОВ «Рекрієйт» не зберігає і не має доступу до повних номерів банківських карток чи CVV2/CVC кодів. Усі платіжні операції захищені міжнародним стандартом безпеки PCI DSS Level 1 на захищених серверах WayForPay.'
                  : 'LLC «Recreate» never stores or accesses full payment card numbers or CVV/CVC codes. All financial transactions are protected under the international PCI DSS Level 1 security standard on certified WayForPay servers.'}
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                {lang === 'uk'
                  ? 'УМОВИ ПОВЕРНЕННЯ КОШТІВ ТА РЕГЛАМЕНТ НАДАННЯ ПОСЛУГ'
                  : 'REFUND POLICY & SERVICE LEVEL TERMS'}
              </h4>
              <p>
                {lang === 'uk'
                  ? 'Оскільки послуги доступу до програмного забезпечення надаються в електронному вигляді та активуються миттєво після завершення оплати через WayForPay, діють такі правила повернення:'
                  : 'Since software access services are provided digitally and activated immediately following WayForPay checkout confirmation, the following refund rules apply:'}
              </p>
              <h5 className="font-bold text-slate-900">
                {lang === 'uk' ? '1. ПІДСТАВИ ДЛЯ ПОВЕРНЕННЯ КОШТІВ' : '1. GROUNDS FOR REFUND'}
              </h5>
              <p>
                {lang === 'uk'
                  ? '1.1. Користувач має право звернутися за поверненням коштів протягом 24 годин з моменту оплати, якщо виникли технічні збої на стороні сервера ТОВ «Рекрієйт», які унеможливили використання сервісу.'
                  : '1.1. The user may request a refund within 24 hours of payment if server-side technical failures on LLC «Recreate» infrastructure prevented software access.'}
              </p>
              <p>
                {lang === 'uk' ? '1.2. Звернення надсилається на адресу електронної пошти ' : '1.2. Requests must be sent to '}
                <strong className="text-blue-600 font-bold">support@recreate.ua</strong>{' '}
                {lang === 'uk'
                  ? 'з обов’язковим зазначенням номера транзакції WayForPay (Order Reference) та описом проблеми.'
                  : 'specifying the WayForPay Order Reference number and incident details.'}
              </p>
              <p>
                {lang === 'uk'
                  ? '1.3. Повернення здійснюється на ту ж банківську картку, з якої було здійснено оплату, протягом 3-5 банківських днів через шлюз WayForPay.'
                  : '1.3. Refunds are returned to the originating payment card within 3-5 banking days through the WayForPay gateway.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {lang === 'uk' ? 'Зв’язок з юридичним відділом: support@recreate.ua' : 'Legal inquiries: support@recreate.ua'}
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white transition-colors shadow-2xs"
          >
            {lang === 'uk' ? 'Зрозуміло' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
