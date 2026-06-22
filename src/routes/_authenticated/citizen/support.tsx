import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Book, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/citizen/kit";

export const Route = createFileRoute("/_authenticated/citizen/support")({
  head: () => ({ meta: [{ title: "Поддержка · ЦифроРубль" }] }),
  component: SupportPage,
});

const FAQ = [
  { q: "Как подключить цифровой рубль?", a: "Подключение станет доступно после интеграции с официальным API Банка России." },
  { q: "Как настроить автоплатёж?", a: "Перейдите в раздел Платежи → выберите услугу → включите регулярную оплату." },
  { q: "Как экспортировать историю операций?", a: "В разделе История нажмите «Экспорт CSV» — файл скачается мгновенно." },
  { q: "Что делать при подозрительной операции?", a: "Заблокируйте счёт в разделе Кошелёк и обратитесь в поддержку 24/7." },
];

function SupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Поддержка" description="Мы рядом 24/7" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: MessageSquare, title: "Чат", desc: "Ответ за 2 минуты" },
          { Icon: Phone, title: "8 800 000-00-00", desc: "Круглосуточно" },
          { Icon: Mail, title: "Email", desc: "support@digitalruble.example" },
          { Icon: Book, title: "База знаний", desc: "Гайды и ответы" },
        ].map((c) => (
          <Card key={c.title} className="p-5">
            <c.Icon className="h-5 w-5 text-accent-foreground" />
            <div className="mt-3 font-medium">{c.title}</div>
            <div className="text-xs text-muted-foreground">{c.desc}</div>
          </Card>
        ))}
      </div>

      <SectionCard title="Часто задаваемые вопросы">
        <div className="divide-y divide-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4 first:pt-0 last:pb-0">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                {f.q}
                <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
