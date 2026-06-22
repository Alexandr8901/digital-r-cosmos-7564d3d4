import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, StatCard, SectionCard, ListRow, Tag, Pill, MiniBar, Sparkline, QuickAction } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Users, Building2, KeyRound, Plug, FileText, CreditCard, AlertTriangle, ShieldCheck, Ticket, Activity, Sparkles, ScrollText } from "lucide-react";
import * as admin from "@/lib/mock/admin";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Администрирование · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  const log = admin.auditLog(8);
  const inc = admin.incidents(4);
  return (
    <PlatformPage
      title="Панель администратора"
      description="Состояние платформы, пользователей и инфраструктуры"
      integration={<IntegrationStatus />}
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Отчёт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Пригласить</Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Пользователи" value="48 217" icon={<Users className="h-4 w-4" />} trend={{ value: "+312 за неделю", positive: true }} />
        <StatCard label="Активные за 24ч" value="12 408" icon={<Activity className="h-4 w-4" />} trend={{ value: "+4,2%", positive: true }} />
        <StatCard label="Организации" value="3 942" icon={<Building2 className="h-4 w-4" />} trend={{ value: "+18", positive: true }} />
        <StatCard label="Подключённые интеграции" value="187" icon={<Plug className="h-4 w-4" />} />
        <StatCard label="API запросов / мин" value="14 720" icon={<KeyRound className="h-4 w-4" />} hint="p95: 142мс" />
        <StatCard label="Документов за месяц" value="92 318" icon={<FileText className="h-4 w-4" />} trend={{ value: "+11,3%", positive: true }} />
        <StatCard label="Платежей за месяц" value={mock.fmtRub(184_220_000)} icon={<CreditCard className="h-4 w-4" />} />
        <StatCard label="Активные тикеты" value="47" icon={<Ticket className="h-4 w-4" />} hint="SLA 96%" />
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-display text-base font-semibold">Быстрые действия</div>
            <div className="text-xs text-muted-foreground">Самые частые операции администратора</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          <QuickAction icon={Users} label="Пользователи" to="/admin/users" />
          <QuickAction icon={Building2} label="Организации" to="/admin/organizations" />
          <QuickAction icon={KeyRound} label="Роли" to="/admin/roles" />
          <QuickAction icon={ScrollText} label="Аудит" to="/admin/audit" />
          <QuickAction icon={Activity} label="Мониторинг" to="/admin/monitoring" />
          <QuickAction icon={Sparkles} label="AI" to="/admin/ai" />
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Состояние сервисов" className="lg:col-span-2">
          <div className="space-y-2">
            {admin.services.map(s => (
              <div key={s.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${s.status === "operational" ? "bg-success" : s.status === "degraded" ? "bg-warning" : "bg-destructive"}`} />
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">Uptime {s.uptime}% · latency {s.latency} мс</div>
                  </div>
                </div>
                <Tag variant={s.status === "operational" ? "success" : "warning"}>{s.status === "operational" ? "OK" : s.status === "degraded" ? "Деградация" : "Сбой"}</Tag>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="AI-анализ">
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-primary"><Sparkles className="h-3 w-3" />Состояние</div>
              Платформа стабильна. Один сервис в деградации (поиск) — расследование ведётся.
            </div>
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-warning"><AlertTriangle className="h-3 w-3" />Безопасность</div>
              За сутки 14 неудачных входов из новых регионов — рекомендуется проверить.
            </div>
            <div className="rounded-lg border border-success/20 bg-success/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-success"><ShieldCheck className="h-3 w-3" />Производительность</div>
              Нагрузка в пределах нормы. Очереди обрабатываются за SLA.
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Последние события" action={<Button variant="ghost" size="sm" asChild><a href="/admin/audit">Все события</a></Button>}>
          <div className="divide-y divide-border">
            {log.map(e => (
              <ListRow
                key={e.id}
                title={e.label}
                subtitle={`${e.who} · ${admin.fmtDateTime(e.when)} · ${e.ip}`}
                right={<Tag variant={e.result === "success" ? "success" : "warning"}>{e.result === "success" ? "OK" : "Ошибка"}</Tag>}
                icon={<ScrollText className="h-4 w-4" />}
              />
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Открытые инциденты" action={<Button variant="ghost" size="sm" asChild><a href="/admin/incidents">Все инциденты</a></Button>}>
          <div className="divide-y divide-border">
            {inc.map(i => (
              <ListRow
                key={i.id}
                title={i.title}
                subtitle={`${i.id} · ${i.owner} · ${admin.fmtDateTime(i.started)}`}
                right={<div className="flex items-center gap-2"><Pill>{i.severity.toUpperCase()}</Pill><Tag variant={i.status === "resolved" ? "success" : "warning"}>{i.status}</Tag></div>}
                icon={<AlertTriangle className="h-4 w-4" />}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Использование ресурсов">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-1 text-xs text-muted-foreground">CPU</div>
            <div className="font-display text-2xl font-semibold">42%</div>
            <Sparkline data={[30,32,28,40,38,45,42,44,41,42]} />
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-foreground">Память</div>
            <div className="font-display text-2xl font-semibold">61%</div>
            <Sparkline data={[55,58,60,57,62,64,61,60,63,61]} />
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-foreground">Диск</div>
            <div className="font-display text-2xl font-semibold">38%</div>
            <MiniBar data={[20,30,35,32,38,40,38]} />
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-foreground">RPS API</div>
            <div className="font-display text-2xl font-semibold">14.7k</div>
            <Sparkline data={[12,14,13,15,16,14,14,15,14,14]} />
          </div>
        </div>
      </SectionCard>
    </PlatformPage>
  );
}
