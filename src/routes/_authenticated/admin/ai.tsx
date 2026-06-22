import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/ai")({
  head: () => ({ meta: [{ title: "AI для администраторов · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="AI для администраторов"
      description="Анализ состояния платформы, поиск аномалий и подготовка отчётов"
      integration={<IntegrationStatus />}
      action={<Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button>}
    >
      <EmptyState
        title="Раздел готов к работе"
        description="Интерфейс модуля «AI для администраторов» подключается к ядру платформы через официальные API и политику разграничения прав."
      />
    </PlatformPage>
  );
}
