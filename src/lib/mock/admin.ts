import { pick, rnum, daysAgo, fmtDateTime } from "./platform";

let s = 100;
const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
const seed = (n: number) => { s = n; };

const FIRST = ["Алексей", "Мария", "Иван", "Ольга", "Дмитрий", "Анна", "Сергей", "Екатерина", "Павел", "Наталья", "Артём", "Кира", "Полина", "Глеб"];
const LAST = ["Иванов", "Петров", "Смирнов", "Соколова", "Кузнецов", "Попова", "Лебедев", "Новикова", "Морозов", "Волкова"];
const ORGS_ = ["ООО «Цифра-Технологии»", "ИП Иванов А.А.", "ООО «Северный путь»", "АО «Финтех Партнер»", "ООО «Бюро Решений»", "ИП Соколова О.В.", "ООО «Логистика+»", "ООО «Контур-Сервис»"];
const ROLES = ["owner", "administrator", "manager", "accountant", "operator", "developer", "auditor", "support", "viewer"] as const;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: typeof ROLES[number];
  status: "active" | "blocked" | "invited" | "pending";
  org: string;
  lastSeen: Date;
  created: Date;
  mfa: boolean;
};

export const users = (n = 40): AdminUser[] => {
  seed(11);
  return Array.from({ length: n }, (_, i) => {
    const f = pick(FIRST as any), l = pick(LAST as any);
    return {
      id: `u_${i}`,
      name: `${f} ${l}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@example.ru`.replace(/[ё]/g, "e"),
      phone: `+7 (9${rnum(10,99)}) ${rnum(100,999)}-${rnum(10,99)}-${rnum(10,99)}`,
      role: pick(ROLES as any) as any,
      status: pick(["active","active","active","active","blocked","invited","pending"] as any) as any,
      org: pick(ORGS_ as any),
      lastSeen: daysAgo(rnum(0, 30)),
      created: daysAgo(rnum(30, 720)),
      mfa: r() > 0.4,
    };
  });
};

export type AdminOrg = { id: string; name: string; inn: string; type: "ООО" | "ИП" | "Самозанятый"; members: number; status: "active" | "suspended"; created: Date; plan: string };
export const orgs = (n = 18): AdminOrg[] => {
  seed(12);
  return Array.from({ length: n }, (_, i) => ({
    id: `o_${i}`,
    name: pick(ORGS_ as any),
    inn: `${rnum(1000000000, 9999999999)}`,
    type: pick(["ООО","ИП","Самозанятый"] as any) as any,
    members: rnum(1, 220),
    status: pick(["active","active","active","suspended"] as any) as any,
    created: daysAgo(rnum(30, 1500)),
    plan: pick(["Free","Business","Enterprise"] as any),
  }));
};

export const ROLE_DEFS = [
  { key: "owner", label: "Owner", desc: "Полный контроль над аккаунтом, биллингом и удалением", users: 12 },
  { key: "administrator", label: "Administrator", desc: "Управление пользователями, ролями и настройками", users: 28 },
  { key: "manager", label: "Manager", desc: "Управление командами, проектами и операциями", users: 64 },
  { key: "accountant", label: "Accountant", desc: "Доступ к финансам, документам и отчётам", users: 41 },
  { key: "operator", label: "Operator", desc: "Ежедневные операции, обработка заявок", users: 87 },
  { key: "developer", label: "Developer", desc: "API-ключи, вебхуки, sandbox", users: 23 },
  { key: "auditor", label: "Auditor", desc: "Только чтение журналов и отчётов", users: 9 },
  { key: "support", label: "Support", desc: "Помощь пользователям, доступ к тикетам", users: 18 },
  { key: "viewer", label: "Viewer", desc: "Только просмотр базовой информации", users: 152 },
];

export const PERMISSIONS = [
  "Просмотр", "Создание", "Редактирование", "Удаление", "Экспорт", "Импорт",
  "Управление API", "Управление пользователями", "Управление финансами", "Управление документами", "Настройка интеграций"
];

export const PERMISSION_MODULES = [
  "Пользователи", "Организации", "Платежи", "Документы", "CRM", "Склад", "API", "Интеграции", "Marketplace", "Отчёты", "Настройки", "Аудит"
];

export const tickets = (n = 24) => {
  seed(13);
  return Array.from({ length: n }, (_, i) => ({
    id: `T-${1000 + i}`,
    subject: pick([
      "Не приходит подтверждение оплаты",
      "Ошибка при выгрузке счёта",
      "Не отображается баланс",
      "Не удаётся подключить SBP",
      "Webhook возвращает 500",
      "Вопрос по тарифу Business",
      "Не приходит SMS-код",
      "Как изменить ИНН организации?",
      "Ошибка при подписи документа",
      "Запрос на доступ Auditor"
    ] as any),
    category: pick(["Платежи","Документы","Авторизация","Биллинг","API","Прочее"] as any),
    priority: pick(["low","normal","high","urgent"] as any) as "low"|"normal"|"high"|"urgent",
    status: pick(["new","open","pending","resolved","closed"] as any) as "new"|"open"|"pending"|"resolved"|"closed",
    assignee: pick(["Артём К.","Кира П.","Полина С.","Глеб М.","—"] as any),
    requester: `${pick(FIRST as any)} ${pick(LAST as any)}`,
    sla: `${rnum(1, 24)}ч`,
    updated: daysAgo(rnum(0, 14)),
  }));
};

