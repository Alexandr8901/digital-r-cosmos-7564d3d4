import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Dept = { id: string; name: string; head: string; people: number; budget: string };

const ROWS: Dept[] = [
  { id: "1", name: "Управление", head: "Сергей Морозов", people: 12, budget: "₽ 18,4 млн" },
  { id: "2", name: "Финансы", head: "Анна Смирнова", people: 24, budget: "₽ 32,2 млн" },
  { id: "3", name: "Продажи", head: "Дмитрий Петров", people: 48, budget: "₽ 64,1 млн" },
  { id: "4", name: "Маркетинг", head: "Елена Фёдорова", people: 18, budget: "₽ 28,5 млн" },
  { id: "5", name: "Разработка", head: "Артём Степанов", people: 72, budget: "₽ 142 млн" },
  { id: "6", name: "Операции", head: "Татьяна Алексеева", people: 56, budget: "₽ 86,7 млн" },
  { id: "7", name: "Логистика", head: "Павел Иванов", people: 34, budget: "₽ 41 млн" },
  { id: "8", name: "HR", head: "Ирина Семёнова", people: 14, budget: "₽ 22 млн" },
];

export const Route = createFileRoute("/_authenticated/ooo/departments")({
  head: () => ({ meta: [{ title: "Подразделения — ООО" }] }),
  component: Page,
});

function Page() {
  const cols: Column<Dept>[] = [
    { key: "name", header: "Подразделение", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "head", header: "Руководитель" },
    { key: "people", header: "Сотрудников", className: "text-right" },
    { key: "budget", header: "Годовой бюджет", className: "text-right" },
  ];
  return (
    <ModulePage title="Подразделения" description="Структура и иерархия команд." action={<Button><Plus className="mr-1 h-4 w-4" />Подразделение</Button>}>
      <DataTable rows={ROWS} columns={cols} searchKeys={["name", "head"]} exportName="departments" />
    </ModulePage>
  );
}
