import { Product, CompanyRequisites } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'documind-ai',
    slug: 'documind-ai',
    name: {
      uk: 'DocuMind AI',
      en: 'DocuMind AI',
    },
    tagline: {
      uk: 'Мультимодальний інтелектуальний екстрактор та аналізатор документів',
      en: 'Multimodal intelligent document extractor and contract analyzer',
    },
    shortDescription: {
      uk: 'Автоматичне розпізнавання та структурування договорів, рахунків, накладних та технічних звітів з точністю 99.4% на базі авторських нейромережевих алгоритмів ТОВ «Рекрієйт».',
      en: 'Automated extraction and structuring of contracts, invoices, bills, and technical reports with 99.4% accuracy powered by proprietary neural algorithms of LLC «Recreate».',
    },
    fullDescription: {
      uk: 'DocuMind AI — 100% власна R&D розробка ТОВ «Рекрієйт». Система автоматично витягує складні табличні дані, порівнює версії юридичних договорів, виявляє невідповідності та миттєво експортує перевірені дані у форматі JSON/Excel. Повна підтримка української специфіки документації, кодів ЄДРПОУ та податкових накладних.',
      en: 'DocuMind AI is a 100% in-house R&D product of LLC «Recreate». The system automatically extracts complex tabular data, compares legal contract versions, flags discrepancies, and instantly exports validated data to JSON/Excel. Full support for corporate documentation, USREOU (EDRPOU) codes, and fiscal invoices.',
    },
    category: {
      uk: 'Документообіг та OCR',
      en: 'Document Automation & OCR',
    },
    engineArchitecture: 'Recreate Neural OCR Core v2.2 (Власна розробка ТОВ «Рекрієйт»)',
    githubUrl: 'https://github.com/recreate-ua/documind-ai-studio',
    demoUrl: 'https://ais-dev-documind-demo.recreate.ua',
    currentVersion: 'v2.2.0',
    badges: ['Розробка ТОВ «Рекрієйт»', 'OCR 2.0', '99.4% Точність', 'Юридичні шаблони'],
    features: [
      {
        title: {
          uk: 'Миттєвий парсинг таблиць та рахунків',
          en: 'Instant Table & Invoice Parsing',
        },
        desc: {
          uk: 'Екстракція будь-яких форматів (PDF, скан, фото чеків) у сувору схему JSON або 1С/CRM за секунди.',
          en: 'Extraction from any format (PDF, scans, receipt photos) into strict JSON schema or 1C/CRM in seconds.',
        },
      },
      {
        title: {
          uk: 'Юридичний аудит та пошук ризиків',
          en: 'Legal Audit & Risk Detection',
        },
        desc: {
          uk: 'Автоматична перевірка штрафних санкцій, строків виконання зобов’язань та прихованих пунктів.',
          en: 'Automated auditing of penalty clauses, fulfillment deadlines, and hidden liability terms.',
        },
      },
      {
        title: {
          uk: 'Спеціалізація на українському законодавстві',
          en: 'Specialized for Ukrainian Legislation',
        },
        desc: {
          uk: 'Навчені алгоритми під ЄДРПОУ, первинні акти, накладні та форми ДПС України.',
          en: 'Pre-trained models for USREOU codes, primary work acts, and State Tax Service fiscal standards.',
        },
      },
    ],
    techStack: ['Recreate OCR Engine', 'React 19', 'TypeScript', 'Tailwind CSS', 'PDF.js'],
    hourlyPriceUah: 45,
    monthlyPriceUah: 390,
    mockPreviewType: 'documind',
    versions: [
      {
        version: 'v2.2.0',
        date: '15.09.2026',
        isLatest: true,
        commitHash: '7f9c2d1',
        title: {
          uk: 'Реліз 2.2: Мультисторінковий пакетний OCR та валідація ЄДРПОУ',
          en: 'Release 2.2: Multi-page Batch OCR & USREOU Validation',
        },
        description: {
          uk: 'Додано підтримку обробки пачок документів до 500 сторінок, розпізнавання підписів та печаток.',
          en: 'Added support for document batches up to 500 pages, signature and seal recognition.',
        },
        changes: {
          uk: [
            'Оновлення авторського рушія нейромережевого розпізнавання Recreate OCR Core',
            'Прискорення обробки сканів на 42%',
            'Експорт звітів у формати XLSX та CSV',
          ],
          en: [
            'Updated proprietary Recreate OCR Core neural recognition engine',
            '42% faster scan processing speed',
            'Export reports to XLSX and CSV formats',
          ],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/documind-ai-studio/releases/tag/v2.2.0',
        demoUrl: 'https://ais-dev-documind-demo.recreate.ua/?v=2.2.0',
      },
      {
        version: 'v2.0.1',
        date: '02.08.2026',
        commitHash: '3a18e0f',
        title: {
          uk: 'Реліз 2.0: Структурований JSON-вивід за авторською схемою',
          en: 'Release 2.0: Structured JSON Output with Strict Schema',
        },
        description: {
          uk: 'Перехід на суворі схеми валідації типів власної архітектури ТОВ «Рекрієйт».',
          en: 'Transition to strict type validation schemas engineered by LLC «Recreate».',
        },
        changes: {
          uk: ['Підтримка складних вкладених об’єктів', 'Валідація дат та валют'],
          en: ['Support for deeply nested objects', 'Date and currency validation'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/documind-ai-studio/releases/tag/v2.0.1',
        demoUrl: 'https://ais-dev-documind-demo.recreate.ua/?v=2.0.1',
      },
      {
        version: 'v1.4.0',
        date: '10.06.2026',
        commitHash: '9b24ac5',
        title: {
          uk: 'Базовий реліз: Авторська веб-версія ТОВ «Рекрієйт»',
          en: 'Base Release: Proprietary Web Edition by LLC «Recreate»',
        },
        description: {
          uk: 'Перша публічна демонстрація архітектури в репозиторії GitHub.',
          en: 'First public demonstration of the architecture in GitHub repository.',
        },
        changes: {
          uk: ['Початкова інтеграція алгоритмів розпізнавання', 'Односторінковий аналіз'],
          en: ['Initial recognition algorithm pipeline', 'Single-page document analysis'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/documind-ai-studio/releases/tag/v1.4.0',
        demoUrl: 'https://ais-dev-documind-demo.recreate.ua/?v=1.4.0',
      },
    ],
  },
  {
    id: 'visioncraft-studio',
    slug: 'visioncraft-studio',
    name: {
      uk: 'VisionCraft Studio',
      en: 'VisionCraft Studio',
    },
    tagline: {
      uk: 'Генеративна дизайн-студія медіаконтенту та рекламних креативів',
      en: 'Generative media design studio for commercial assets and creative banners',
    },
    shortDescription: {
      uk: 'Створення та редагування комерційних ілюстрацій, фотографій товарів та банерів з підтримкою стилістики бренду без залучення сторонніх агентств.',
      en: 'Creation and editing of commercial illustrations, product photography, and marketing banners with consistent brand aesthetics without external agencies.',
    },
    fullDescription: {
      uk: 'VisionCraft Studio — пропрієтарна платформа медіагенерації, створена лабораторією ТОВ «Рекрієйт». Дозволяє формувати маркетингові матеріали, змінювати фон на фотографіях продукції, виконувати розумний інпейнтинг та зберігати високу роздільну здатність для поліграфії чи інтернет-магазинів.',
      en: 'VisionCraft Studio is a proprietary media generation platform developed in-house by LLC «Recreate». It empowers teams to generate marketing assets, replace backgrounds on product photos, execute precision inpainting, and retain ultra-high 4K resolution for print or e-commerce.',
    },
    category: {
      uk: 'Дизайн та Генеративний Медіа-арт',
      en: 'Design & Generative Media Art',
    },
    engineArchitecture: 'Recreate Generative Visual Engine v2.4 (Власна розробка ТОВ «Рекрієйт»)',
    githubUrl: 'https://github.com/recreate-ua/visioncraft-studio',
    demoUrl: 'https://ais-dev-visioncraft-demo.recreate.ua',
    currentVersion: 'v2.4.0',
    badges: ['Розробка ТОВ «Рекрієйт»', '4K Upscale', 'E-commerce Ready', 'Brand Presets'],
    features: [
      {
        title: {
          uk: 'Генерація каталогів для E-commerce',
          en: 'E-commerce Catalog Generation',
        },
        desc: {
          uk: 'Фотосесії товарів у будь-яких інтер’єрах та освітленні за текстовим описом або референсом.',
          en: 'Product photoshoots in any interior or lighting condition guided by text prompts or reference imagery.',
        },
      },
      {
        title: {
          uk: 'Точковий Inpainting та заміна фону',
          en: 'Precision Inpainting & Background Replacement',
        },
        desc: {
          uk: 'Виділення та заміна окремих деталей зображення без втрати оригінальної якості об’єкта.',
          en: 'Isolate and replace individual image elements without degrading the native quality of the object.',
        },
      },
      {
        title: {
          uk: 'Підтримка фірмового брендбуку',
          en: 'Brand Identity & HEX Color Presets',
        },
        desc: {
          uk: 'Збереження кольорової палітри HEX та композиційних вимог вашої компанії.',
          en: 'Strict preservation of brand HEX palettes and company composition standards.',
        },
      },
    ],
    techStack: ['Recreate Visual Core', 'Canvas API', 'WebGPU Shaders', 'Vite', 'TypeScript'],
    hourlyPriceUah: 60,
    monthlyPriceUah: 540,
    mockPreviewType: 'visioncraft',
    versions: [
      {
        version: 'v2.4.0',
        date: '18.09.2026',
        isLatest: true,
        commitHash: '5e83a91',
        title: {
          uk: 'Реліз 2.4: Підтримка 4K апскейлу та пресети брендбуку',
          en: 'Release 2.4: 4K Upscale Support & Brand Presets',
        },
        description: {
          uk: 'Додано супер-роздільну здатність 4K, нові інструменти маскування та збереження проектів у хмарі.',
          en: 'Added 4K ultra-resolution upscaling, advanced masking tools, and cloud project saving.',
        },
        changes: {
          uk: [
            'Оновлення авторського алгоритму генерації фотореалістичних текстур',
            'Збереження історії версій генерацій',
            'Інтеграція з прямим експортом для соцмереж',
          ],
          en: [
            'Updated proprietary Recreate Visual Core texture generation algorithm',
            'Project generation history tracking',
            'Direct export presets for social media and marketplaces',
          ],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/visioncraft-studio/releases/tag/v2.4.0',
        demoUrl: 'https://ais-dev-visioncraft-demo.recreate.ua/?v=2.4.0',
      },
      {
        version: 'v2.1.0',
        date: '28.07.2026',
        commitHash: '2c88f19',
        title: {
          uk: 'Реліз 2.1: Швидке видалення фону та розумний кроп',
          en: 'Release 2.1: Instant Background Removal & Smart Crop',
        },
        description: {
          uk: 'Локальне відсікання заднього плану за допомогою нейромережевої маски без затримок мережі.',
          en: 'Local background cutout using neural masks with zero network latency.',
        },
        changes: {
          uk: ['Оптимізація пам’яті браузера', 'Підтримка форматів WebP та PNG з прозорістю'],
          en: ['Browser memory footprint optimization', 'WebP and transparent PNG export support'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/visioncraft-studio/releases/tag/v2.1.0',
        demoUrl: 'https://ais-dev-visioncraft-demo.recreate.ua/?v=2.1.0',
      },
      {
        version: 'v1.0.0',
        date: '15.05.2026',
        commitHash: '8a11bc3',
        title: {
          uk: 'Початкова демо-версія ТОВ «Рекрієйт»',
          en: 'Initial Demo Release by LLC «Recreate»',
        },
        description: {
          uk: 'Базовий веб-інтерфейс для генерації візуалів.',
          en: 'Foundational web interface for generative visuals.',
        },
        changes: {
          uk: ['Створення прототипу', 'Публікація вихідного коду на GitHub'],
          en: ['Prototype architecture implementation', 'Source code published to GitHub'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/visioncraft-studio/releases/tag/v1.0.0',
        demoUrl: 'https://ais-dev-visioncraft-demo.recreate.ua/?v=1.0.0',
      },
    ],
  },
  {
    id: 'datasynth-bot',
    slug: 'datasynth-bot',
    name: {
      uk: 'DataSynth Bot',
      en: 'DataSynth Bot',
    },
    tagline: {
      uk: 'Розумний асистент бізнес-аналітики, SQL-синтезу та інтерактивних звітів',
      en: 'Intelligent business analytics assistant with Text-to-SQL synthesis & live dashboards',
    },
    shortDescription: {
      uk: 'Трансформація природної мови у складні аналітичні запити, автоматичний аудит баз даних та побудова графіків для керівників без написання коду.',
      en: 'Converts natural language queries into complex analytical SQL, automatically audits databases, and builds executive charts without writing code.',
    },
    fullDescription: {
      uk: 'DataSynth Bot — інтелектуальна аналітична система, створена інженерною командою ТОВ «Рекрієйт». Дозволяє швидко аналізувати продажі, залишки товарів та фінансові метрики. Достатньо запитати: "Покажи порівняння прибутку за 3-й квартал по категоріях" — і бот генерує точні SQL-запити, інтерактивні графіки та рекомендації.',
      en: 'DataSynth Bot is an intelligent analytics platform engineered by LLC «Recreate». It enables rapid analysis of sales, inventory balances, and key performance metrics. Simply ask: "Compare Q3 revenue by product category" — and the bot returns precise SQL, interactive charts, and actionable executive insights.',
    },
    category: {
      uk: 'Бізнес-аналітика та BI',
      en: 'Business Intelligence & SQL Analytics',
    },
    engineArchitecture: 'Recreate SQL Synthesizer & BI Engine v1.8 (Власна розробка ТОВ «Рекрієйт»)',
    githubUrl: 'https://github.com/recreate-ua/datasynth-business-bot',
    demoUrl: 'https://ais-dev-datasynth-demo.recreate.ua',
    currentVersion: 'v1.8.0',
    badges: ['Розробка ТОВ «Рекрієйт»', 'Text-to-SQL', 'Live Dashboard', 'Zero-leak Архітектура'],
    features: [
      {
        title: {
          uk: 'Запити людською мовою (Text-to-SQL / Excel)',
          en: 'Natural Language Queries (Text-to-SQL / Excel)',
        },
        desc: {
          uk: 'Працює з PostgreSQL, MySQL, ClickHouse та файлами Excel/CSV.',
          en: 'Seamless connectivity with PostgreSQL, MySQL, ClickHouse, and Excel/CSV spreadsheets.',
        },
      },
      {
        title: {
          uk: 'Миттєва візуалізація та дашборди',
          en: 'Instant Visualizations & Live Dashboards',
        },
        desc: {
          uk: 'Автоматичний вибір оптимального типу графіка (стовпчасті діаграми, динаміка, теплові карти).',
          en: 'Automatic selection of optimal chart types (bar charts, time-series trends, heatmaps).',
        },
      },
      {
        title: {
          uk: 'Анонімізація та безпека комерційної таємниці',
          en: 'Data Anonymization & Trade Secret Protection',
        },
        desc: {
          uk: 'Обробка виконується на захищених серверах ТОВ «Рекрієйт». Дані не передаються стороннім сервісам.',
          en: 'Processing runs exclusively on protected LLC «Recreate» servers. Zero data leakage to external models.',
        },
      },
    ],
    techStack: ['Recreate Query Engine', 'Recharts', 'TypeScript', 'SQL Parser'],
    hourlyPriceUah: 55,
    monthlyPriceUah: 480,
    mockPreviewType: 'datasynth',
    versions: [
      {
        version: 'v1.8.0',
        date: '17.09.2026',
        isLatest: true,
        commitHash: '4d19bb2',
        title: {
          uk: 'Реліз 1.8: Інтерактивні графіки та генерація звітів у PDF',
          en: 'Release 1.8: Interactive Charts & PDF Report Generation',
        },
        description: {
          uk: 'Додано підтримку динамічних фільтрів, експорт готової презентації для засідання ради директорів.',
          en: 'Added support for dynamic query filters and executive board presentation export.',
        },
        changes: {
          uk: [
            'Підтримка великих CSV-файлів до 200 МБ',
            'Голосовий ввід запитів українською та англійською мовами',
            'Інтеграція з локальними аналітичними таблицями',
          ],
          en: [
            'Support for large CSV files up to 200 MB',
            'Voice input support in Ukrainian and English',
            'Integration with local spreadsheet data tables',
          ],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/datasynth-business-bot/releases/tag/v1.8.0',
        demoUrl: 'https://ais-dev-datasynth-demo.recreate.ua/?v=1.8.0',
      },
      {
        version: 'v1.5.0',
        date: '12.08.2026',
        commitHash: '1a93ff7',
        title: {
          uk: 'Реліз 1.5: Виявлення аномалій та прогноз продажів',
          en: 'Release 1.5: Anomaly Detection & Cash Flow Forecasting',
        },
        description: {
          uk: 'Модуль прогностичного моделювання динаміки касових розривів.',
          en: 'Predictive modeling module forecasting liquidity and cash flow trends.',
        },
        changes: {
          uk: ['Алгоритм згладжування трендів', 'Сповіщення в Telegram'],
          en: ['Trend smoothing mathematical engine', 'Automated Telegram alerts for KPI deviations'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/datasynth-business-bot/releases/tag/v1.5.0',
        demoUrl: 'https://ais-dev-datasynth-demo.recreate.ua/?v=1.5.0',
      },
      {
        version: 'v1.0.0',
        date: '01.06.2026',
        commitHash: '6b42dd9',
        title: {
          uk: 'Базовий реліз Text-to-SQL ТОВ «Рекрієйт»',
          en: 'Base Release: Text-to-SQL Core by LLC «Recreate»',
        },
        description: {
          uk: 'Початкова перевірка авторської концепції генерації SQL.',
          en: 'Initial proof of concept for SQL generation architecture.',
        },
        changes: {
          uk: ['Підтримка PostgreSQL', 'Перший публічний репозиторій на GitHub'],
          en: ['PostgreSQL connector support', 'First public GitHub repository release'],
        },
        githubReleaseUrl: 'https://github.com/recreate-ua/datasynth-business-bot/releases/tag/v1.0.0',
        demoUrl: 'https://ais-dev-datasynth-demo.recreate.ua/?v=1.0.0',
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
