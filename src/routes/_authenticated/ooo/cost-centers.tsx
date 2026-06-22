import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, Money } from "@/components/workspace/kit";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CENTERS = [
  { id: "1", name: "ИТ-инфраструктура", category: "CAPEX", limit: 28000000, spent: 19600000 },
  { id: "2", name: "Реклама и PR", category: "Маркетинг", limit: 12000000, spent: 10800000 },
  { id: "3", name: "Командировки", category: "Операции", limit: 6000000, spent: 3200000 },
  { id: "4", name: "Обучение сотрудников", category: "HR", limit: 4500000, spent: 2100000 },
  { id: "5", name: "Юридические услуги", category: "Поддержка", limit: 3200000, spent: 2800000 },
];

export const Route = createFileRoute("/_authenticated/ooo/cost-centers")({
  head: () => ({ meta: [{ title: "Центры затрат — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Центры затрат" description="Создание, лимиты, отчёты и AI-анализ." action={<Button><Plus className="mr-1 h-4 w-4" />Центр затрат</Button>}>
      <div className="grid gap-3">
        {CENTERS.map((c) => {
          const pct = Math.round((c.spent / c.limit) * 100);
          return (
            <SectionCard key={c.id} title={c.name}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">{c.category}</span>
                <span className="font-medium"><Money value={c.spent} /> <span className="text-muted-foreground">/ <Money value={c.limit} /></span></span>
              </div>
              <Progress value={pct} className="mt-2 h-2" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{pct}% от лимита</span>
                <span>Остаток: <Money value={c.limit - c.spent} /></span>
              </div>
            </SectionCard>
          );
        })}
      </div>
    </ModulePage>
  );
}
