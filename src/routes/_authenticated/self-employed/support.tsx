import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { MessageCircle, BookOpen, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/self-employed/support")({
  head: () => ({ meta: [{ title: "Поддержка — Самозанятый" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="Поддержка" description="Свяжитесь с нами или изучите документацию.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card icon={<MessageCircle className="h-5 w-5" />} title="Чат" text="Ответ за 5 минут в рабочее время." action="Открыть" />
        <Card icon={<LifeBuoy className="h-5 w-5" />} title="Заявка" text="Опишите проблему — вернёмся с решением." action="Создать заявку" />
        <Card icon={<BookOpen className="h-5 w-5" />} title="Документация" text="Видеоуроки, инструкции и FAQ." action="Открыть docs" />
      </div>
      <SectionCard title="Частые вопросы">
        <ul className="space-y-3 text-sm">
          {[
            "Как подключить чеки ФНС?",
            "Можно ли работать без ИП?",
            "Как выставить счёт юридическому лицу?",
            "Какие комиссии при приёме оплаты?",
          ].map((q) => <li key={q} className="rounded-lg border border-border p-3">{q}</li>)}
        </ul>
      </SectionCard>
    </ModulePage>
  );
}

function Card({ icon, title, text, action }: { icon: React.ReactNode; title: string; text: string; action: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">{icon}</div>
      <div className="mt-3 font-display text-base font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      <Button variant="outline" size="sm" className="mt-4">{action}</Button>
    </div>
  );
}
