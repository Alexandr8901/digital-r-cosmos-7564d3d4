import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/lib/theme";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { PageHeader, SectionCard } from "@/components/citizen/kit";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/citizen/settings")({
  head: () => ({ meta: [{ title: "Настройки · ЦифроРубль" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("ru");
  const [notif, setNotif] = useState({ email: true, push: true, sms: false, marketing: false });

  return (
    <div className="space-y-6">
      <PageHeader title="Настройки" description="Внешний вид, язык и уведомления" />

      <SectionCard title="Внешний вид">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Тема</Label>
            <Select value={theme} onValueChange={(v) => setTheme(v as typeof theme)}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Светлая</SelectItem>
                <SelectItem value="dark">Тёмная</SelectItem>
                <SelectItem value="system">Системная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Язык интерфейса</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Уведомления">
        <div className="space-y-4">
          {([
            ["email", "Email-уведомления"],
            ["push", "Push-уведомления"],
            ["sms", "SMS"],
            ["marketing", "Маркетинговые рассылки"],
          ] as const).map(([k, label]) => (
            <div key={k} className="flex items-center justify-between rounded-xl border border-border p-3">
              <Label className="text-sm">{label}</Label>
              <Switch
                checked={notif[k]}
                onCheckedChange={(v) => {
                  setNotif({ ...notif, [k]: v });
                  toast.success("Сохранено");
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Безопасность">
        <div className="space-y-3 text-sm">
          {[
            "Двухфакторная аутентификация",
            "Passkey (после настройки)",
            "Уведомления о входах",
            "Подтверждение крупных операций",
          ].map((s) => (
            <div key={s} className="flex items-center justify-between rounded-xl border border-border p-3">
              <span>{s}</span>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </SectionCard>

      <Card className="p-5 text-sm text-muted-foreground">
        Хотите удалить аккаунт? Обратитесь в поддержку.
      </Card>
    </div>
  );
}
