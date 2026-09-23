import { Product, CompanyRequisites } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'child-centr',
    slug: 'child-centr',
    name: {
      uk: 'Інформатизація закладів соціальної реабілітації',
      en: 'Children Rehabilitation Center System',
    },
    tagline: {
      uk: 'Комплексна SaaS-система автоматизації обліку вихованців, медичного блоку та звітності',
      en: 'Full-cycle SaaS for social rehabilitation centers, medical care & statutory reporting',
    },
    shortDescription: {
      uk: 'Веб-орієнтована SaaS-система автоматизації обліку вихованців, психолого-педагогічного супроводу, медичного блоку, звітності та договорів для дитячих закладів соціальної реабілітації.',
      en: 'Web-oriented SaaS system for automating pupil records, psychological-pedagogical support, medical block, statutory reporting, and contracts for child social rehabilitation centers.',
    },
    fullDescription: {
      uk: 'Програмний комплекс створений інженерами ТОВ «Рекрієйт» для дитячих центрів соціально-психологічної реабілітації, притулків та центрів захисту дітей. Забезпечує цифрові особові справи вихованців (модуль 4.1), індивідуальні плани реабілітації (ІПР 4.2), освітній супровід та синхронізацію з ЄДЕБО (4.3), захищений медичний блок форми 079/о (4.4), табелювання персоналу (4.5), журнал інцидентів та корекції поведінки (4.6), автоматичні регламентовані звіти для Служби у справах дітей (ССД) та Мінсоцполітики (4.7), модуль зв’язку з родинами (4.8), кабінет залученого ФОП-спеціаліста (4.10) та незмінний WORM журнал аудиту дій персоналу (7.1).',
      en: 'Enterprise SaaS platform engineered by LLC «Recreate» for children social rehabilitation centers, foster institutions, and guardianship authorities. Covers digitized pupil dossiers, individual rehabilitation roadmaps (IPR), psychological diagnosis, educational tracking with EDEBO integration, protected medical care records (Form 079/o), staff scheduling, incident reporting, automatic statutory reporting to Social Services & Ministry of Social Policy, family communication portal, external specialist/FOP cabinet, and immutable WORM audit trails.',
    },
    category: {
      uk: 'Соціальна сфера та Реабілітація',
      en: 'Social Welfare & Healthcare SaaS',
    },
    engineArchitecture: 'Recreate GovSocial Core v3.1 (Власна розробка ТОВ «Рекрієйт»)',
    githubUrl: 'https://github.com/recreate-ua/child-social-rehab',
    demoUrl: 'https://tinyurl.com/child-centr',
    currentVersion: 'v3.1.0',
    badges: ['Розробка ТОВ «Рекрієйт»', 'Модулі 4.1-4.10', 'Звітність Мінсоц/ССД', 'WORM Безпека'],
    features: [
      {
        title: {
          uk: 'Цифрові особові справи та ІПР (Модулі 4.1-4.2)',
          en: 'Digitized Pupil Dossiers & IPR Roadmaps',
        },
        desc: {
          uk: 'Повний життєвий цикл вихованця, психолого-педагогічна діагностика, фіксація судових рішень та індивідуальних планів реабілітації.',
          en: 'Full pupil lifecycle tracking, psychological diagnosis, legal guardianship orders, and individual rehabilitation plans.',
        },
      },
      {
        title: {
          uk: 'Захищений медичний блок & форма 079/о (Модуль 4.4)',
          en: 'Protected Medical Block & Form 079/o',
        },
        desc: {
          uk: 'Призначення чергових лікарів, журнал щоденного огляду, календар щеплень, облік інвалідності та дієтичного харчування.',
          en: 'Physician prescriptions, daily checkup logs, vaccination schedules, disability records, and dietary management.',
        },
      },
      {
        title: {
          uk: 'Регламентована звітність та ЄДЕБО (Модулі 4.3, 4.7)',
          en: 'Statutory SSD Reporting & EDEBO Integration',
        },
        desc: {
          uk: 'Формування звітів для Служби у справах дітей (ССД) та Мінсоцполітики в 1 клік, синхронізація з державною базою ЄДЕБО.',
          en: 'One-click generation of statutory reports for Social Services & Ministry of Social Policy, synced with the national EDEBO database.',
        },
      },
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'WORM Audit Engine', 'REST & EDEBO API'],
    hourlyPriceUah: 50,
    monthlyPriceUah: 450,
    mockPreviewType: 'child-centr',
    versions: [
      {
        version: 'v3.1.0',
        date: '18.09.2026',
        isLatest: true,
        commitHash: '8b4d10f',
        title: {
          uk: 'Реліз 3.1: Оновлення регламентованої звітності ССД та форми 079/о',
          en: 'Release 3.1: Updated SSD Statutory Reporting & Medical Form 079/o',
        },
        description: {
          uk: 'Додано нові форми звітності для органів опіки, покращено журнал інцидентів та захист медичних записів.',
          en: 'Added latest guardianship report templates, enhanced behavior incident logs and medical record security.',
        },
        changes: {
          uk: [
            'Інтеграція шаблонів звітів за стандартами Мінсоцполітики 2026 року',
            'Швидкий друк медичних довідок та довідок про взяття на облік ВПО',
            'Посилений WORM журнал аудиту перегляду конфіденційних справ',
          ],
          en: [
            'Integrated 2026 statutory report templates for Social Services',
            'One-click export of medical summaries and IDP registration forms',
            'Hardened immutable WORM audit logs for sensitive pupil records',
          ],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/child-social-rehab/releases/tag/v3.1.0',
        demoUrl: 'https://tinyurl.com/child-centr',
      },
      {
        version: 'v3.0.0',
        date: '10.08.2026',
        commitHash: '4a19e2c',
        title: {
          uk: 'Реліз 3.0: Кабінет залученого ФОП-спеціаліста та журнал інцидентів',
          en: 'Release 3.0: External FOP Specialist Cabinet & Incident Tracking',
        },
        description: {
          uk: 'Впроваджено модуль 4.10 для психологів та логопедів, які співпрацюють із закладом як ФОП.',
          en: 'Introduced module 4.10 for contract psychologists and speech therapists acting as external Sole Proprietors.',
        },
        changes: {
          uk: ['Окремий доступ для ФОП-фахівців', 'Журнал корекції поведінки вихованців'],
          en: ['Isolated workspace for external contractors', 'Behavior correction tracking module'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/child-social-rehab/releases/tag/v3.0.0',
        demoUrl: 'https://tinyurl.com/child-centr',
      },
      {
        version: 'v2.8.0',
        date: '25.06.2026',
        commitHash: '1c78bb9',
        title: {
          uk: 'Реліз 2.8: Інтеграція з державною освітньою базою ЄДЕБО',
          en: 'Release 2.8: National EDEBO Educational Database Connector',
        },
        description: {
          uk: 'Автоматичний облік відвідуваності та шкільної програми для дітей шкільного віку.',
          en: 'Automated attendance and school curriculum tracking for school-age children.',
        },
        changes: {
          uk: ['API-конектор до ЄДЕБО', 'Формування навчального табеля'],
          en: ['Direct API connector to EDEBO', 'Academic performance sheet generation'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/child-social-rehab/releases/tag/v2.8.0',
        demoUrl: 'https://tinyurl.com/child-centr',
      },
    ],
  },
  {
    id: 'vytraty',
    slug: 'vytraty',
    name: {
      uk: 'Система моніторингу активів та витрат',
      en: 'Asset & Expense Monitoring System',
    },
    tagline: {
      uk: 'SaaS вебзастосунок для обліку активів, контролю витрат, аналітики та звітності',
      en: 'SaaS web application for asset tracking, expense control, tax analytics, and reporting',
    },
    shortDescription: {
      uk: 'SaaS вебзастосунок для обліку активів, контролю витрат, аналітики та звітності для Фізичних осіб та ФОП.',
      en: 'SaaS web application for asset tracking, expense control, financial analytics, and tax reporting for individuals and Sole Proprietors (FOP).',
    },
    fullDescription: {
      uk: 'Система моніторингу активів та витрат — пропрієтарний фінансовий вебзастосунок від ТОВ «Рекрієйт». Призначений для автоматизованого обліку особистого капіталу та господарської діяльності ФОП (3 група, 5%). Надає гнучкий інвентарний облік активів (нерухомість, авто, бізнес-обладнання з амортизацією), щоденний журнал витрат із прив’язкою фіскальних чеків, розрахунок єдиного податку та ЄСВ, контроль дотримання річного ліміту 8.28 млн грн, наочний аналіз Net Worth та експорт фінансових звітів у PDF та Excel.',
      en: 'Proprietary financial SaaS developed in-house by LLC «Recreate». Designed for individuals and Ukrainian Sole Proprietors (FOP Group 3, 5%). Provides automated capital tracking (Net Worth), asset depreciation and valuation schedules, expense journal with receipt attachments, automatic 5% Single Tax and ESV calculations, real-time tracking against the annual UAH 8.28M threshold, and certified PDF/Excel report exports.',
    },
    category: {
      uk: 'Фінанси, Облік та Податки ФОП',
      en: 'FinTech & Small Business Accounting',
    },
    engineArchitecture: 'Recreate FinMonitor Engine v2.5 (Власна розробка ТОВ «Рекрієйт»)',
    githubUrl: 'https://github.com/recreate-ua/asset-expense-monitor',
    demoUrl: 'https://tinyurl.com/vytraty',
    currentVersion: 'v2.5.0',
    badges: ['Розробка ТОВ «Рекрієйт»', 'ФОП 3 група (5%)', 'Облік Net Worth', 'Експорт PDF / Excel'],
    features: [
      {
        title: {
          uk: 'Інвентарний облік активів та Net Worth',
          en: 'Asset Inventory & Net Worth Tracking',
        },
        desc: {
          uk: 'Контроль нерухомості, транспорту, техніки, автоматична переоцінка ринкової вартості та списання амортизації.',
          en: 'Real estate, vehicle, and equipment tracking with automated fair market revaluation and depreciation schedules.',
        },
      },
      {
        title: {
          uk: 'Журнал витрат з прив’язкою чеків',
          en: 'Expense Ledger with Fiscal Receipts',
        },
        desc: {
          uk: 'Детальний облік особистих та господарських платежів, прикріплення фото чеків і контроль бюджетних лімітів.',
          en: 'Detailed tracking of personal and business spending, photo receipt attachments, and budget threshold alerts.',
        },
      },
      {
        title: {
          uk: 'Податки ФОП 3 групи (5%) та ліміт 8.28 млн',
          en: 'FOP Group 3 Tax Calculator & Limit Monitor',
        },
        desc: {
          uk: 'Розрахунок Єдиного податку 5%, ЄСВ, автоматичний контроль річного ліміту доходу та експорт звітності в PDF/Excel.',
          en: 'Accurate calculation of 5% Single Tax and ESV, real-time UAH 8.28M annual cap monitoring, and PDF/Excel exports.',
        },
      },
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recreate Tax Engine', 'Export PDF/XLSX'],
    hourlyPriceUah: 40,
    monthlyPriceUah: 380,
    mockPreviewType: 'vytraty',
    versions: [
      {
        version: 'v2.5.0',
        date: '19.09.2026',
        isLatest: true,
        commitHash: '6f2a93d',
        title: {
          uk: 'Реліз 2.5: Оновлення податкового модуля ФОП 2026 та експорт у PDF/XLSX',
          en: 'Release 2.5: Updated 2026 FOP Tax Module & PDF/XLSX Exporter',
        },
        description: {
          uk: 'Покращено контроль податкового ліміту 8.28 млн грн, додано генерацію звітів для ДПС та банків.',
          en: 'Upgraded 8.28M UAH threshold tracking and automated report generation for State Tax Service and banks.',
        },
        changes: {
          uk: [
            'Автоматичний розрахунок Єдиного податку 5% за будь-який обраний квартал',
            'Експорт фінансових звітів у стандартизовані PDF та Excel файли',
            'Розширений графік розподілу активів та динаміки капіталу Net Worth',
          ],
          en: [
            'Automatic 5% Single Tax calculations across quarterly fiscal periods',
            'Standardized financial report exports to PDF and Excel formats',
            'Enhanced visual asset distribution and Net Worth trajectory charts',
          ],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/asset-expense-monitor/releases/tag/v2.5.0',
        demoUrl: 'https://tinyurl.com/vytraty',
      },
      {
        version: 'v2.2.0',
        date: '14.08.2026',
        commitHash: '3d91cf4',
        title: {
          uk: 'Реліз 2.2: Прив’язка фіскальних чеків та смарт-сповіщення',
          en: 'Release 2.2: Receipt Attachment & Smart Deadline Alerts',
        },
        description: {
          uk: 'Впроваджено збереження сканів чеків до кожної транзакції та сповіщення про строки сплати податків.',
          en: 'Added image attachments for individual expenses and timely notifications for tax payment deadlines.',
        },
        changes: {
          uk: ['Прив’язка фото чеків до витрат', 'Календар нагадувань про сплату ЄСВ та ЄП'],
          en: ['Receipt photo linking for transactions', 'ESV and Single Tax payment reminder calendar'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/asset-expense-monitor/releases/tag/v2.2.0',
        demoUrl: 'https://tinyurl.com/vytraty',
      },
      {
        version: 'v2.0.0',
        date: '01.07.2026',
        commitHash: '9b4e821',
        title: {
          uk: 'Реліз 2.0: Багатовалютний облік та ринкова переоцінка активів',
          en: 'Release 2.0: Multi-currency Assets & Fair Market Revaluation',
        },
        description: {
          uk: 'Повний перехід на нову архітектуру розрахунку амортизації основних засобів.',
          en: 'Full architectural upgrade for fixed-asset depreciation and multi-currency valuation.',
        },
        changes: {
          uk: ['Підтримка UAH, USD, EUR за курсом НБУ', 'Модуль переоцінки нерухомості та транспорту'],
          en: ['Support for UAH, USD, and EUR via NBU rates', 'Real estate and vehicle revaluation tools'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/asset-expense-monitor/releases/tag/v2.0.0',
        demoUrl: 'https://tinyurl.com/vytraty',
      },
    ],
  },
  {
    id: 'chastka-realty',
    slug: 'chastka-realty',
    name: {
      uk: 'Платформа дробового інвестування в нерухомість',
      en: 'Fractional Real Estate Investment Platform',
    },
    tagline: {
      uk: 'Платформа токенізації та дробового інвестування в нерухомість',
      en: 'Property tokenization, fractional share marketplace & automated dividends',
    },
    shortDescription: {
      uk: 'Платформа токенізації та дробового інвестування в нерухомість: маркетплейс об\'єктів, кабінет інвестора, смарт-контракти, автоматичні дивіденди та аналітика прибутковості.',
      en: 'Real estate tokenization and fractional investment platform: property marketplace, investor cabinet, smart contracts, automated dividends, and ROI yield analytics.',
    },
    fullDescription: {
      uk: 'Платформа дробового інвестування в нерухомість (ЧасткаНерухомість) — проривний фінтех-продукт від інженерної команди ТОВ «Рекрієйт». Дозволяє купувати цифрові частки високоприбуткової нерухомості (апарт-готелі, логістичні комплекси класу А, комерційні площі) від $50 за частку без іпотек. Включає перевірений маркетплейс об’єктів, юридичний аудит Due Diligence, кабінет інвестора, смарт-контракти стандарту ERC-3643, автоматизоване нарахування та виплату щомісячних дивідендів на рахунки IBAN та калькулятор прибутковості.',
      en: 'Next-generation PropTech and tokenization ecosystem created by LLC «Recreate». Enables direct fractional ownership of verified high-yield commercial, logistics, hotel, and residential properties starting from $50 per share. Includes vetted marketplace, Due Diligence legal data rooms, investor management cabinet, ERC-3643 smart contracts, automated monthly dividend distribution to IBAN bank accounts, and dynamic ROI yield modeling.',
    },
    category: {
      uk: 'PropTech, Токенізація та Інвестиції',
      en: 'PropTech & Fractional Investment',
    },
    engineArchitecture: 'Recreate SmartRealty Core v3.0 (Власна розробка ТОВ «Рекрієйт»)',
    githubUrl: 'https://github.com/recreate-ua/fractional-realty-platform',
    demoUrl: 'https://tinyurl.com/chastka-realty',
    currentVersion: 'v3.0.0',
    badges: ['Розробка ТОВ «Рекрієйт»', 'Частки від $50', 'ERC-3643 Смарт-контракти', 'Due Diligence аудит'],
    features: [
      {
        title: {
          uk: 'Маркетплейс токенізованої нерухомості',
          en: 'Tokenized Real Estate Marketplace',
        },
        desc: {
          uk: 'Каталог перевірених апарт-готелів, складів класу А та офісних центрів з порогом входу від $50 та прогнозом прибутковості 12-18% річних.',
          en: 'Curated marketplace of apart-hotels, Class-A logistics hubs, and retail spaces with entry from $50 and 12-18% projected annual ROI.',
        },
      },
      {
        title: {
          uk: 'Кабінет інвестора та авто-дивіденди на IBAN',
          en: 'Investor Cabinet & Auto-Dividends to IBAN',
        },
        desc: {
          uk: 'Моніторинг портфеля часток, нарахування пасивного доходу від оренди та автоматичні виплати на банківські картки або рахунки IBAN.',
          en: 'Real-time portfolio management, monthly rental yield payouts directly to bank cards or corporate IBAN accounts.',
        },
      },
      {
        title: {
          uk: 'Юридичний Due Diligence та смарт-контракти ERC-3643',
          en: 'Legal Due Diligence & ERC-3643 Smart Contracts',
        },
        desc: {
          uk: 'Кадастрові витяги, перевірка прав власності, типові договори для ТОВ/ФОП та фіксація права власності через безпечні смарт-контракти.',
          en: 'Cadastral registry validation, ownership deed audits, standard LLC/FOP agreements, and tamper-proof ERC-3643 tokens.',
        },
      },
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'ERC-3643 Core', 'PropTech Analytics'],
    hourlyPriceUah: 60,
    monthlyPriceUah: 590,
    mockPreviewType: 'chastka-realty',
    versions: [
      {
        version: 'v3.0.0',
        date: '20.09.2026',
        isLatest: true,
        commitHash: '5e71ba4',
        title: {
          uk: 'Реліз 3.0: Підтримка стандарту ERC-3643 та авто-виплати на IBAN',
          en: 'Release 3.0: ERC-3643 Standard Compliance & IBAN Auto-Payouts',
        },
        description: {
          uk: 'Повна автоматизація щомісячних дивідендів та оновлення юридичної кімнати даних (Due Diligence).',
          en: 'Fully automated monthly dividend distribution and enhanced Due Diligence legal data room.',
        },
        changes: {
          uk: [
            'Інтеграція стандарту смарт-контрактів сек’юріті-токенів ERC-3643',
            'Автоматичне розщеплення платежів орендарів на частки інвесторів',
            'Інтерактивний калькулятор складеного відсотка та чистого кеш-флоу',
          ],
          en: [
            'Deployed compliant ERC-3643 security token contract suite',
            'Automated rental tenant cash-flow split across verified shareholders',
            'Interactive compound interest & net cash-flow financial calculator',
          ],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/fractional-realty-platform/releases/tag/v3.0.0',
        demoUrl: 'https://tinyurl.com/chastka-realty',
      },
      {
        version: 'v2.6.0',
        date: '15.08.2026',
        commitHash: '2f89ca1',
        title: {
          uk: 'Реліз 2.6: Калькулятор прибутковості ROI та фільтри об’єктів',
          en: 'Release 2.6: ROI Yield Calculator & Multi-Filter Marketplace',
        },
        description: {
          uk: 'Додано розрахунок окупності інвестицій залежно від завантаження готелів та складів.',
          en: 'Added occupancy-dependent payback simulations for hospitality and logistics assets.',
        },
        changes: {
          uk: ['Фільтрація за містами, класом та дохідністю', 'Експорт інвестиційного меморандуму'],
          en: ['Marketplace filters by city, class, and ROI', 'Investment memorandum PDF export'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/fractional-realty-platform/releases/tag/v2.6.0',
        demoUrl: 'https://tinyurl.com/chastka-realty',
      },
      {
        version: 'v2.0.0',
        date: '05.07.2026',
        commitHash: '8d23fe0',
        title: {
          uk: 'Реліз 2.0: Базовий маркетплейс часток ТОВ «Рекрієйт»',
          en: 'Release 2.0: Foundational Fractional Marketplace by LLC «Recreate»',
        },
        description: {
          uk: 'Перша публічна демонстрація платформи токенізації нерухомості.',
          en: 'Initial public rollout of the real estate tokenization architecture.',
        },
        changes: {
          uk: ['Каталог перших 5 об’єктів', 'Особистий кабінет інвестора'],
          en: ['Catalog of initial 5 real estate assets', 'Basic investor dashboard'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/fractional-realty-platform/releases/tag/v2.0.0',
        demoUrl: 'https://tinyurl.com/chastka-realty',
      },
    ],
  },
];

export const companyRequisites: CompanyRequisites = {
  legalNameUk: 'Товариство з обмеженою відповідальністю «Рекрієйт» (ТОВ «Рекрієйт»)',
  legalNameEn: 'Limited Liability Company «Recreate» (LLC «Recreate»)',
  edrpou: '44829103',
  addressUk: 'Україна, 01033, м. Київ, вул. Жилянська, буд. 59, офіс 410',
  addressEn: 'Ukraine, 01033, Kyiv, 59 Zhylianska St., Office 410',
  email: 'support@recreate.ua',
  phone: '+380 (44) 390-42-10',
  supportHoursUk: 'Пн-Пт: 09:00 – 18:00 (за київським часом)',
  supportHoursEn: 'Mon-Fri: 09:00 – 18:00 (Kyiv Time)',
  iban: 'UA843052990000026001025849103',
  bankUk: 'АТ КБ «ПРИВАТБАНК», МФО 305299',
  bankEn: 'JSC CB «PRIVATBANK», MFO 305299',
};
