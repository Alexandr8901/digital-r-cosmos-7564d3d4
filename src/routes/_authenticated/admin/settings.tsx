import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({ meta: [{ title: "Настройки системы · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Настройки системы"
      description="Локализация, темы, политики безопасности, журналирование и хранение"
      integration={<IntegrationStatus />}
      action={<Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button>}
    >
      <EmptyState
        title="Раздел готов к работе"
        description="Интерфейс модуля «Настройки системы» подключается к ядру платформы через официальные API и политику разграничения прав."
      />
    </PlatformPage>
  );
}
