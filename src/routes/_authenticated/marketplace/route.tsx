import { createFileRoute } from "@tanstack/react-router";
import { AppWindow, BadgeDollarSign, Briefcase, Cog, FileCode, Handshake, Home, LayoutGrid, Lock, MessageSquare, Plug, Puzzle, RefreshCw, Settings, ShieldAlert, ShieldCheck, Sparkles, Store, Tags, Upload, Users, Workflow } from "lucide-react";
import { PlatformShell, type PlatformNavGroup } from "@/components/platform/shell";

export const Route = createFileRoute("/_authenticated/marketplace")({
  component: Layout,
});

const GROUPS: PlatformNavGroup[] = [
  { label: "Главное", items: [
      { to: "/marketplace", label: "Главная", icon: Home, exact: true },
      { to: "/marketplace/catalog", label: "Каталог", icon: LayoutGrid },
      { to: "/marketplace/categories", label: "Категории", icon: Tags },
      { to: "/marketplace/official", label: "Официальные", icon: ShieldCheck }
    ] },
  { label: "Расширения", items: [
      { to: "/marketplace/integrations", label: "Интеграции", icon: Plug },
      { to: "/marketplace/integrations/builder", label: "Конструктор", icon: Workflow },
      { to: "/marketplace/apps", label: "Приложения", icon: AppWindow },
      { to: "/marketplace/plugins", label: "Плагины", icon: Puzzle },
      { to: "/marketplace/automation", label: "Автоматизация", icon: Cog },
      { to: "/marketplace/templates", label: "Шаблоны", icon: FileCode },
      { to: "/marketplace/ai", label: "AI", icon: Sparkles }
    ] },
  { label: "Разработчики", items: [
      { to: "/marketplace/developers", label: "Разработчики", icon: Users },
      { to: "/marketplace/partners", label: "Партнёры", icon: Handshake },
      { to: "/marketplace/my-apps", label: "Мои приложения", icon: Briefcase },
      { to: "/marketplace/publish", label: "Публикация", icon: Upload },
      { to: "/marketplace/moderation", label: "Модерация", icon: ShieldAlert }
    ] },
  { label: "Управление", items: [
      { to: "/marketplace/updates", label: "Обновления", icon: RefreshCw },
      { to: "/marketplace/reviews", label: "Отзывы", icon: MessageSquare },
      { to: "/marketplace/subscriptions", label: "Подписки", icon: BadgeDollarSign },
      { to: "/marketplace/security", label: "Безопасность", icon: Lock },
      { to: "/marketplace/settings", label: "Настройки", icon: Settings }
    ] }
];

function Layout() {
  return <PlatformShell area="Marketplace" areaIcon={Store} groups={GROUPS} searchPlaceholder="Поиск по разделу «Marketplace»…" />;
}
