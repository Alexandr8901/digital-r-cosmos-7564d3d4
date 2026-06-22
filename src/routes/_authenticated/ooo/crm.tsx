import { createFileRoute, Link } from "@tanstack/react-router";
import { ModulePage, SectionCard, EmptyState } from "@/components/workspace/kit";
import { Contact2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ooo/crm")({
  head: () => ({ meta: [{ title: "CRM — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="CRM" description="Корпоративная воронка, ключевые клиенты и сегменты.">
      <SectionCard title="Корпоративная воронка">
        <EmptyState
          icon={<Contact2 className="h-5 w-5" />}
          title="Используется воронка ИП"
          description="Корпоративная CRM построена на той же воронке, что и в кабинете ИП — лиды, квалификация, КП, переговоры, выигрыш."
          action={<Button asChild><Link to="/ip/crm">Открыть воронку <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>}
        />
      </SectionCard>
    </ModulePage>
  );
}
