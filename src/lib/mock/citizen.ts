// Deterministic mock data for citizen module. Pure functions, no side effects.

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type TxType = "income" | "expense" | "transfer";
export type TxStatus = "completed" | "pending" | "failed";

export type Transaction = {
  id: string;
  date: string; // ISO
  title: string;
  category: string;
  amount: number; // positive = income, negative = expense
  type: TxType;
  status: TxStatus;
  account: string;
};

const CATEGORIES = [
  { name: "Продукты", type: "expense" },
  { name: "Транспорт", type: "expense" },
  { name: "Кафе и рестораны", type: "expense" },
  { name: "ЖКХ", type: "expense" },
  { name: "Связь", type: "expense" },
  { name: "Интернет", type: "expense" },
  { name: "Развлечения", type: "expense" },
  { name: "Здоровье", type: "expense" },
  { name: "Одежда", type: "expense" },
  { name: "Подписки", type: "expense" },
  { name: "Зарплата", type: "income" },
  { name: "Перевод", type: "transfer" },
  { name: "Возврат", type: "income" },
] as const;

const MERCHANTS: Record<string, string[]> = {
  Продукты: ["Пятёрочка", "Перекрёсток", "Магнит", "ВкусВилл", "Лента"],
  Транспорт: ["Метро", "Яндекс Такси", "АЗС Лукойл", "Сити-Мобил", "Тройка"],
  "Кафе и рестораны": ["Surf Coffee", "Кофемания", "Шоколадница", "Тануки", "White Rabbit"],
  ЖКХ: ["Мосэнергосбыт", "МосОблЕИРЦ", "Водоканал"],
  Связь: ["МТС", "Билайн", "МегаФон", "Т2"],
  Интернет: ["Ростелеком", "Дом.ru", "МГТС"],
  Развлечения: ["Кинопоиск", "VK Музыка", "Афиша", "Литрес"],
  Здоровье: ["Аптека 36.6", "СберЗдоровье", "Инвитро"],
  Одежда: ["Lamoda", "Wildberries", "Ozon", "Спортмастер"],
  Подписки: ["Yandex Plus", "VK Combo", "iCloud+", "ChatGPT"],
  Зарплата: ["ООО Технологии Будущего"],
  Перевод: ["Иван Петров", "Анна Смирнова", "Сергей Иванов", "Свой счёт"],
  Возврат: ["Wildberries возврат", "Ozon возврат"],
};

const ACCOUNTS = ["Основной счёт", "Сберегательный", "Цифровой рубль"];

