import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money, IntegrationStatus, StatusBadge } from "@/components/workspace/kit";
import { Calendar, BellRing, FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/taxes")({
  head: () => ({ meta: [{ title: "Налоги — ИП" }] }),
  component: Page,
});

const CALENDAR = [
  { date: "25 июня", title: "НДФЛ за май", amount: 12500, status: "awaiting" },
  { date: "28 июня", title: "Страховые взносы", amount: 14200, status: "awaiting" },
  { date: "30 июня", title: "УСН авансовый платёж", amount: 38600, status: "awaiting" },
  { date: "15 июля", title: "Отчёт 6-НДФЛ", amount: 0, status: "draft" },
  { date: "25 июля", title: "НДФЛ за июнь", amount: 12500, status: "draft" },
];

function Page() {
  return (
    <ModulePage title="Налоги" description="Календарь, напоминания, платежи и отчёты." integration={<IntegrationStatus label="Отчётность в ФНС через официальное API после соглашения" />}>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="К уплате" value={<Money value={65300} />} icon={<Calendar className="h-4 w-4" />} hint="ближайшие 7 дней" />
        <StatCard label="Напоминаний" value={3} icon={<BellRing className="h-4 w-4" />} />
        <StatCard label="Отчётов готовится" value={2} icon={<FileText className="h-4 w-4" />} />
      </div>
      <SectionCard title="Налоговый календарь">
        <ul className="divide-y divide-border">
          {CALENDAR.map((t, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-muted-foreground"><Calendar className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {t.amount > 0 && <Money value={t.amount} className="font-medium" />}
                <StatusBadge status={t.status} />
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </ModulePage>
  );
}
