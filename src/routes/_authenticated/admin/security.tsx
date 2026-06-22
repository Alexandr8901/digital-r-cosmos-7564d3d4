import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, SectionCard, Tag } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Smartphone, Key, Fingerprint, AlertTriangle, Globe, Lock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/security")({
  head: () => ({ meta: [{ title: "Центр безопасности · Администрирование" }] }),
  component: Page,
});

function Page() {
  const items = [
    { icon: Fingerprint, title: "Passkeys", desc: "Беспарольный вход через WebAuthn", on: true },
    { icon: Smartphone, title: "2FA / MFA", desc: "Обязательная двухфакторная аутентификация", on: true },
    { icon: Key, title: "API-ключи", desc: "Управление и ротация ключей", on: true },
    { icon: Globe, title: "Разрешённые регионы", desc: "Гео-ограничения входа", on: false },
    { icon: Lock, title: "OAuth-приложения", desc: "Подключённые сторонние приложения", on: true },
    { icon: AlertTriangle, title: "Подозрительная активность", desc: "AI-детектор аномалий", on: true },
  ];
  return (
    <PlatformPage
      title="Центр безопасности"
      description="Устройства, сессии, MFA, аномалии и журналы безопасности"
      integration={<IntegrationStatus />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(it => (
          <Card key={it.title} className="p-4">
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <it.icon className="h-4 w-4" />
              </div>
              <Tag variant={it.on ? "success" : "warning"}>{it.on ? "Включено" : "Выключено"}</Tag>
            </div>
            <div className="mt-3 font-display text-sm font-semibold">{it.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{it.desc}</div>
          </Card>
        ))}
      </div>

      <SectionCard title="Активные сессии">
        <div className="space-y-2 text-sm">
          {[
            { device: "MacBook Pro · Chrome", where: "Москва, RU", ip: "85.142.117.4", last: "сейчас" },
            { device: "iPhone 15 · Safari", where: "Москва, RU", ip: "176.59.x.x", last: "10 мин назад" },
            { device: "Windows · Edge", where: "Санкт-Петербург, RU", ip: "188.130.x.x", last: "2 ч назад" },
          ].map(s => (
            <div key={s.ip} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="font-medium">{s.device}</div>
                <div className="text-xs text-muted-foreground">{s.where} · {s.ip} · {s.last}</div>
              </div>
              <ShieldCheck className="h-4 w-4 text-success" />
            </div>
          ))}
        </div>
      </SectionCard>
    </PlatformPage>
  );
}
