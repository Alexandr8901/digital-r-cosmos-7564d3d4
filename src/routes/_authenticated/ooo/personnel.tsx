import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateEmployees, fmtDate, type Employee } from "@/lib/mock/business";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/personnel")({
  head: () => ({ meta: [{ title: "Персонал — ООО" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateEmployees(43), []);
  const cols: Column<Employee>[] = [
    { key: "fullName", header: "Сотрудник" },
    { key: "role", header: "Должность" },
    { key: "department", header: "Подразделение" },
    { key: "email", header: "Email" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status === "invited" ? "awaiting" : r.status} /> },
    { key: "lastLoginAt", header: "Активность", render: (r) => fmtDate(r.lastLoginAt), accessor: (r) => r.lastLoginAt },
  ];
  return (
    <ModulePage title="Персонал" description="Сотрудники, статусы, отделы и активность." action={<Button><Plus className="mr-1 h-4 w-4" />Сотрудник</Button>}>
      <DataTable rows={rows} columns={cols} searchKeys={["fullName", "email", "role"]} exportName="personnel" />
    </ModulePage>
  );
}
