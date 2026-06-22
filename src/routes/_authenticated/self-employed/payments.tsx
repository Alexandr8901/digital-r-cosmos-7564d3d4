import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { useMemo } from "react";
import { generateInvoices, fmtDateTime, type Invoice } from "@/lib/mock/business";

export const Route = createFileRoute("/_authenticated/self-employed/payments")({
  head: () => ({ meta: [{ title: "Платежи — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateInvoices(50), []);
  const cols: Column<Invoice>[] = [
    { key: "issuedAt", header: "Дата", render: (r) => fmtDateTime(r.issuedAt), accessor: (r) => r.issuedAt },
    { key: "number", header: "Платёж" },
    { key: "clientName", header: "Контрагент" },
    { key: "method", header: "Канал" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "Сумма", className: "text-right", render: (r) => <Money value={r.amount} /> },
  ];
  return (
    <ModulePage title="Платежи" description="Поступления и возвраты по всем каналам.">
      <DataTable rows={rows} columns={cols} searchKeys={["number", "clientName"]} exportName="payments" />
    </ModulePage>
  );
}
