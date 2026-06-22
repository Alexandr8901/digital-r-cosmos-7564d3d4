export type AppRole =
  | "citizen"
  | "self_employed"
  | "sole_proprietor"
  | "llc"
  | "developer"
  | "admin";

export const ROLE_LABEL: Record<AppRole, string> = {
  citizen: "Гражданин",
  self_employed: "Самозанятый",
  sole_proprietor: "ИП",
  llc: "ООО",
  developer: "Разработчик",
  admin: "Администратор",
};

export const ROLE_DESCRIPTION: Record<AppRole, string> = {
  citizen: "Личные финансы, платежи, документы и AI-помощник.",
  self_employed: "Доходы, клиенты, услуги, счета и автоматизация налогов.",
  sole_proprietor: "Полноценный ERP-кабинет: продажи, склад, CRM и финансы.",
  llc: "Холдинг: организации, казначейство, бюджеты и BI-аналитика.",
  developer: "REST/GraphQL API, SDK, Sandbox, Webhooks и OAuth.",
  admin: "Управление платформой и пользователями.",
};

export const PUBLIC_ROLES: AppRole[] = [
  "citizen",
  "self_employed",
  "sole_proprietor",
  "llc",
  "developer",
];
