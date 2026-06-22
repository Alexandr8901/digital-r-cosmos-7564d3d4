import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart } from "lucide-react";

const REPORTS = [
  { title: "P&L по холдингу", period: "Май 2026", format: "Excel" },
  { title: "Баланс по форме 1", period: "Q1 2026", format: "PDF" },
  { title: "Отчёт о движении ДС", period: "YTD", format: "Excel" },
  { title: "Налоговая нагрузка", period: "Май 2026", format: "PDF" },
  { title: "ФОТ по подразделениям", period: "Май 2026", format: "Excel" },
  { title: "Сравнение план/факт", period: "Q1 2026", format: "PDF" },
];

export const Route = createFileRoute("/_authenticated/ooo/reports")({
  head: () => ({ meta: [{ title: "Отчёты — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Отчёты" description="Готовые отчёты по холдингу и юридическим лицам.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => (
          <SectionCard key={r.title} title={r.title}>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent"><FileBarChart className="h-4 w-4" /></div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{r.period} · {r.format}</p>
                <Button variant="outline" size="sm" className="mt-3"><Download className="mr-1 h-3.5 w-3.5" />Скачать</Button>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModulePage>
  );
}
