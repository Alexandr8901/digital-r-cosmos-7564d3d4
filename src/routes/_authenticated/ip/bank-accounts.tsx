import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, Money, StatusBadge, IntegrationStatus } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Plus, Landmark } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/bank-accounts")({
  head: () => ({ meta: [{ title: "Банковские счета — ИП" }] }),
  component: Page,
});

const ACCOUNTS = [
  { id: "1", name: "Основной (Сбер)", number: "40802810000000012345", balance: 1248300, status: "active" },
  { id: "2", name: "Зарплатный (Альфа)", number: "40802810000000098765", balance: 482000, status: "active" },
  { id: "3", name: "Налоговый (ВТБ)", number: "40802810000000012000", balance: 112000, status: "active" },
];

function Page() {
  return (
    <ModulePage
      title="Банковские счета"
      description="Подключённые расчётные счета и их балансы."
      action={<Button><Plus className="mr-1 h-4 w-4" />Подключить счёт</Button>}
      integration={<IntegrationStatus label="Подключение банков через официальное API ОПКЦ СБП и партнёрские договоры" />}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {ACCOUNTS.map((a) => (
          <SectionCard key={a.id} title={a.name}>
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Landmark className="h-5 w-5" /></div>
              <StatusBadge status={a.status} />
            </div>
            <div className="mt-4 font-display text-2xl font-semibold"><Money value={a.balance} /></div>
            <div className="mt-1 text-xs text-muted-foreground">{a.number}</div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Перевод</Button>
              <Button variant="outline" size="sm" className="flex-1">Выписка</Button>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModulePage>
  );
}
