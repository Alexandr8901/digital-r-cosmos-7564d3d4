import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ip/settings")({
  head: () => ({ meta: [{ title: "Настройки — ИП" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Настройки" description="Реквизиты, безопасность, оповещения и команда.">
      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Реквизиты ИП">
          <div className="space-y-3">
            <div><Label>Наименование</Label><Input defaultValue="ИП Иванов И.И." /></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>ИНН</Label><Input defaultValue="500100732259" /></div>
              <div><Label>ОГРНИП</Label><Input defaultValue="316500100050000" /></div>
            </div>
            <div><Label>Адрес</Label><Input defaultValue="Московская обл., г. Химки" /></div>
            <Button>Сохранить</Button>
          </div>
        </SectionCard>
        <SectionCard title="Безопасность и оповещения">
          <div className="space-y-3">
            <Toggle label="Двухфакторная аутентификация" desc="SMS или приложение" defaultChecked />
            <Toggle label="Уведомления о платежах" desc="Email и push" defaultChecked />
            <Toggle label="Дайджест по продажам" desc="Раз в неделю" />
            <Toggle label="AI-рекомендации" desc="Подсказки на главной" defaultChecked />
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
