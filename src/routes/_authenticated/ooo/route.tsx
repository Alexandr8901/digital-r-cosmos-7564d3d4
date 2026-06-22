import { createFileRoute } from "@tanstack/react-router";
import {
  Home, Building2, GitBranch, Users, Wallet, Landmark, PiggyBank, CreditCard, FileText,
  Contact2, Boxes, UserSquare2, BadgePercent, FileBarChart, BarChart3, Sparkles, Plug, Store, Settings, ShieldAlert, History, Calculator,
} from "lucide-react";
import { WorkspaceShell, type NavGroup, type NavItem } from "@/components/workspace/shell";

export const Route = createFileRoute("/_authenticated/ooo")({
  component: Layout,
});

const groups: NavGroup[] = [
  {
    label: "Холдинг",
    items: [
      { to: "/ooo", label: "Главная", icon: Home, exact: true },
      { to: "/ooo/organizations", label: "Организации", icon: Building2 },
      { to: "/ooo/branches", label: "Филиалы", icon: GitBranch },
      { to: "/ooo/departments", label: "Подразделения", icon: Users },
    ],
  },
  {
    label: "Финансы",
    items: [
      { to: "/ooo/finance", label: "Финансы", icon: Wallet },
      { to: "/ooo/treasury", label: "Казначейство", icon: Landmark, badge: "5" },
      { to: "/ooo/budgets", label: "Бюджеты", icon: PiggyBank },
      { to: "/ooo/payments", label: "Платежи", icon: CreditCard },
      { to: "/ooo/cost-centers", label: "Центры затрат", icon: Calculator },
      { to: "/ooo/documents", label: "Документы", icon: FileText },
    ],
  },
  {
    label: "Операции",
    items: [
      { to: "/ooo/crm", label: "CRM", icon: Contact2 },
      { to: "/ooo/erp", label: "ERP", icon: Boxes },
      { to: "/ooo/personnel", label: "Персонал", icon: UserSquare2 },
      { to: "/ooo/payroll", label: "Зарплата", icon: BadgePercent },
    ],
  },
  {
    label: "Аналитика и расширения",
    items: [
      { to: "/ooo/reports", label: "Отчёты", icon: FileBarChart },
      { to: "/ooo/analytics", label: "BI-Аналитика", icon: BarChart3 },
      { to: "/ooo/ai", label: "AI", icon: Sparkles },
      { to: "/ooo/integrations", label: "Интеграции", icon: Plug },
      { to: "/ooo/marketplace", label: "Marketplace", icon: Store },
    ],
  },
];

const secondary: NavItem[] = [
  { to: "/ooo/admin", label: "Администрирование", icon: ShieldAlert },
  { to: "/ooo/audit", label: "Аудит", icon: History },
  { to: "/ooo/settings", label: "Настройки", icon: Settings },
];

function Layout() {
  return <WorkspaceShell workspaceKind="ooo" groups={groups} secondary={secondary} />;
}
