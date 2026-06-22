import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, IntegrationStatus } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Banknote, Landmark, FileText, Database, ShieldCheck, MessageSquare, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/integrations")({
  head: () => ({ meta: [{ title: "Интеграции — ООО" }] }),
  component: Page,
});

const INTEGRATIONS = [
  { Icon: Banknote, name: "Цифровой рубль (ЦБ РФ)", desc: "Корпоративные кошельки и платежи", status: "pending-official-api" as const },
  { Icon: Landmark, name: "СберБизнес, ВТБ, Альфа, Тинькофф", desc: "Расчётные счета, выписки, ДБО", status: "pending-official-api" as const },
  { Icon: FileText, name: "ФНС / СБИС / Контур.ЭДО", desc: "Электронный документооборот", status: "pending-official-api" as const },
  { Icon: Database, name: "1С: ERP / Бухгалтерия", desc: "Двусторонняя синхронизация", status: "in-development" as const },
  { Icon: BarChart3, name: "Power BI / Tableau", desc: "Выгрузка данных для BI", status: "live" as const },
  { Icon: ShieldCheck, name: "КриптоПро / РутокенЭП", desc: "Электронная подпись", status: "in-development" as const },
  { Icon: MessageSquare, name: "Telegram / Slack", desc: "Уведомления и согласования", status: "live" as const },
];

function Page() {
  return (
    <ModulePage title="Интеграции" description="Каталог корпоративных интеграций.">
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
