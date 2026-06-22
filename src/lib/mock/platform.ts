// Deterministic mock helpers for finance / business / developers / marketplace.
let seed = 1337;
const rng = () => {
  seed = (seed * 1664525 + 1013904223) % 2 ** 32;
  return seed / 2 ** 32;
};
export const reseed = (s: number) => { seed = s; };
export const pick = <T,>(a: T[]) => a[Math.floor(rng() * a.length)];
export const rnum = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;
export const series = (n: number, base = 100, jitter = 30) => Array.from({ length: n }, () => Math.max(0, Math.round(base + (rng() - 0.5) * jitter)));

export const fmtRub = (v: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(v);

export const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};
export const fmtDate = (d: Date) => d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
export const fmtDateTime = (d: Date) => d.toLocaleString("ru-RU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

const COUNTERPARTIES = ["ПАО Сбербанк", "Альфа-Банк", "Т-Банк", "OZON", "Яндекс Маркет", "Wildberries", "ИП Иванов А.А.", "ООО Восход", "ООО Полюс", "АО Газпром", "Цифрорубль", "ФНС России", "ПФР", "ТСЖ Восход", "Ростелеком", "МТС", "Билайн"];
const CATEGORIES = ["Покупки", "Переводы", "Услуги", "Налоги", "Связь", "ЖКХ", "Транспорт", "Развлечения", "Здоровье", "Образование"];

export type Tx = {
  id: string;
  date: Date;
  counterparty: string;
  category: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft";
  channel: "Цифровой рубль" | "СБП" | "Карта" | "Счёт";
};

export const generateTxs = (n = 40): Tx[] => {
  reseed(4242);
  return Array.from({ length: n }, (_, i) => ({
    id: `tx_${i.toString().padStart(4, "0")}`,
    date: daysAgo(i),
    counterparty: pick(COUNTERPARTIES),
    category: pick(CATEGORIES),
    amount: (rng() > 0.55 ? -1 : 1) * rnum(150, 35000),
    status: pick(["paid", "paid", "paid", "pending", "overdue"]) as Tx["status"],
    channel: pick(["Цифровой рубль", "СБП", "Карта", "Счёт"]) as Tx["channel"],
  }));
};

export type Recipient = { id: string; name: string; details: string; type: "person" | "company" | "self"; favorite: boolean };
export const recipients = (n = 12): Recipient[] => {
  reseed(11);
  const names = ["Анна П.", "Олег С.", "Мария И.", "Дмитрий К.", "Светлана Г.", "ООО Восход", "ИП Петров В.", "ООО Полюс", "АО Невский", "Илья Р."];
  return Array.from({ length: n }, (_, i) => ({
    id: `r_${i}`,
    name: names[i % names.length],
    details: pick(["+7 ••• ••• 42 18", "ИНН 7707083893", "Счёт •• 7842", "ЦР-кошелёк"]),
    type: pick(["person", "company", "self"]) as Recipient["type"],
    favorite: rng() > 0.6,
  }));
};

export type DocItem = { id: string; type: "Счёт" | "Договор" | "Акт" | "УПД" | "Счёт-фактура"; number: string; counterparty: string; amount: number; date: Date; status: "draft" | "pending" | "paid" | "approved" | "rejected" | "overdue" };
export const documents = (n = 18): DocItem[] => {
  reseed(77);
  return Array.from({ length: n }, (_, i) => ({
    id: `d_${i}`,
    type: pick(["Счёт", "Договор", "Акт", "УПД", "Счёт-фактура"]) as DocItem["type"],
    number: `№ ${2024 - rnum(0, 2)}/${rnum(100, 999)}`,
    counterparty: pick(COUNTERPARTIES),
    amount: rnum(5_000, 850_000),
    date: daysAgo(i * 2),
    status: pick(["draft", "pending", "paid", "approved", "rejected", "overdue"]) as DocItem["status"],
  }));
};

export const cashAccounts = [
  { id: "wallet", label: "Цифровой рубль", balance: 248_350, integration: "pending-official-api" as const, hint: "Доступно через банк-партнёр" },
  { id: "sber", label: "Сбербанк · •• 4582", balance: 184_200, integration: "pending-official-api" as const, hint: "Подключение через Open API банка" },
  { id: "alfa", label: "Альфа-Банк · •• 7841", balance: 92_180, integration: "pending-official-api" as const, hint: "Подключение через Open API банка" },
  { id: "sbp", label: "СБП", balance: 0, integration: "pending-official-api" as const, hint: "Подключение через НСПК" },
];

export const autopayments = () => {
  reseed(31);
  return Array.from({ length: 8 }, (_, i) => ({
    id: `ap_${i}`,
    name: pick(["Интернет МТС", "Мобильная связь", "ЖКХ", "Подписка Apple", "Спортзал", "Кредит", "Школа", "Доставка воды"]),
    amount: rnum(190, 12_000),
    nextDate: daysAgo(-rnum(1, 18)),
    status: pick(["active", "active", "active", "pending"]) as "active" | "pending",
  }));
};

export const partners = [
  { name: "ПАО Сбербанк", role: "Системно значимый банк", status: "pending-official-api" as const },
  { name: "Т-Банк", role: "Банк-партнёр", status: "pending-official-api" as const },
  { name: "Альфа-Банк", role: "Банк-партнёр", status: "pending-official-api" as const },
  { name: "Газпромбанк", role: "Банк-партнёр", status: "pending-official-api" as const },
  { name: "ВТБ", role: "Системно значимый банк", status: "pending-official-api" as const },
  { name: "Россельхозбанк", role: "Банк-партнёр", status: "pending-official-api" as const },
];

// ---------- Business mocks ----------
const FIRST = ["Анна", "Олег", "Мария", "Дмитрий", "Светлана", "Иван", "Юлия", "Игорь", "Кира", "Артём", "Полина", "Виктор"];
const LAST = ["Иванова", "Петров", "Соколов", "Кузнецова", "Орлов", "Васильева", "Лебедев", "Морозова", "Новиков", "Зайцева"];

export type Lead = { id: string; name: string; company: string; status: "new" | "qualified" | "proposal" | "won" | "lost"; amount: number; owner: string; updated: Date };
export const leads = (n = 24): Lead[] => {
  reseed(99);
  return Array.from({ length: n }, (_, i) => ({
    id: `l_${i}`,
    name: `${pick(FIRST)} ${pick(LAST)}`,
    company: pick(["ООО Восход", "АО Полюс", "ИП Петров", "ООО Альфа", "ООО Бета", "АО Север", "ООО Восток"]),
    status: pick(["new", "qualified", "proposal", "won", "lost", "qualified", "new"]) as Lead["status"],
    amount: rnum(15_000, 1_500_000),
    owner: pick(["Артём", "Кира", "Полина", "Виктор"]),
    updated: daysAgo(i),
  }));
};

export type Product = { id: string; sku: string; name: string; category: string; price: number; cost: number; stock: number; min: number };
export const products = (n = 30): Product[] => {
  reseed(202);
  const names = ["Кофе зерновой", "Чай зелёный", "Шоколад", "Печенье", "Сок", "Вода", "Молоко", "Сыр", "Орехи", "Мёд", "Конфеты", "Снеки"];
  return Array.from({ length: n }, (_, i) => ({
    id: `p_${i}`,
    sku: `SKU-${(1000 + i).toString()}`,
    name: `${pick(names)} ${i + 1}`,
    category: pick(["Напитки", "Сладости", "Снеки", "Молочное", "Продукты"]),
    price: rnum(85, 4500),
    cost: rnum(40, 2500),
    stock: rnum(0, 250),
    min: rnum(5, 30),
  }));
};

export const tasks = (n = 18) => {
  reseed(33);
  const titles = ["Подготовить КП", "Согласовать договор", "Отгрузка заказа", "Звонок клиенту", "Отчёт за неделю", "Создать счёт", "Инвентаризация", "Закупка товара"];
  return Array.from({ length: n }, (_, i) => ({
    id: `t_${i}`,
    title: pick(titles),
    assignee: pick(["Артём", "Кира", "Полина", "Виктор"]),
    priority: pick(["low", "med", "high", "med"]) as "low" | "med" | "high",
    due: daysAgo(-rnum(0, 14)),
    status: pick(["todo", "doing", "review", "done"]) as "todo" | "doing" | "review" | "done",
  }));
};

export const projects = () => {
  reseed(55);
  const names = ["Запуск каталога", "Интеграция Альфа-Банк", "Открытие филиала", "Маркетинг Q1", "Внедрение CRM", "Перенос склада"];
  return names.map((n, i) => ({
    id: `pj_${i}`,
    name: n,
    progress: rnum(15, 95),
    owner: pick(["Артём", "Кира", "Полина"]),
    deadline: daysAgo(-rnum(7, 60)),
    team: rnum(3, 11),
  }));
};

// ---------- Developer mocks ----------
export const apiKeys = () => {
  reseed(7);
  return Array.from({ length: 5 }, (_, i) => ({
    id: `k_${i}`,
    name: ["Production", "Staging", "Test bot", "Mobile app", "Webhook"][i],
    prefix: `cr_live_${Math.random().toString(36).slice(2, 8)}`,
    created: daysAgo(rnum(2, 180)),
    lastUsed: daysAgo(rnum(0, 7)),
    requests: rnum(1_000, 250_000),
    scopes: pick([["read"], ["read", "write"], ["read", "write", "admin"]]),
  }));
};

export const webhooks = () => {
  reseed(8);
  return ["https://api.acme.ru/cr/hook", "https://crm.example.com/cifrorubl", "https://hooks.zapier.com/abc"].map((url, i) => ({
    id: `wh_${i}`,
    url,
    events: pick([["payment.created"], ["payment.created", "document.signed"], ["*"]]),
    status: pick(["healthy", "healthy", "failing"]) as "healthy" | "failing",
    last: daysAgo(rnum(0, 3)),
    success: rnum(85, 100),
  }));
};

export const eventsCatalog = [
  { name: "payment.created", category: "Платежи", desc: "Создан новый платёж" },
  { name: "payment.completed", category: "Платежи", desc: "Платёж завершён" },
  { name: "payment.failed", category: "Платежи", desc: "Платёж не выполнен" },
  { name: "transfer.sent", category: "Переводы", desc: "Перевод отправлен" },
  { name: "transfer.received", category: "Переводы", desc: "Перевод получен" },
  { name: "document.created", category: "Документы", desc: "Документ создан" },
  { name: "document.signed", category: "Документы", desc: "Документ подписан КЭП" },
  { name: "invoice.paid", category: "Счета", desc: "Счёт оплачен" },
  { name: "invoice.overdue", category: "Счета", desc: "Счёт просрочен" },
  { name: "customer.created", category: "Контрагенты", desc: "Создан контрагент" },
  { name: "organization.updated", category: "Организация", desc: "Изменены данные организации" },
  { name: "user.role.assigned", category: "Пользователи", desc: "Назначена роль" },
  { name: "task.created", category: "Задачи", desc: "Создана задача" },
  { name: "task.completed", category: "Задачи", desc: "Задача завершена" },
  { name: "ai.suggestion", category: "AI", desc: "Сгенерирована рекомендация" },
  { name: "marketplace.app.installed", category: "Marketplace", desc: "Установлено приложение" },
  { name: "integration.connected", category: "Интеграции", desc: "Подключена интеграция" },
  { name: "security.alert", category: "Безопасность", desc: "Подозрительная активность" },
];

export const endpoints = [
  { method: "GET", path: "/v1/payments", desc: "Список платежей" },
  { method: "POST", path: "/v1/payments", desc: "Создать платёж" },
  { method: "GET", path: "/v1/payments/{id}", desc: "Получить платёж" },
  { method: "POST", path: "/v1/transfers", desc: "Создать перевод" },
  { method: "GET", path: "/v1/wallets", desc: "Кошельки пользователя" },
  { method: "GET", path: "/v1/wallets/{id}/balance", desc: "Баланс кошелька" },
  { method: "POST", path: "/v1/qr", desc: "Создать QR на оплату" },
  { method: "GET", path: "/v1/documents", desc: "Список документов" },
  { method: "POST", path: "/v1/documents", desc: "Создать документ" },
  { method: "POST", path: "/v1/documents/{id}/sign", desc: "Подписать документ" },
  { method: "GET", path: "/v1/customers", desc: "Контрагенты" },
  { method: "POST", path: "/v1/webhooks", desc: "Создать webhook" },
  { method: "GET", path: "/v1/events", desc: "Журнал событий" },
];

export const sdks = [
  { id: "ts", name: "TypeScript / Node", install: "npm install @cifrorubl/sdk" },
  { id: "js", name: "JavaScript", install: "npm install @cifrorubl/sdk" },
  { id: "py", name: "Python", install: "pip install cifrorubl" },
  { id: "go", name: "Go", install: "go get github.com/cifrorubl/go-sdk" },
  { id: "java", name: "Java", install: "implementation 'ru.cifrorubl:sdk:1.0.0'" },
  { id: "php", name: "PHP", install: "composer require cifrorubl/sdk" },
  { id: "csharp", name: "C# / .NET", install: "dotnet add package Cifrorubl.Sdk" },
  { id: "rust", name: "Rust", install: "cargo add cifrorubl" },
  { id: "kotlin", name: "Kotlin", install: "implementation 'ru.cifrorubl:sdk-kotlin:1.0.0'" },
  { id: "swift", name: "Swift", install: ".package(url: \"https://github.com/cifrorubl/swift-sdk\", from: \"1.0.0\")" },
  { id: "dart", name: "Dart / Flutter", install: "flutter pub add cifrorubl" },
  { id: "ruby", name: "Ruby", install: "gem install cifrorubl" },
];

// ---------- Marketplace mocks ----------
export type App = { id: string; name: string; vendor: string; category: string; rating: number; installs: number; verified: boolean; tagline: string };
export const apps = (): App[] => {
  reseed(19);
  const data: [string, string, string, string][] = [
    ["1С: Бухгалтерия", "1С", "Бухгалтерия", "Автоматическая загрузка операций и документов"],
    ["Сбербанк Бизнес", "ПАО Сбербанк", "Банковские сервисы", "Подключение расчётных счетов и платежей"],
    ["Альфа-Бизнес", "Альфа-Банк", "Банковские сервисы", "Управление расчётными счетами и платежами"],
    ["Т-Бизнес", "Т-Банк", "Банковские сервисы", "Подключение счётов через официальное API"],
    ["Контур.Эльба", "Контур", "Бухгалтерия", "Отчётность и налоги для ИП и ООО"],
    ["amoCRM", "amoCRM", "CRM", "Двусторонняя синхронизация сделок и контактов"],
    ["Bitrix24", "Bitrix24", "CRM", "Подключение CRM и документов"],
    ["МойСклад", "МойСклад", "Склад", "Управление товарами и остатками"],
    ["СБИС", "Тензор", "Документооборот", "Электронный документооборот и КЭП"],
    ["Контур.Диадок", "Контур", "Документооборот", "ЭДО с контрагентами через оператора"],
    ["DocuSign", "DocuSign", "Подписи документов", "Электронные подписи документов"],
    ["Яндекс.Доставка", "Яндекс", "Доставка", "Логистика и отправления"],
    ["СДЭК", "СДЭК", "Логистика", "Управление отправлениями"],
    ["Почта России", "Почта России", "Логистика", "Создание и отслеживание отправлений"],
    ["OZON Seller", "OZON", "E-commerce", "Управление магазином на OZON"],
    ["Wildberries", "Wildberries", "E-commerce", "Заказы и аналитика WB"],
    ["МТС Маркетолог", "МТС", "Маркетинг", "Рассылки и сегменты"],
    ["UniSender", "UniSender", "Маркетинг", "Email-рассылки и автоматизация"],
    ["Telegram Bot", "ЦифроРубль", "Коммуникации", "Уведомления и оплата через бота"],
    ["AI Анализ продаж", "ЦифроРубль AI", "AI", "Анализ ассортимента и прогноз"],
    ["AI Помощник договоров", "ЦифроРубль AI", "AI", "Черновики договоров и проверка"],
    ["Atol Online", "АТОЛ", "Онлайн-кассы", "Облачная касса"],
    ["ФНС: личный кабинет", "ФНС России", "Государственные сервисы", "Подключение через ЕСИА"],
    ["Госуслуги бизнеса", "Госуслуги", "Государственные сервисы", "Авторизация и подача отчётов"],
    ["Power BI Connector", "Microsoft", "Аналитика", "Выгрузка данных в BI"],
    ["Tableau Connector", "Tableau", "Аналитика", "Дашборды и отчёты"],
    ["Slack", "Slack", "Коммуникации", "Уведомления в каналы"],
    ["Notion", "Notion", "Коммуникации", "Заметки и базы знаний"],
    ["Zapier", "Zapier", "Автоматизация", "Связь с 5000+ сервисов"],
    ["n8n", "n8n", "Автоматизация", "Self-hosted workflow"],
  ];
  return data.map(([name, vendor, category, tagline], i) => ({
    id: `app_${i}`,
    name,
    vendor,
    category,
    rating: 4 + rng(),
    installs: rnum(120, 50_000),
    verified: rng() > 0.3,
    tagline,
  }));
};

export const reviews = () => {
  reseed(60);
  return Array.from({ length: 6 }, (_, i) => ({
    id: `rv_${i}`,
    author: `${pick(FIRST)} ${pick(LAST)[0]}.`,
    rating: rnum(3, 5),
    date: daysAgo(rnum(1, 60)),
    text: pick([
      "Отличная интеграция, работает стабильно.",
      "Подключение заняло несколько минут.",
      "Хорошая документация, понятный API.",
      "Не хватает экспорта в CSV.",
      "Поддержка отвечает быстро.",
      "Идеально подходит для небольшого бизнеса.",
    ]),
  }));
};
