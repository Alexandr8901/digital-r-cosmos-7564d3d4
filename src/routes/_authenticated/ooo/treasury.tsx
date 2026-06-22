import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SectionCard, DataTable, Money, StatusBadge, StatCard, type Column } from "@/components/workspace/kit";
import { generatePaymentApprovals, fmtDateTime, type PaymentApproval } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Check, X, Plus, Landmark, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/ooo/treasury")({
  head: () => ({ meta: [{ title: "Казначейство — ООО" }] }),
  component: Page,
});

function Page() {
  const initial = useMemo(() => generatePaymentApprovals(), []);
  const [rows, setRows] = useState(initial);

  const decide = (id: string, status: "approved" | "rejected") => {
    setRows((p) => p.map((r) => r.id === id ? { ...r, status } : r));
    toast.success(status === "approved" ? "Платёж согласован" : "Платёж отклонён");
  };

  const cols: Column<PaymentApproval>[] = [
    { key: "requestedAt", header: "Дата", render: (r) => fmtDateTime(r.requestedAt), accessor: (r) => r.requestedAt },
    { key: "counterparty", header: "Контрагент", render: (r) => <div><div className="font-medium">{r.counterparty}</div><div className="text-xs text-muted-foreground">{r.purpose}</div></div> },
    { key: "requestedBy", header: "Инициатор" },
    { key: "approvedBy", header: "Согласовано", render: (r) => <span className="text-xs">{r.approvedBy} / {r.needsApprovers}</span> },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "Сумма", className: "text-right", render: (r) => <Money value={r.amount} className="font-medium" /> },
    {
      key: "actions", header: "",
      render: (r) =>
        r.status === "awaiting" ? (
          <div className="flex justify-end gap-1.5">
            <Button size="sm" variant="ghost" className="h-8 text-success" onClick={(e) => { e.stopPropagation(); decide(r.id, "approved"); }}><Check className="h-3.5 w-3.5" /></Button>
            <Button size="sm" variant="ghost" className="h-8 text-destructive" onClick={(e) => { e.stopPropagation(); decide(r.id, "rejected"); }}><X className="h-3.5 w-3.5" /></Button>
          </div>
        ) : null,
    },
  ];

  const awaiting = rows.filter((r) => r.status === "awaiting");
  const approvedTotal = rows.filter((r) => r.status === "approved").reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Казначейство"
        description="Очередь согласования, контроль лимитов и журнал платежей."
        action={<Button><Plus className="mr-1 h-4 w-4" />Новый платёж</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="На согласовании" value={awaiting.length} icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Сумма очереди" value={<Money value={awaiting.reduce((s, r) => s + r.amount, 0)} />} icon={<AlertCircle className="h-4 w-4" />} />
        <StatCard label="Одобрено за день" value={<Money value={approvedTotal} />} icon={<Check className="h-4 w-4" />} />
        <StatCard label="Лимит дня" value={<Money value={50000000} />} icon={<Landmark className="h-4 w-4" />} hint="по политике" />
      </div>

      <SectionCard title="Очередь согласования">
        <DataTable rows={rows} columns={cols} searchKeys={["counterparty", "purpose", "requestedBy"]} filters={[{ key: "status", label: "статус", options: [{ value: "awaiting", label: "Ожидает" }, { value: "approved", label: "Согласовано" }, { value: "rejected", label: "Отклонено" }] }]} exportName="treasury" />
      </SectionCard>
    </div>
  );
}
