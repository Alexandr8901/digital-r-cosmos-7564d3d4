import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Bell, Briefcase, Calculator, Calendar, Contact2, FileText, FolderKanban, Home, ListChecks, Package, PieChart, Plug, ShoppingBag, ShoppingCart, Sparkles, Store, TrendingUp, Truck, Users, Wallet, Warehouse, Workflow } from "lucide-react";
import { PlatformShell, type PlatformNavGroup } from "@/components/platform/shell";

export const Route = createFileRoute("/_authenticated/business")({
  component: Layout,
});

const GROUPS: PlatformNavGroup[] = [
  { label: "Главное", items: [
      { to: "/business", label: "Главная", icon: Home, exact: true },
      { to: "/business/crm", label: "CRM", icon: Users },
      { to: "/business/sales", label: "Продажи", icon: TrendingUp },
      { to: "/business/orders", label: "Заказы", icon: ShoppingCart },
      { to: "/business/customers", label: "Клиенты", icon: Contact2 }
    ] },
  { label: "Каталог и склад", items: [
      { to: "/business/catalog", label: "Товары", icon: Package },
      { to: "/business/services", label: "Услуги", icon: Briefcase },
      { to: "/business/warehouse", label: "Склад", icon: Warehouse },
      { to: "/business/purchases", label: "Закупки", icon: ShoppingBag },
      { to: "/business/suppliers", label: "Поставщики", icon: Truck }
    ] },
  { label: "Команда", items: [
      { to: "/business/team", label: "Команда", icon: Users },
      { to: "/business/projects", label: "Проекты", icon: FolderKanban },
      { to: "/business/tasks", label: "Задачи", icon: ListChecks },
      { to: "/business/calendar", label: "Календарь", icon: Calendar }
    ] },
  { label: "Финансы и отчёты", items: [
      { to: "/business/finance", label: "Финансы", icon: Wallet },
      { to: "/business/accounting", label: "Бухгалтерия", icon: Calculator },
      { to: "/business/documents", label: "Документы", icon: FileText },
      { to: "/business/reports", label: "Отчёты", icon: BarChart3 },
      { to: "/business/analytics", label: "Аналитика", icon: PieChart }
    ] },
  { label: "AI и расширения", items: [
      { to: "/business/ai", label: "AI Центр", icon: Sparkles },
      { to: "/business/automation", label: "Автоматизация", icon: Workflow },
      { to: "/business/integrations", label: "Интеграции", icon: Plug },
      { to: "/business/marketplace", label: "Marketplace", icon: Store },
      { to: "/business/notifications", label: "Уведомления", icon: Bell }
    ] }
];

function Layout() {
  return <PlatformShell area="Бизнес" areaIcon={Briefcase} groups={GROUPS} searchPlaceholder="Поиск по разделу «Бизнес»…" />;
}
