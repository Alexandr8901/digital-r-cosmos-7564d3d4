import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, IntegrationStatus } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Banknote, Landmark, Smartphone, FileText, MessageSquare, Database, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/integrations")({
  head: () => ({ meta: [{ title: "Интеграции — ИП" }] }),
  component: Page,
});

const INTEGRATIONS = [
  { Icon: Banknote, name: "Цифровой рубль (ЦБ РФ)", desc: "Кошелёк, операции, QR", status: "pending-official-api" as const },
  { Icon: Smartphone, name: "СБП", desc: "Приём и переводы", status: "pending-official-api" as const },
  { Icon: Landmark, name: "Банки (СберБизнес, Альфа, Тинькофф)", desc: "Расчётные счета и выписки", status: "pending-official-api" as const },
  { Icon: FileText, name: "ФНС / Мой Налог", desc: "Отчётность и чеки", status: "pending-official-api" as const },
  { Icon: ShoppingBag, name: "Маркетплейсы (Wildberries, Ozon)", desc: "Заказы и остатки", status: "in-development" as const },
  { Icon: Database, name: "1С", desc: "Двусторонний обмен", status: "in-development" as const },
  { Icon: MessageSquare, name: "Telegram / Email", desc: "Уведомления клиентам", status: "live" as const },
];

function Page() {
  return (
    <ModulePage title="Интеграции" description="Подключение внешних сервисов и API.">
      <div className="grid gap-4 md:grid-cols-2">
        {INTEGRATIONS.map(({ Icon, name, desc, status }) => (
          <SectionCard key={name} title={name}>
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><Icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{desc}</p>
                <div className="mt-2"><IntegrationStatus status={status} /></div>
              </div>
              <Button variant="outline" size="sm">{status === "live" ? "Настроить" : "Подключить"}</Button>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModulePage>
  );
}
