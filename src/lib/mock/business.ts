// Deterministic business mock data shared across self-employed / IP / OOO cabinets.

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

const FIRST = ["Анна", "Иван", "Сергей", "Мария", "Дмитрий", "Елена", "Алексей", "Ольга", "Павел", "Наталья", "Максим", "Татьяна", "Артём", "Ирина", "Николай"];
const LAST = ["Смирнова", "Иванов", "Петров", "Соколова", "Михайлов", "Фёдорова", "Морозов", "Волкова", "Алексеев", "Лебедева", "Семёнов", "Егорова", "Павлов", "Козлова", "Степанов"];
const COMPANIES = ["ООО «Технологии Будущего»", "ИП Воронов А.Б.", "ООО «Северный Ветер»", "ООО «Орбита»", "ИП Гончарова Е.С.", "ООО «Финэксперт»", "АО «Восток-Логистика»", "ООО «Дельта-Софт»", "ИП Кузнецов И.В.", "ООО «Цитадель»"];

export type Client = {
  id: string; name: string; type: "person" | "company"; email: string; phone: string;
  totalSpent: number; ordersCount: number; lastInteractionAt: string; tags: string[]; notes: string;
};

export function generateClients(count = 24, seed = 7): Client[] {
  const r = mulberry32(seed);
  const out: Client[] = [];
  for (let i = 0; i < count; i++) {
    const isCompany = r() > 0.55;
    const name = isCompany ? COMPANIES[Math.floor(r() * COMPANIES.length)] : `${FIRST[Math.floor(r() * FIRST.length)]} ${LAST[Math.floor(r() * LAST.length)]}`;
    out.push({
      id: `cl_${i + 1}`,
      name,
      type: isCompany ? "company" : "person",
      email: `client${i + 1}@example.com`,
      phone: `+7 9${Math.floor(10 + r() * 89)} ${Math.floor(100 + r() * 899)}-${Math.floor(10 + r() * 89)}-${Math.floor(10 + r() * 89)}`,
      totalSpent: Math.floor(5000 + r() * 480000),
      ordersCount: Math.floor(1 + r() * 35),
      lastInteractionAt: new Date(Date.now() - Math.floor(r() * 90) * 86400000).toISOString(),
      tags: r() > 0.5 ? ["постоянный"] : r() > 0.5 ? ["VIP"] : ["новый"],
      notes: "",
    });
  }
  return out;
}

export type Service = {
  id: string; name: string; category: string; price: number; sku: string; description: string; published: boolean; favorite: boolean;
};

const SERVICE_NAMES = [
  ["Консультация по продукту", "Консалтинг"],
  ["Дизайн логотипа", "Дизайн"],
  ["Разработка лендинга", "Разработка"],
  ["SEO-аудит", "Маркетинг"],
  ["Настройка рекламы", "Маркетинг"],
  ["Видеосъёмка", "Контент"],
  ["Копирайтинг (1000 знаков)", "Контент"],
  ["Юридическая консультация", "Услуги"],
  ["Бухгалтерское сопровождение", "Услуги"],
  ["UX-исследование", "Дизайн"],
];

export function generateServices(seed = 9): Service[] {
  const r = mulberry32(seed);
  return SERVICE_NAMES.map(([name, cat], i) => ({
    id: `sv_${i + 1}`,
    name,
    category: cat,
    price: Math.floor(2000 + r() * 80000),
    sku: `SV-${String(i + 1).padStart(4, "0")}`,
    description: `${name} — типовая услуга, оказывается по согласованию объёма и сроков.`,
    published: r() > 0.2,
    favorite: r() > 0.6,
  }));
}

export type Invoice = {
  id: string; number: string; clientName: string; amount: number; issuedAt: string; dueAt: string;
  status: "paid" | "pending" | "overdue" | "draft"; method: "qr" | "card" | "bank";
};

