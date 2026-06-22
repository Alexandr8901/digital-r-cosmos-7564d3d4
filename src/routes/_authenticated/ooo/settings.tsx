import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ooo/settings")({
  head: () => ({ meta: [{ title: "Настройки — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Настройки" description="Конфигурация холдинга и политики безопасности.">
      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Реквизиты головной компании">
          <div className="space-y-3">
            <div><Label>Наименование</Label><Input defaultValue="ООО «ЦифроРубль Холдинг»" /></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>ИНН</Label><Input defaultValue="7704123456" /></div>
              <div><Label>КПП</Label><Input defaultValue="770401001" /></div>
            </div>
            <div><Label>ОГРН</Label><Input defaultValue="1027700100000" /></div>
            <Button>Сохранить</Button>
          </div>
        </SectionCard>
        <SectionCard title="Политики безопасности">
          <div className="space-y-3">
            <Toggle label="Обязательная 2FA" desc="Для всех пользователей" defaultChecked />
            <Toggle label="Согласование платежей > 1 млн ₽" desc="Двойное подтверждение" defaultChecked />
            <Toggle label="Audit Trail" desc="Полное логирование действий" defaultChecked />
            <Toggle label="SSO (SAML)" desc="Корпоративный вход" />
          </div>
        </SectionCard>
      </div>
    </ModulePage>
  );
}

function Toggle({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <div><div className="text-sm font-medium">{label}</div><div className="text-xs text-muted-foreground">{desc}</div></div>
      <Switch defaultChecked={defaultChecked} />
    </label>
  );
}
