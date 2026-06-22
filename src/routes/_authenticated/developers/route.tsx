import { createFileRoute } from "@tanstack/react-router";
import { Activity, Beaker, BookOpen, Code2, FileCode, Gauge, GitBranch, Key, LayoutDashboard, LifeBuoy, LineChart, Lock, Network, Package, Play, Plug, ScrollText, Send, Server, ShieldCheck, Store, Terminal, Webhook } from "lucide-react";
import { PlatformShell, type PlatformNavGroup } from "@/components/platform/shell";

export const Route = createFileRoute("/_authenticated/developers")({
  component: Layout,
});

const GROUPS: PlatformNavGroup[] = [
  { label: "Главное", items: [
      { to: "/developers", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { to: "/developers/api", label: "API Center", icon: Code2 },
      { to: "/developers/api/rest", label: "REST API", icon: Server },
      { to: "/developers/api/graphql", label: "GraphQL", icon: Network },
      { to: "/developers/api/explorer", label: "API Explorer", icon: Play }
    ] },
  { label: "Инструменты", items: [
      { to: "/developers/sdk", label: "SDK", icon: Package },
      { to: "/developers/api-keys", label: "API Keys", icon: Key },
      { to: "/developers/oauth", label: "OAuth", icon: ShieldCheck },
      { to: "/developers/webhooks", label: "Webhooks", icon: Webhook },
      { to: "/developers/events", label: "События", icon: Activity },
      { to: "/developers/cli", label: "CLI", icon: Terminal }
    ] },
  { label: "Sandbox и документация", items: [
      { to: "/developers/sandbox", label: "Sandbox", icon: Beaker },
      { to: "/developers/docs", label: "Документация", icon: BookOpen },
      { to: "/developers/api/openapi", label: "OpenAPI", icon: FileCode },
      { to: "/developers/api/postman", label: "Postman", icon: Send }
    ] },
  { label: "Эксплуатация", items: [
      { to: "/developers/status", label: "Статус", icon: Activity },
      { to: "/developers/logs", label: "Логи", icon: ScrollText },
      { to: "/developers/rate-limits", label: "Rate Limits", icon: Gauge },
      { to: "/developers/monitoring", label: "Мониторинг", icon: LineChart },
      { to: "/developers/versioning", label: "Версии", icon: GitBranch },
      { to: "/developers/security", label: "Безопасность", icon: Lock }
    ] },
  { label: "Экосистема", items: [
      { to: "/developers/marketplace", label: "Marketplace", icon: Store },
      { to: "/developers/integrations", label: "Интеграции", icon: Plug },
      { to: "/developers/support", label: "Поддержка", icon: LifeBuoy }
    ] }
];

function Layout() {
  return <PlatformShell area="Developers" areaIcon={Code2} groups={GROUPS} searchPlaceholder="Поиск по разделу «Developers»…" />;
}