export function generateInvoices(count = 30, seed = 11): Invoice[] {
  const r = mulberry32(seed);
  const out: Invoice[] = [];
  for (let i = 0; i < count; i++) {
    const issued = new Date(Date.now() - Math.floor(r() * 180) * 86400000);
    const due = new Date(issued.getTime() + Math.floor(7 + r() * 21) * 86400000);
    const isPast = due.getTime() < Date.now();
    const status: Invoice["status"] = r() > 0.65 ? "paid" : isPast && r() > 0.4 ? "overdue" : r() > 0.85 ? "draft" : "pending";
    out.push({
      id: `inv_${i + 1}`,
      number: `INV-2026-${String(i + 1).padStart(4, "0")}`,
      clientName: COMPANIES[i % COMPANIES.length],
      amount: Math.floor(3000 + r() * 280000),
      issuedAt: issued.toISOString(),
      dueAt: due.toISOString(),
      status,
      method: r() > 0.6 ? "qr" : r() > 0.4 ? "bank" : "card",
    });
  }
  return out.sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}

export type Product = {
  id: string; sku: string; name: string; category: string; price: number; cost: number; stock: number; reserved: number; barcode: string;
};
const PRODUCT_NAMES = ["Кофе зерновой 1кг", "Чай зелёный 250г", "Шоколад тёмный 100г", "Печенье овсяное", "Орехи кешью 500г", "Сироп ванильный", "Кружка керамическая", "Френч-пресс", "Кофемолка ручная", "Молоко овсяное 1л", "Фильтры бумажные", "Сахар тростниковый"];

export function generateProducts(seed = 13): Product[] {
  const r = mulberry32(seed);
  return PRODUCT_NAMES.map((name, i) => ({
    id: `pr_${i + 1}`,
    sku: `SKU-${String(i + 1).padStart(5, "0")}`,
    name,
    category: i < 6 ? "Продукты" : "Аксессуары",
    price: Math.floor(150 + r() * 4500),
    cost: Math.floor(80 + r() * 2500),
    stock: Math.floor(r() * 350),
    reserved: Math.floor(r() * 30),
    barcode: `460${Math.floor(r() * 1e10).toString().padStart(10, "0")}`,
  }));
}

export type Order = {
  id: string; number: string; customer: string; total: number; itemsCount: number; status: "new" | "in_progress" | "shipped" | "completed" | "cancelled";
  createdAt: string; payment: "paid" | "pending" | "refunded";
};