export const auditLog = (n = 50) => {
  seed(14);
  const actions = [
    ["user.created", "Создан пользователь"],
    ["user.role.assigned", "Назначена роль"],
    ["user.blocked", "Пользователь заблокирован"],
    ["org.updated", "Изменены данные организации"],
    ["apikey.created", "Создан API-ключ"],
    ["webhook.updated", "Изменён webhook"],
    ["settings.changed", "Изменены настройки безопасности"],
    ["report.exported", "Экспортирован отчёт"],
    ["backup.created", "Создана резервная копия"],
    ["integration.connected", "Подключена интеграция"],
  ];
  return Array.from({ length: n }, (_, i) => {
    const [code, label] = pick(actions as any) as [string, string];
    return {
      id: `a_${i}`,
      who: `${pick(FIRST as any)} ${pick(LAST as any)}`,
      action: code,
      label,
      target: pick(["пользователь #u_3","организация ООО «…»","API-ключ Production","webhook #wh_1","роль Manager"] as any),
      ip: `${rnum(10,200)}.${rnum(0,255)}.${rnum(0,255)}.${rnum(1,254)}`,
      device: pick(["Chrome / macOS","Safari / iOS","Firefox / Windows","Edge / Windows","API client"] as any),
      result: pick(["success","success","success","failed"] as any) as "success"|"failed",
      when: daysAgo(rnum(0, 30)),
    };
  });
};

export const services = [
  { name: "API Gateway", status: "operational", uptime: 99.99, latency: 42 },
  { name: "Платёжный шлюз", status: "operational", uptime: 99.98, latency: 78 },
  { name: "Документы", status: "operational", uptime: 99.95, latency: 124 },
  { name: "Поиск (Elastic)", status: "degraded", uptime: 99.41, latency: 320 },
  { name: "Очереди (Kafka)", status: "operational", uptime: 99.99, latency: 9 },
  { name: "Кэш (Redis)", status: "operational", uptime: 99.99, latency: 2 },
  { name: "База данных", status: "operational", uptime: 99.97, latency: 14 },
  { name: "Файловое хранилище", status: "operational", uptime: 99.98, latency: 58 },
  { name: "AI Layer", status: "operational", uptime: 99.92, latency: 410 },
  { name: "Webhooks", status: "operational", uptime: 99.88, latency: 96 },
] as const;

export const incidents = (n = 8) => {
  seed(15);
  const t = ["Деградация поиска","Сбой webhook-доставок","Повышенная задержка API","Ошибки в платёжном шлюзе","Сбой авторизации","Замедление AI-ответов"];
  return Array.from({ length: n }, (_, i) => ({
    id: `INC-${2024100 + i}`,
    title: pick(t as any),
    severity: pick(["sev1","sev2","sev3","sev3"] as any) as "sev1"|"sev2"|"sev3",
    status: pick(["investigating","identified","monitoring","resolved","resolved"] as any) as any,
    owner: pick(["Артём К.","Кира П.","Полина С."] as any),
    started: daysAgo(rnum(0, 30)),
    duration: `${rnum(5, 240)} мин`,
  }));
};

export const backups = () => {
  seed(16);
  return Array.from({ length: 8 }, (_, i) => ({
    id: `b_${i}`,
    name: `daily-${new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)}`,
    size: `${rnum(8, 24)} ГБ`,
    type: pick(["full","incremental","incremental"] as any) as "full"|"incremental",
    status: pick(["ok","ok","ok","verifying"] as any) as "ok"|"verifying"|"failed",
    when: daysAgo(i),
    location: "object-storage / encrypted",
  }));
};

export const reports = [
  { id: "r1", name: "Пользователи и активность", category: "Пользователи", schedule: "Еженедельно" },
  { id: "r2", name: "Организации и команды", category: "Организации", schedule: "Ежемесячно" },
  { id: "r3", name: "Платежи и обороты", category: "Платежи", schedule: "Ежедневно" },
  { id: "r4", name: "Документооборот", category: "Документы", schedule: "Еженедельно" },
  { id: "r5", name: "Использование API", category: "API", schedule: "Ежедневно" },
  { id: "r6", name: "События безопасности", category: "Безопасность", schedule: "Ежедневно" },
  { id: "r7", name: "Marketplace и установки", category: "Marketplace", schedule: "Еженедельно" },
  { id: "r8", name: "AI-запросы и качество", category: "AI", schedule: "Еженедельно" },
  { id: "r9", name: "Нагрузка и ресурсы", category: "Система", schedule: "Ежедневно" },
];

export { fmtDateTime };
