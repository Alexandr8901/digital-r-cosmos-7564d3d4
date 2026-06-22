import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateInvoices, fmtDateTime, type Invoice } from "@/lib/mock/business";
import { useMemo } from "react";

export const Route = createFileRoute("/_authenticated/ooo/payments")({
  head: () => ({ meta: [{ title: "Платежи — ООО" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateInvoices(80), []);
  const cols: Column<Invoice>[] = [
    { key: "issuedAt", header: "Дата", render: (r) => fmtDateTime(r.issuedAt), accessor: (r) => r.issuedAt },
    { key: "number", header: "Документ" },
    { key: "clientName", header: "Контрагент" },
    { key: "method", header: "Канал" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "Сумма", className: "text-right", render: (r) => <Money value={r.amount} className="font-medium" /> },
  ];
  return (
    <ModulePage title="Платежи холдинга" description="Все платежи по юридическим лицам и счетам.">
      <DataTable rows={rows} columns={cols} searchKeys={["number", "clientName"]} exportName="payments" />
    </ModulePage>
  );
}
