import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch, MapPin, Users } from "lucide-react";

const BRANCHES = [
  { id: "1", name: "Москва, Центральный офис", address: "Тверская, 1", people: 124, manager: "Сергей Морозов" },
  { id: "2", name: "Санкт-Петербург", address: "Невский, 100", people: 68, manager: "Елена Фёдорова" },
  { id: "3", name: "Казань", address: "Баумана, 24", people: 32, manager: "Артём Степанов" },
  { id: "4", name: "Новосибирск", address: "Красный пр., 25", people: 41, manager: "Татьяна Алексеева" },
  { id: "5", name: "Екатеринбург", address: "Малышева, 51", people: 27, manager: "Павел Иванов" },
  { id: "6", name: "Краснодар", address: "Красная, 15", people: 19, manager: "Ирина Семёнова" },
];

export const Route = createFileRoute("/_authenticated/ooo/branches")({
  head: () => ({ meta: [{ title: "Филиалы — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Филиалы" description="Региональные подразделения и офисы." action={<Button><Plus className="mr-1 h-4 w-4" />Филиал</Button>}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BRANCHES.map((b) => (
          <SectionCard key={b.id} title={b.name}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{b.address}</div>
              <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-accent" />{b.people} сотрудников</div>
              <div className="flex items-center gap-2 text-sm"><GitBranch className="h-4 w-4 text-accent" />{b.manager}</div>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModulePage>
  );
}
