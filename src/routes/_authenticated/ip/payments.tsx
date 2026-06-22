import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateInvoices, fmtDateTime, type Invoice } from "@/lib/mock/business";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/payments")({
  head: () => ({ meta: [{ title: "Платежи — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateInvoices(60), []);
  const cols: Column<Invoice>[] = [
    { key: "issuedAt", header: "Дата", render: (r) => fmtDateTime(r.issuedAt), accessor: (r) => r.issuedAt },
    { key: "number", header: "Документ" },
    { key: "clientName", header: "Контрагент" },
    { key: "method", header: "Канал" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "Сумма", className: "text-right", render: (r) => <Money value={r.amount} className="font-medium" /> },
  ];
  return (
    <ModulePage
      title="Платежи"
      description="Создание, приём, возвраты и шаблоны платежей."
      action={
        <>
          <Button variant="outline"><ArrowDownToLine className="mr-1 h-4 w-4" />Принять</Button>
          <Button variant="outline"><ArrowUpFromLine className="mr-1 h-4 w-4" />Возврат</Button>
          <Button><Plus className="mr-1 h-4 w-4" />Платёж</Button>
        </>
      }
    >
      <DataTable rows={rows} columns={cols} searchKeys={["number", "clientName"]} exportName="payments" />
    </ModulePage>
  );
}
