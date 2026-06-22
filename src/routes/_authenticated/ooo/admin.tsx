import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard } from "@/components/workspace/kit";
import { ShieldAlert, Users, KeyRound, Lock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/admin")({
  head: () => ({ meta: [{ title: "Администрирование — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Администрирование" description="Управление пользователями, ролями и доступом.">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Пользователей" value={312} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Ролей" value={14} icon={<KeyRound className="h-4 w-4" />} />
        <StatCard label="Заблокировано" value={6} icon={<Lock className="h-4 w-4" />} />
        <StatCard label="Инциденты безопасности" value={0} icon={<ShieldAlert className="h-4 w-4" />} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Роли и права">
          <ul className="space-y-2 text-sm">
            {["Владелец", "Финансовый директор", "Главный бухгалтер", "Казначей", "Менеджер по продажам", "Аналитик", "Аудитор", "Сотрудник"].map((r) => (
              <li key={r} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                <span>{r}</span>
                <span className="text-xs text-muted-foreground">RBAC</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Политики">
          <ul className="space-y-2 text-sm">
            <li className="rounded-lg border border-border p-2.5">Минимальная длина пароля — 12 символов</li>
            <li className="rounded-lg border border-border p-2.5">Срок действия пароля — 90 дней</li>
            <li className="rounded-lg border border-border p-2.5">Сессия истекает через 8 часов</li>
            <li className="rounded-lg border border-border p-2.5">IP-allowlist для админов</li>
            <li className="rounded-lg border border-border p-2.5">Запрет повторного использования последних 5 паролей</li>
          </ul>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
