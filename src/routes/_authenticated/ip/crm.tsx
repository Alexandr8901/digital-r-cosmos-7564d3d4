import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SectionCard, Money } from "@/components/workspace/kit";
import { generateDeals, type Deal, fmtDate } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/ip/crm")({
  head: () => ({ meta: [{ title: "CRM — ИП" }] }),
  component: Page,
});

const STAGES: { id: Deal["stage"]; label: string; color: string }[] = [
  { id: "lead", label: "Лиды", color: "bg-muted" },
  { id: "qualified", label: "Квалификация", color: "bg-primary/10" },
  { id: "proposal", label: "Предложение", color: "bg-accent-soft" },
  { id: "negotiation", label: "Переговоры", color: "bg-warning/10" },
  { id: "won", label: "Выиграно", color: "bg-success/15" },
  { id: "lost", label: "Проиграно", color: "bg-destructive/10" },
];

function Page() {
  const initial = useMemo(() => generateDeals(), []);
  const [deals, setDeals] = useState(initial);

  function move(dealId: string, stage: Deal["stage"]) {
    setDeals((p) => p.map((d) => d.id === dealId ? { ...d, stage } : d));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM"
        description="Лиды, контакты, сделки, воронка и задачи."
        action={<Button><Plus className="mr-1 h-4 w-4" />Новая сделка</Button>}
      />

      <SectionCard title="Воронка продаж">
        <div className="grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2">
          {STAGES.map((stage) => {
            const list = deals.filter((d) => d.stage === stage.id);
            const total = list.reduce((s, d) => s + d.amount, 0);
            return (
              <div key={stage.id} className={`rounded-xl border border-border p-3 ${stage.color}`}>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{stage.label}</div>
                    <div className="text-[11px] text-muted-foreground">{list.length} · <Money value={total} /></div>
                  </div>
                </div>
                <div className="space-y-2">
                  {list.map((d) => (
                    <Card key={d.id} className="cursor-grab p-3 transition-all hover:shadow-card">
                      <div className="text-sm font-medium">{d.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{d.client}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-semibold"><Money value={d.amount} /></span>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">{d.ownerInitials}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{fmtDate(d.updatedAt)}</span>
                        <span>{d.probability}%</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {STAGES.filter((s) => s.id !== d.stage).slice(0, 2).map((s) => (
                          <button key={s.id} onClick={() => move(d.id, s.id)} className="rounded border border-border px-1.5 py-0.5 text-[10px] hover:bg-background">
                            → {s.label}
                          </button>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Задачи">
          <ul className="space-y-2 text-sm">
            {["Перезвонить ООО «Орбита»", "Подготовить КП для ИП Воронов", "Согласовать договор с «Северный Ветер»", "Отправить акт за май"].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-lg border border-border p-3">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
                {t}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="AI-подсказки">
          <ul className="space-y-3 text-sm">
            <li className="rounded-lg border border-border p-3">У сделки «Орбита» 5 дней без активности — отправить follow-up.</li>
            <li className="rounded-lg border border-border p-3">3 лида похожи на клиентов, у которых уже была покупка — предложить тот же товар.</li>
            <li className="rounded-lg border border-border p-3">Конверсия из «Предложения» в «Переговоры» ниже среднего — пересмотрите шаблон КП.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
