import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money, IntegrationStatus } from "@/components/workspace/kit";
import { Smartphone, QrCode, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ip/sbp")({
  head: () => ({ meta: [{ title: "СБП — ИП" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="СБП" description="Система быстрых платежей: приём, статика, динамика, возвраты." integration={<IntegrationStatus />}>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Приём за месяц" value={<Money value={284600} />} icon={<ArrowDownToLine className="h-4 w-4" />} trend={{ value: "+24%", positive: true }} />
        <StatCard label="Транзакций" value={142} icon={<Smartphone className="h-4 w-4" />} />
        <StatCard label="Комиссия СБП" value="0.4–0.7%" icon={<QrCode className="h-4 w-4" />} hint="по тарифу ЦБ РФ" />
      </div>
      <SectionCard title="Действия">
        <div className="grid gap-3 sm:grid-cols-3">
          <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4"><QrCode className="h-4 w-4 text-accent" /><span className="font-medium">Статический QR</span><span className="text-xs text-muted-foreground">Один QR на все платежи</span></Button>
          <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4"><QrCode className="h-4 w-4 text-accent" /><span className="font-medium">Динамический QR</span><span className="text-xs text-muted-foreground">На конкретную сумму</span></Button>
          <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4"><ArrowDownToLine className="h-4 w-4 text-accent" /><span className="font-medium">Возврат</span><span className="text-xs text-muted-foreground">По номеру операции</span></Button>
        </div>
      </SectionCard>
    </ModulePage>
  );
}
