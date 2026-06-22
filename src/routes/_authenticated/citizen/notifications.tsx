import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, ArrowLeftRight, ShieldCheck, FileText, Sparkles, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, EmptyState } from "@/components/citizen/kit";
import { notifications as INIT, type Notification } from "@/lib/mock/citizen";

const ICONS: Record<Notification["category"], React.ComponentType<{ className?: string }>> = {
  payment: CreditCard,
  transfer: ArrowLeftRight,
  security: ShieldCheck,
  document: FileText,
  ai: Sparkles,
  system: Bell,
};

const LABELS: Record<string, string> = {
  all: "Все",
  payment: "Платежи",
  transfer: "Переводы",
  security: "Безопасность",
  document: "Документы",
  ai: "AI",
  system: "Система",
};

export const Route = createFileRoute("/_authenticated/citizen/notifications")({
  head: () => ({ meta: [{ title: "Уведомления · ЦифроРубль" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [list, setList] = useState<Notification[]>(INIT);
  const [filter, setFilter] = useState<string>("all");
  const visible = filter === "all" ? list : list.filter((n) => n.category === filter);
  const unread = list.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Уведомления"
        description={unread ? `${unread} непрочитанных` : "Все прочитаны"}
        action={
          <Button
            variant="outline"
            onClick={() => setList((p) => p.map((n) => ({ ...n, read: true })))}
            disabled={!unread}
          >
            Прочитать все
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {Object.keys(LABELS).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filter === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
            }`}
          >
            {LABELS[k]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={<Bell className="h-6 w-6" />} title="Пусто" description="Нет уведомлений в этой категории." />
      ) : (
        <div className="space-y-2">
          {visible.map((n) => {
            const Icon = ICONS[n.category];
            return (
              <Card
                key={n.id}
                className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/30 ${!n.read ? "border-l-4 border-l-accent" : ""}`}
                onClick={() => setList((p) => p.map((x) => x.id === n.id ? { ...x, read: true } : x))}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{n.title}</div>
                    {!n.read && <Badge className="bg-accent text-accent-foreground">новое</Badge>}
                  </div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{n.description}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString("ru-RU")}</div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
