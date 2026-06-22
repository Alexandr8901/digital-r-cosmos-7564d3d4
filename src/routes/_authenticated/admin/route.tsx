import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck, Home, Users, Building2, KeyRound, Lock, UsersRound, LifeBuoy, Ticket,
  Shield, ScrollText, Activity, AlertTriangle, Plug, Code2, Bell, Settings, Database,
  FileBarChart2, Sparkles, FileCheck2
} from "lucide-react";
import { PlatformShell, type PlatformNavGroup } from "@/components/platform/shell";

export const Route = createFileRoute("/_authenticated/admin")({
  component: Layout,
});

const GROUPS: PlatformNavGroup[] = [
  { label: "Главное", items: [
    { to: "/admin", label: "Главная", icon: Home, exact: true },
  ] },
  { label: "Пользователи и доступ", items: [
    { to: "/admin/users", label: "Пользователи", icon: Users },
    { to: "/admin/organizations", label: "Организации", icon: Building2 },
    { to: "/admin/roles", label: "Роли", icon: KeyRound },
    { to: "/admin/permissions", label: "Права доступа", icon: Lock },
    { to: "/admin/teams", label: "Команды", icon: UsersRound },
  ] },
  { label: "Поддержка", items: [
    { to: "/admin/support", label: "Поддержка", icon: LifeBuoy },
    { to: "/admin/tickets", label: "Тикеты", icon: Ticket },
  ] },
  { label: "Безопасность", items: [
    { to: "/admin/security", label: "Центр безопасности", icon: Shield },
    { to: "/admin/audit", label: "Журнал аудита", icon: ScrollText },
    { to: "/admin/compliance", label: "Соответствие", icon: FileCheck2 },
  ] },
  { label: "Эксплуатация", items: [
    { to: "/admin/monitoring", label: "Мониторинг", icon: Activity },
    { to: "/admin/incidents", label: "Инциденты", icon: AlertTriangle },
    { to: "/admin/backups", label: "Резервные копии", icon: Database },
  ] },
  { label: "Интеграции и API", items: [
    { to: "/admin/integrations", label: "Интеграции", icon: Plug },
    { to: "/admin/api", label: "API", icon: Code2 },
    { to: "/admin/notifications", label: "Уведомления", icon: Bell },
  ] },
  { label: "Система", items: [
    { to: "/admin/settings", label: "Настройки системы", icon: Settings },
    { to: "/admin/reports", label: "Отчёты", icon: FileBarChart2 },
    { to: "/admin/ai", label: "AI для администраторов", icon: Sparkles },
  ] },
];

function Layout() {
  return <PlatformShell area="Администрирование" areaIcon={ShieldCheck} groups={GROUPS} searchPlaceholder="Поиск пользователей, организаций, событий…" />;
}
