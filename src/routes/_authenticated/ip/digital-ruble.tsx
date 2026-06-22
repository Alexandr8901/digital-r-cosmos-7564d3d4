import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, IntegrationStatus, Money } from "@/components/workspace/kit";
import { Banknote, ArrowLeftRight, QrCode, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ip/digital-ruble")({
  head: () => ({ meta: [{ title: "Цифровой рубль — ИП" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage
      title="Цифровой рубль"
      description="Управление кошельком, операции и QR. Подключение — через официальное API ЦБ РФ."
      integration={<IntegrationStatus />}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Баланс" value={<Money value={0} />} icon={<Banknote className="h-4 w-4" />} hint="доступно к операциям" />
        <StatCard label="Операций за месяц" value={0} icon={<ArrowLeftRight className="h-4 w-4" />} />
        <StatCard label="Статус подключения" value="Ожидает API" icon={<ShieldCheck className="h-4 w-4" />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Операции">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-10 text-center">
            <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground"><ArrowLeftRight className="h-5 w-5" /></div>
            <div className="font-display text-base font-semibold">Операций пока нет</div>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">После подключения официального API ЦБ РФ здесь появятся операции с цифровым рублём.</p>
          </div>
        </SectionCard>
        <SectionCard title="Действия">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { Icon: ArrowLeftRight, label: "Перевод", desc: "На другой кошелёк" },
              { Icon: Banknote, label: "Принять оплату", desc: "От покупателя" },
              { Icon: QrCode, label: "QR", desc: "Для оплаты на месте" },
              { Icon: ShieldCheck, label: "Лимиты", desc: "Настройка безопасности" },
            ].map(({ Icon, label, desc }) => (
              <Button key={label} variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                <Icon className="h-4 w-4 text-accent" />
                <span className="font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </Button>
            ))}
          </div>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
