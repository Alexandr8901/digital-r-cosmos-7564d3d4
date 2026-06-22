import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, SectionCard, Tag, Sparkline } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/monitoring")({
  head: () => ({ meta: [{ title: "Мониторинг · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Мониторинг"
      description="Состояние сервисов, ресурсы, очереди и интеграции"
      integration={<IntegrationStatus />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {admin.services.map(s => (
          <Card key={s.name} className="p-4">
            <div className="flex items-start justify-between">
              <div className="font-display text-sm font-semibold">{s.name}</div>
              <Tag variant={s.status === "operational" ? "success" : "warning"}>{s.status}</Tag>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Uptime {s.uptime}% · latency {s.latency} мс</div>
            <Sparkline data={Array.from({ length: 12 }, (_, i) => 50 + Math.round(Math.sin(i + s.latency) * 15) + s.latency / 10)} />
          </Card>
        ))}
      </div>

      <SectionCard title="Ресурсы">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "CPU", v: "42%" },
            { l: "Память", v: "61%" },
            { l: "Диск", v: "38%" },
            { l: "Сеть", v: "1.2 Гбит/с" },
            { l: "Очередь Email", v: "12" },
            { l: "Очередь Webhooks", v: "4" },
            { l: "Очередь AI", v: "2" },
            { l: "DLQ", v: "0" },
          ].map(x => (
            <div key={x.l} className="rounded-lg border border-border p-3">
              <div className="text-xs text-muted-foreground">{x.l}</div>
              <div className="font-display text-xl font-semibold">{x.v}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PlatformPage>
  );
}
