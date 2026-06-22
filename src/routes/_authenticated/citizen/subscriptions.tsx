import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/citizen/kit";
import { subscriptions, formatRub, type Subscription } from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/subscriptions")({
  head: () => ({ meta: [{ title: "Подписки · ЦифроРубль" }] }),
  component: SubsPage,
});

function SubsPage() {
  const [list, setList] = useState<Subscription[]>(subscriptions);
  const monthly = list.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Подписки"
        description={`${list.length} активных · ${formatRub(monthly)} в месяц`}
      />
      <div className="grid gap-3">
        {list.map((s) => (
          <Card key={s.id} className="flex items-center gap-4 p-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-muted font-bold">{s.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.category} · следующее списание {new Date(s.nextChargeAt).toLocaleDateString("ru-RU")}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-semibold">{formatRub(s.amount)}</div>
              <div className="text-xs text-muted-foreground">в месяц</div>
            </div>
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <span className="hidden text-xs text-muted-foreground sm:inline">Автопродление</span>
              <Switch
                checked={s.autoRenew}
                onCheckedChange={(v) => {
                  setList((prev) => prev.map((p) => p.id === s.id ? { ...p, autoRenew: v } : p));
                  toast.success(v ? "Автопродление включено" : "Автопродление выключено");
                }}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setList((prev) => prev.filter((p) => p.id !== s.id));
                toast.success(`${s.name} отменена`);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
      <Card className="flex items-center gap-3 p-4 text-sm text-muted-foreground">
        <Bell className="h-4 w-4" />
        Мы напомним за 3 дня до каждого списания.
      </Card>
    </div>
  );
}
