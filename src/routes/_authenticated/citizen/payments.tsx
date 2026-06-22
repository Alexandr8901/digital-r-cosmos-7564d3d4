import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Home, Wifi, Smartphone, Tv, AlertTriangle, Receipt, Zap, Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, SectionCard } from "@/components/citizen/kit";
import { StatusBadge } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/_authenticated/citizen/payments")({
  head: () => ({ meta: [{ title: "Платежи · ЦифроРубль" }] }),
  component: PaymentsPage,
});

const CATEGORIES = [
  { id: "utility", icon: Home, label: "ЖКХ", status: "pending-api" as const },
  { id: "internet", icon: Wifi, label: "Интернет", status: "available" as const },
  { id: "mobile", icon: Smartphone, label: "Мобильная связь", status: "available" as const },
  { id: "tv", icon: Tv, label: "ТВ", status: "available" as const },
  { id: "fines", icon: AlertTriangle, label: "Штрафы ГИБДД", status: "pending-api" as const },
  { id: "tax", icon: Receipt, label: "Налоги", status: "pending-api" as const },
  { id: "energy", icon: Zap, label: "Электроэнергия", status: "pending-api" as const },
  { id: "parking", icon: Car, label: "Парковки", status: "in-development" as const },
];

function PaymentsPage() {
  const [selected, setSelected] = useState(CATEGORIES[1]);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader title="Платежи" description="Оплата услуг и регулярных счетов" />

      <SectionCard title="Категории">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                selected.id === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex w-full items-start justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <StatusBadge status={c.status} />
              </div>
              <div className="text-sm font-medium">{c.label}</div>
            </button>
          ))}
        </div>
      </SectionCard>

      <Card className="p-6">
        <div className="font-display text-lg font-semibold">{selected.label}</div>
        <p className="mt-1 text-sm text-muted-foreground">
          {selected.status === "available" ? "Демо-форма оплаты услуги" : "Реальная оплата доступна после подключения официального API"}
        </p>
        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Платёж создан", { description: `${amount} ₽ — ${selected.label}` });
            setAmount("");
            setAccount("");
          }}
        >
          <div>
            <Label>Лицевой счёт или номер</Label>
            <Input className="mt-1.5 h-11" placeholder="1234567890" value={account} onChange={(e) => setAccount(e.target.value)} required />
          </div>
          <div>
            <Label>Сумма, ₽</Label>
            <Input className="mt-1.5 h-11" type="number" min="1" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={selected.status !== "available"}>
              Оплатить {amount ? `${amount} ₽` : ""}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
