import { createFileRoute, Link } from "@tanstack/react-router";
import { ModulePage, EmptyState } from "@/components/workspace/kit";
import { Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ooo/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Marketplace" description="Корпоративные приложения и расширения.">
      <EmptyState
        icon={<Store className="h-6 w-6" />}
        title="Используется общий каталог"
        description="Корпоративный каталог расширений совпадает с каталогом для ИП. Дополнительно подключайте корпоративные решения через интеграции."
        action={<Button asChild><Link to="/ip/marketplace">Открыть каталог <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>}
      />
    </ModulePage>
  );
}