export function generateTransactions(count = 80, seed = 42): Transaction[] {
  const rand = mulberry32(seed);
  const now = Date.now();
  const out: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const cat = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];
    const merchants = MERCHANTS[cat.name] ?? ["Платёж"];
    const merchant = merchants[Math.floor(rand() * merchants.length)];
    const daysAgo = Math.floor(rand() * 60);
    const date = new Date(now - daysAgo * 86400000 - Math.floor(rand() * 86400000)).toISOString();
    const type = cat.type as TxType;
    let amount = 0;
    if (type === "income") amount = Math.floor(40000 + rand() * 80000);
    else if (type === "transfer") amount = (rand() > 0.5 ? 1 : -1) * Math.floor(500 + rand() * 15000);
    else amount = -Math.floor(150 + rand() * 6000);
    out.push({
      id: `tx_${i}_${Math.floor(rand() * 100000)}`,
      date,
      title: merchant,
      category: cat.name,
      amount,
      type,
      status: rand() > 0.05 ? "completed" : rand() > 0.5 ? "pending" : "failed",
      account: ACCOUNTS[Math.floor(rand() * ACCOUNTS.length)],
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  nextChargeAt: string;
  autoRenew: boolean;
  category: string;
  icon: string;
};

export const subscriptions: Subscription[] = [
  { id: "s1", name: "Yandex Plus", amount: 399, nextChargeAt: in_days(5), autoRenew: true, category: "Развлечения", icon: "Y" },
  { id: "s2", name: "iCloud+ 200GB", amount: 199, nextChargeAt: in_days(12), autoRenew: true, category: "Облако", icon: "iC" },
  { id: "s3", name: "VK Combo", amount: 199, nextChargeAt: in_days(20), autoRenew: true, category: "Развлечения", icon: "VK" },
  { id: "s4", name: "ChatGPT Plus", amount: 1800, nextChargeAt: in_days(2), autoRenew: false, category: "AI", icon: "AI" },
  { id: "s5", name: "Литрес Подписка", amount: 499, nextChargeAt: in_days(18), autoRenew: true, category: "Книги", icon: "Л" },
  { id: "s6", name: "Кинопоиск", amount: 299, nextChargeAt: in_days(8), autoRenew: true, category: "Фильмы", icon: "К" },
];

function in_days(d: number) {
  return new Date(Date.now() + d * 86400000).toISOString();
}

export type Notification = {
  id: string;
  title: string;
  description: string;
  category: "payment" | "transfer" | "security" | "document" | "ai" | "system";
  read: boolean;
  createdAt: string;
};

export const notifications: Notification[] = [
  { id: "n1", title: "Оплата ЖКХ прошла", description: "5 420 ₽ списано в пользу Мосэнергосбыт", category: "payment", read: false, createdAt: in_days(-0.1) },
  { id: "n2", title: "Новый вход в аккаунт", description: "Москва · Chrome на macOS", category: "security", read: false, createdAt: in_days(-0.5) },
  { id: "n3", title: "Перевод от Анны Смирновой", description: "+12 000 ₽ на основной счёт", category: "transfer", read: true, createdAt: in_days(-1) },
  { id: "n4", title: "AI: подготовлен отчёт за май", description: "Ваш ежемесячный отчёт о расходах готов", category: "ai", read: true, createdAt: in_days(-2) },
  { id: "n5", title: "Документ загружен", description: "Договор оказания услуг №2024-15", category: "document", read: true, createdAt: in_days(-3) },
  { id: "n6", title: "Списание подписки Yandex Plus", description: "399 ₽ списано автоматически", category: "payment", read: true, createdAt: in_days(-4) },
];

export type Account = {
  id: string;
  name: string;
  type: "main" | "savings" | "digital_ruble";
  balance: number;
  currency: "RUB";
  last4: string;
  status: "active" | "pending_api";
};

export const accounts: Account[] = [
  { id: "a1", name: "Основной счёт", type: "main", balance: 158420.5, currency: "RUB", last4: "4521", status: "active" },
  { id: "a2", name: "Сберегательный", type: "savings", balance: 412300.0, currency: "RUB", last4: "8810", status: "active" },
  { id: "a3", name: "Цифровой рубль", type: "digital_ruble", balance: 0, currency: "RUB", last4: "0000", status: "pending_api" },
];

export type Contact = {
  id: string;
  name: string;
  phone: string;
  initials: string;
};

export const favorites: Contact[] = [
  { id: "c1", name: "Анна Смирнова", phone: "+7 900 123-45-67", initials: "АС" },
  { id: "c2", name: "Сергей Иванов", phone: "+7 901 234-56-78", initials: "СИ" },
  { id: "c3", name: "Мама", phone: "+7 902 345-67-89", initials: "М" },
  { id: "c4", name: "Иван Петров", phone: "+7 903 456-78-90", initials: "ИП" },
];

export function formatRub(value: number, opts: { sign?: boolean } = {}) {
  const formatted = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2,
  }).format(Math.abs(value));
  if (opts.sign) return (value >= 0 ? "+" : "−") + " " + formatted;
  return value < 0 ? "−" + formatted : formatted;
}

export function summary(txs: Transaction[]) {
  const income = txs.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = txs.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  return { income, expense, balance: income - expense };
}
