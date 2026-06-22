import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, StatCard, Money, type Column } from "@/components/workspace/kit";
import { generateEmployees, type Employee } from "@/lib/mock/business";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BadgePercent, Users, Wallet } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/payroll")({
  head: () => ({ meta: [{ title: "Зарплата — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateEmployees().filter((e) => e.status === "active"), []);
  const totalPayroll = rows.reduce((s, r) => s + r.salary, 0);
  const cols: Column<Employee>[] = [
    { key: "fullName", header: "Сотрудник" },
    { key: "role", header: "Роль" },
    { key: "department", header: "Отдел" },
    { key: "salary", header: "Начислено", className: "text-right", render: (r) => <Money value={r.salary} className="font-medium" /> },
  ];
  return (
    <ModulePage title="Зарплата" description="Начисления, выплаты, история и отчёты." action={<Button>Запустить выплату</Button>}>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="ФОТ за месяц" value={<Money value={totalPayroll} />} icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Сотрудников" value={rows.length} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Налоги" value={<Money value={Math.round(totalPayroll * 0.43)} />} icon={<BadgePercent className="h-4 w-4" />} hint="НДФЛ + взносы" />
      </div>
      <DataTable rows={rows} columns={cols} searchKeys={["fullName"]} exportName="payroll" />
    </ModulePage>
  );
}
