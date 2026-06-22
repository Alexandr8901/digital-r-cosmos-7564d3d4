import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ModulePage, DataTable, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateInvoices, fmtDate, type Invoice } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/self-employed/invoices")({
  head: () => ({ meta: [{ title: "Счета — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateInvoices(40), []);
  const cols: Column<Invoice>[] = [
    { key: "number", header: "Номер", render: (r) => <span className="font-medium">{r.number}</span> },
    { key: "clientName", header: "Клиент" },
    { key: "issuedAt", header: "Выставлен", render: (r) => fmtDate(r.issuedAt), accessor: (r) => r.issuedAt },
    { key: "dueAt", header: "Срок", render: (r) => fmtDate(r.dueAt), accessor: (r) => r.dueAt },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "Сумма", className: "text-right", render: (r) => <Money value={r.amount} className="font-medium" /> },
  ];

  return (
    <ModulePage
      title="Счета"
      description="История выставленных счетов и их статусы."
      action={<Button asChild><Link to="/self-employed/invoices/new"><Plus className="mr-1 h-4 w-4" />Выставить счёт</Link></Button>}
    >
      <DataTable
        rows={rows}
        columns={cols}
        searchKeys={["number", "clientName"]}
        filters={[{ key: "status", label: "статус", options: [
          { value: "paid", label: "Оплачен" }, { value: "pending", label: "Ожидает" },
          { value: "overdue", label: "Просрочен" }, { value: "draft", label: "Черновик" },
        ] }]}
        exportName="invoices"
      />
    </ModulePage>
  );
}