export function generateOrders(count = 28, seed = 17): Order[] {
  const r = mulberry32(seed);
  const statuses: Order["status"][] = ["new", "in_progress", "shipped", "completed", "cancelled"];
  return Array.from({ length: count }, (_, i) => ({
    id: `or_${i + 1}`,
    number: `ORD-${String(i + 1).padStart(5, "0")}`,
    customer: COMPANIES[i % COMPANIES.length],
    total: Math.floor(2500 + r() * 220000),
    itemsCount: Math.floor(1 + r() * 12),
    status: statuses[Math.floor(r() * statuses.length)],
    createdAt: new Date(Date.now() - Math.floor(r() * 60) * 86400000).toISOString(),
    payment: (r() > 0.7 ? "paid" : r() > 0.3 ? "pending" : "refunded") as Order["payment"],
  })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export type Supplier = {
  id: string; name: string; inn: string; contact: string; phone: string; deliveriesCount: number; totalPaid: number; status: "active" | "inactive";
};

export function generateSuppliers(seed = 19): Supplier[] {
  const r = mulberry32(seed);
  return Array.from({ length: 10 }, (_, i) => ({
    id: `sup_${i + 1}`,
    name: COMPANIES[i % COMPANIES.length],
    inn: String(7700000000 + Math.floor(r() * 99999999)),
    contact: `${FIRST[Math.floor(r() * FIRST.length)]} ${LAST[Math.floor(r() * LAST.length)]}`,
    phone: `+7 4${Math.floor(10 + r() * 89)} ${Math.floor(100 + r() * 899)}-${Math.floor(10 + r() * 89)}-${Math.floor(10 + r() * 89)}`,
    deliveriesCount: Math.floor(1 + r() * 80),
    totalPaid: Math.floor(50000 + r() * 5000000),
    status: r() > 0.15 ? "active" : "inactive",
  }));
}

export type Deal = {
  id: string; title: string; client: string; amount: number; stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  ownerInitials: string; updatedAt: string; probability: number;
};

export function generateDeals(seed = 23): Deal[] {
  const r = mulberry32(seed);
  const stages: Deal["stage"][] = ["lead", "qualified", "proposal", "negotiation", "won", "lost"];
  return Array.from({ length: 22 }, (_, i) => {
    const stage = stages[Math.floor(r() * stages.length)];
    return {
      id: `dl_${i + 1}`,
      title: `Сделка №${i + 1} — ${SERVICE_NAMES[Math.floor(r() * SERVICE_NAMES.length)][0]}`,
      client: COMPANIES[i % COMPANIES.length],
      amount: Math.floor(30000 + r() * 1200000),
      stage,
      ownerInitials: (FIRST[Math.floor(r() * FIRST.length)][0] + LAST[Math.floor(r() * LAST.length)][0]),
      updatedAt: new Date(Date.now() - Math.floor(r() * 30) * 86400000).toISOString(),
      probability: stage === "won" ? 100 : stage === "lost" ? 0 : Math.floor(20 + r() * 70),
    };
  });
}

export type Employee = {
  id: string; fullName: string; role: string; department: string; email: string; status: "active" | "invited" | "blocked";
  lastLoginAt: string; salary: number;
};

export function generateEmployees(seed = 29): Employee[] {
  const r = mulberry32(seed);
  const ROLES = ["Директор", "Бухгалтер", "Менеджер по продажам", "Маркетолог", "Логист", "Курьер", "Кладовщик", "HR"];
  const DEPTS = ["Управление", "Финансы", "Продажи", "Маркетинг", "Операции", "Склад"];
  return Array.from({ length: 14 }, (_, i) => ({
    id: `em_${i + 1}`,
    fullName: `${FIRST[Math.floor(r() * FIRST.length)]} ${LAST[Math.floor(r() * LAST.length)]}`,
    role: ROLES[Math.floor(r() * ROLES.length)],
    department: DEPTS[Math.floor(r() * DEPTS.length)],
    email: `employee${i + 1}@cifrorubl.demo`,
    status: r() > 0.85 ? "invited" : r() > 0.95 ? "blocked" : "active",
    lastLoginAt: new Date(Date.now() - Math.floor(r() * 14) * 86400000).toISOString(),
    salary: Math.floor(60000 + r() * 280000),
  }));
}

export type Organization = {
  id: string; name: string; inn: string; kpp: string; ogrn: string; address: string;
  type: "ip" | "ooo"; responsible: string; accountsCount: number; status: "active" | "archived";
};

export function generateOrganizations(seed = 31): Organization[] {
  const r = mulberry32(seed);
  return [
    { id: "o1", name: "ООО «ЦифроРубль Холдинг»", inn: "7704123456", kpp: "770401001", ogrn: "1027700100000", address: "Москва, ул. Тверская, 1", type: "ooo", responsible: "Сергей Морозов", accountsCount: 5, status: "active" },
    { id: "o2", name: "ООО «ЦифроРубль Софт»", inn: "7704654321", kpp: "770401001", ogrn: "1037700200000", address: "Москва, ул. Большая Никитская, 14", type: "ooo", responsible: "Анна Смирнова", accountsCount: 3, status: "active" },
    { id: "o3", name: "ООО «ЦифроРубль Логистика»", inn: "7724111222", kpp: "772401001", ogrn: "1037724300000", address: "Москва, Каширское ш., 22", type: "ooo", responsible: "Дмитрий Петров", accountsCount: 4, status: "active" },
    { id: "o4", name: "ООО «Северный Филиал»", inn: "7805333444", kpp: "780501001", ogrn: "1027805400000", address: "Санкт-Петербург, Невский, 100", type: "ooo", responsible: "Елена Фёдорова", accountsCount: 2, status: "active" },
    { id: "o5", name: "ИП Воронов А.Б.", inn: "504300000001", kpp: "—", ogrn: "318504300000001", address: "Московская обл., Химки", type: "ip", responsible: "Андрей Воронов", accountsCount: 1, status: "archived" },
  ];
}

export type PaymentApproval = {
  id: string; counterparty: string; amount: number; purpose: string; account: string; requestedBy: string;
  status: "awaiting" | "approved" | "rejected"; requestedAt: string; needsApprovers: number; approvedBy: number;
};

export function generatePaymentApprovals(seed = 37): PaymentApproval[] {
  const r = mulberry32(seed);
  return Array.from({ length: 12 }, (_, i) => {
    const st: PaymentApproval["status"] = r() > 0.6 ? "awaiting" : r() > 0.5 ? "approved" : "rejected";
    return {
      id: `pa_${i + 1}`,
      counterparty: COMPANIES[i % COMPANIES.length],
      amount: Math.floor(50000 + r() * 2800000),
      purpose: `Оплата по договору №${1000 + i}`,
      account: `40702810${Math.floor(r() * 1e12).toString().padStart(12, "0")}`,
      requestedBy: `${FIRST[Math.floor(r() * FIRST.length)]} ${LAST[Math.floor(r() * LAST.length)]}`,
      status: st,
      requestedAt: new Date(Date.now() - Math.floor(r() * 10) * 86400000).toISOString(),
      needsApprovers: 2,
      approvedBy: st === "approved" ? 2 : st === "awaiting" ? Math.floor(r() * 2) : 1,
    };
  });
}

export type AuditEntry = {
  id: string; who: string; action: string; entity: string; entityId: string; at: string; ip: string; device: string;
};

export function generateAudit(seed = 41): AuditEntry[] {
  const r = mulberry32(seed);
  const actions = ["Создал платёж", "Согласовал документ", "Изменил роль", "Вошёл в систему", "Скачал отчёт", "Изменил настройки", "Архивировал заказ"];
  const entities = ["payment", "document", "user_role", "session", "report", "settings", "order"];
  return Array.from({ length: 40 }, (_, i) => {
    const ai = Math.floor(r() * actions.length);
    return {
      id: `au_${i + 1}`,
      who: `${FIRST[Math.floor(r() * FIRST.length)]} ${LAST[Math.floor(r() * LAST.length)]}`,
      action: actions[ai],
      entity: entities[ai],
      entityId: `e_${1000 + i}`,
      at: new Date(Date.now() - Math.floor(r() * 30) * 86400000 - Math.floor(r() * 86400000)).toISOString(),
      ip: `${10 + Math.floor(r() * 245)}.${Math.floor(r() * 256)}.${Math.floor(r() * 256)}.${Math.floor(r() * 256)}`,
      device: r() > 0.5 ? "Chrome / macOS" : r() > 0.5 ? "Safari / iOS" : "Firefox / Windows",
    };
  });
}

export type SearchItem = { id: string; kind: "client" | "product" | "payment" | "document" | "contract" | "organization" | "employee" | "operation"; title: string; subtitle?: string; href?: string };

export const GLOBAL_SEARCH_INDEX: SearchItem[] = [
  ...generateClients(8).map<SearchItem>((c) => ({ id: c.id, kind: "client", title: c.name, subtitle: c.phone, href: "/ip/customers" })),
  ...generateProducts().slice(0, 8).map<SearchItem>((p) => ({ id: p.id, kind: "product", title: p.name, subtitle: p.sku, href: "/ip/catalog" })),
  ...generateInvoices(8).map<SearchItem>((i) => ({ id: i.id, kind: "payment", title: i.number, subtitle: i.clientName, href: "/self-employed/invoices" })),
  ...generateOrganizations().map<SearchItem>((o) => ({ id: o.id, kind: "organization", title: o.name, subtitle: `ИНН ${o.inn}`, href: "/ooo/organizations" })),
  ...generateEmployees().slice(0, 6).map<SearchItem>((e) => ({ id: e.id, kind: "employee", title: e.fullName, subtitle: e.role, href: "/ip/team" })),
];

export function fmtRub(v: number, opts: { sign?: boolean } = {}) {
  const abs = Math.abs(v);
  const s = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: abs >= 1000 ? 0 : 2 }).format(abs);
  return opts.sign ? (v >= 0 ? "+ " : "− ") + s : v < 0 ? "− " + s : s;
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
}

export function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// 12-month series
export function monthlySeries(seed = 47, base = 250000) {
  const r = mulberry32(seed);
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  return months.map((m, i) => ({
    month: m,
    income: Math.floor(base + r() * base * 1.5 + i * base * 0.05),
    expense: Math.floor(base * 0.4 + r() * base * 0.7),
  }));
}
