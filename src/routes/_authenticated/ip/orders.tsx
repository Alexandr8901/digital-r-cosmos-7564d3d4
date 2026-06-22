import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ModulePage, DataTable, Money, StatusBadge, type Column, StatCard } from "@/components/workspace/kit";
import { generateOrders, fmtDate, type Order } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/orders")({
  head: () => ({ meta: [{ title: "Заказы — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateOrders(40), []);
  const total = rows.reduce((s, r) => s + r.total, 0);
  const completed = rows.filter((r) => r.status === "completed").length;
  const pending = rows.filter((r) => r.status === "new" || r.status === "in_progress").length;

  const cols: Column<Order>[] = [
    { key: "number", header: "Номер" },
    { key: "customer", header: "Покупатель" },
    { key: "createdAt", header: "Создан", render: (r) => fmtDate(r.createdAt), accessor: (r) => r.createdAt },
    { key: "itemsCount", header: "Позиций", className: "text-right" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "payment", header: "Оплата", render: (r) => <StatusBadge status={r.payment === "paid" ? "paid" : r.payment === "refunded" ? "rejected" : "pending"} /> },
    { key: "total", header: "Сумма", className: "text-right", render: (r) => <Money value={r.total} className="font-medium" /> },
  ];

  return (
    <ModulePage
      title="Заказы"
      description="Управление заказами, оплатой, доставкой и статусами."
      action={<Button><Plus className="mr-1 h-4 w-4" />Новый заказ</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Всего" value={rows.length} icon={<ShoppingCart className="h-4 w-4" />} />
        <StatCard label="Завершено" value={completed} icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="В работе" value={pending} icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Оборот" value={<Money value={total} />} hint="за период" />
      </div>
      <DataTable
        rows={rows}
        columns={cols}
        searchKeys={["number", "customer"]}
        filters={[
          { key: "status", label: "статус", options: ["new", "in_progress", "shipped", "completed", "cancelled"].map((v) => ({ value: v, label: v })) },
        ]}
        exportName="orders"
      />
    </ModulePage>
  );
}
