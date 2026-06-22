import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ModulePage, DataTable, StatCard, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateInvoices, fmtDate, type Invoice } from "@/lib/mock/business";
import { Wallet, TrendingUp, ReceiptText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/self-employed/income")({
  head: () => ({ meta: [{ title: "Доходы — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateInvoices(60).filter((i) => i.status === "paid" || i.status === "pending"), []);
  const total = rows.reduce((s, r) => s + (r.status === "paid" ? r.amount : 0), 0);
  const pending = rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0);

  const cols: Column<Invoice>[] = [
    { key: "issuedAt", header: "Дата", render: (r) => fmtDate(r.issuedAt), accessor: (r) => r.issuedAt },
    { key: "number", header: "Номер" },
    { key: "clientName", header: "Клиент" },
    { key: "method", header: "Способ", render: (r) => <span className="text-xs uppercase text-muted-foreground">{r.method}</span> },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "Сумма", className: "text-right", render: (r) => <Money value={r.amount} className="font-medium" /> },
  ];

  return (
    <ModulePage
      title="Доходы"
      description="История поступлений с фильтрами, поиском и экспортом."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Получено" value={<Money value={total} />} icon={<Wallet className="h-4 w-4" />} trend={{ value: "+22%", positive: true }} hint="за период" />
        <StatCard label="В ожидании" value={<Money value={pending} />} icon={<ReceiptText className="h-4 w-4" />} hint={`${rows.filter((r) => r.status === "pending").length} счетов`} />
        <StatCard label="Средний чек" value={<Money value={Math.round(total / Math.max(rows.length, 1))} />} icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <DataTable
        rows={rows}
        columns={cols}
        searchKeys={["clientName", "number"]}
        filters={[
          { key: "status", label: "статус", options: [{ value: "paid", label: "Оплачен" }, { value: "pending", label: "Ожидает" }] },
          { key: "method", label: "способ", options: [{ value: "qr", label: "QR" }, { value: "card", label: "Карта" }, { value: "bank", label: "Банк" }] },
        ]}
        exportName="income"
      />
    </ModulePage>
  );
}
