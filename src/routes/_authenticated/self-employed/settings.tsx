import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, IntegrationStatus } from "@/components/workspace/kit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/self-employed/settings")({
  head: () => ({ meta: [{ title: "Настройки — Самозанятый" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Настройки" description="Личные данные, реквизиты и интеграции.">
      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Реквизиты самозанятого">
          <div className="space-y-3">
            <div><Label>ФИО</Label><Input defaultValue="Иванов Иван Иванович" /></div>
            <div><Label>ИНН</Label><Input defaultValue="500100732259" /></div>
            <div><Label>Расчётный счёт</Label><Input placeholder="40817810…" /></div>
            <Button>Сохранить</Button>
          </div>
        </SectionCard>
        <SectionCard title="Интеграции">
          <div className="space-y-3">
            <Toggle label="ФНС «Мой налог»" desc="Чеки и налоговые квитанции" />
            <Toggle label="СБП-приём" desc="QR и платежи по телефону" />
            <Toggle label="Email-напоминания клиентам" desc="Автоматические письма" defaultChecked />
            <IntegrationStatus />
          </div>
        </SectionCard>
      </div>
    </ModulePage>
  );
}

function Toggle({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </label>
  );
}
