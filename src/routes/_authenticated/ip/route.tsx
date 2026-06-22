import { createFileRoute } from "@tanstack/react-router";
import {
  Home, TrendingUp, ShoppingCart, Users, Truck, Package, Warehouse, FileText,
  Contact2, Wallet, CreditCard, Banknote, Landmark, QrCode, Smartphone,
  UserSquare2, BadgePercent, Building2, BarChart3, Plug, Sparkles, Store, Settings,
} from "lucide-react";
import { WorkspaceShell, type NavGroup, type NavItem } from "@/components/workspace/shell";

export const Route = createFileRoute("/_authenticated/ip")({
  component: Layout,
});

const groups: NavGroup[] = [
  {
    label: "Бизнес",
    items: [
      { to: "/ip", label: "Главная", icon: Home, exact: true },
      { to: "/ip/sales", label: "Продажи", icon: TrendingUp },
      { to: "/ip/orders", label: "Заказы", icon: ShoppingCart, badge: "12" },
      { to: "/ip/customers", label: "Покупатели", icon: Users },
      { to: "/ip/suppliers", label: "Поставщики", icon: Truck },
      { to: "/ip/catalog", label: "Каталог", icon: Package },
      { to: "/ip/warehouse", label: "Склад", icon: Warehouse },
      { to: "/ip/documents", label: "Документы", icon: FileText },
      { to: "/ip/crm", label: "CRM", icon: Contact2 },
    ],
  },
  {
    label: "Финансы",
    items: [
      { to: "/ip/finance", label: "Финансы", icon: Wallet },
      { to: "/ip/payments", label: "Платежи", icon: CreditCard },
      { to: "/ip/digital-ruble", label: "Цифровой рубль", icon: Banknote },
      { to: "/ip/bank-accounts", label: "Банковские счета", icon: Landmark },
      { to: "/ip/sbp", label: "СБП", icon: Smartphone },
      { to: "/ip/qr", label: "QR", icon: QrCode },
    ],
  },
  {
    label: "Команда и налоги",
    items: [
      { to: "/ip/team", label: "Команда", icon: UserSquare2 },
      { to: "/ip/payroll", label: "Зарплата", icon: BadgePercent },
      { to: "/ip/taxes", label: "Налоги", icon: Building2 },
    ],
  },
  {
    label: "Аналитика и расширения",
    items: [
      { to: "/ip/analytics", label: "Аналитика", icon: BarChart3 },
      { to: "/ip/integrations", label: "Интеграции", icon: Plug },
      { to: "/ip/ai", label: "AI", icon: Sparkles },
      { to: "/ip/marketplace", label: "Marketplace", icon: Store },
    ],
  },
];

const secondary: NavItem[] = [
  { to: "/ip/settings", label: "Настройки", icon: Settings },
];

function Layout() {
  return <WorkspaceShell workspaceKind="ip" groups={groups} secondary={secondary} />;
}
