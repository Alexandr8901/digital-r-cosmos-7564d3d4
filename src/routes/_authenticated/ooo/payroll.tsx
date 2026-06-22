import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, StatCard, Money, type Column } from "@/components/workspace/kit";
import { generateEmployees, type Employee } from "@/lib/mock/business";
import { useMemo } from "react";
import { Wallet, Users, BadgePercent } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/payroll")({
  head: () => ({ meta: [{ title: "Зарплата — ООО" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateEmployees(43).filter((e) => e.status === "active"), []);
  const fot = rows.reduce((s, r) => s + r.salary, 0);
  const cols: Column<Employee>[] = [
    { key: "fullName", header: "Сотрудник" },
    { key: "role", header: "Должность" },
    { key: "department", header: "Подразделение" },
    { key: "salary", header: "Начислено", className: "text-right", render: (r) => <Money value={r.salary} /> },
    { key: "tax", header: "Налоги", className: "text-right", accessor: (r) => Math.round(r.salary * 0.43), render: (r) => <Money value={Math.round(r.salary * 0.43)} /> },
    { key: "net", header: "К выплате", className: "text-right", accessor: (r) => Math.round(r.salary * 0.87), render: (r) => <Money value={Math.round(r.salary * 0.87)} className="font-medium" /> },
  ];
  return (
    <ModulePage title="Зарплата" description="Начисления, налоги и выплаты по холдингу.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="ФОТ за месяц" value={<Money value={fot} />} icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Сотрудников" value={rows.length} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Налоги и взносы" value={<Money value={Math.round(fot * 0.43)} />} icon={<BadgePercent className="h-4 w-4" />} />
      </div>
      <DataTable rows={rows} columns={cols} searchKeys={["fullName"]} exportName="payroll" />
    </ModulePage>
  );
}
