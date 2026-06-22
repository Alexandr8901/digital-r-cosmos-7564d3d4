import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/ip/ai")({
  head: () => ({ meta: [{ title: "AI — ИП" }] }),
  component: Page,
});

const SUGGESTIONS = [
  "Сформируй отчёт по продажам за май",
  "Найди клиентов с просроченной оплатой",
  "Подскажи, что закупить в первую очередь",
  "Составь воронку продаж по неделям",
  "Подготовь шаблон акта выполненных работ",
  "Сравни маржу по категориям",
];

function Page() {
  const [msgs, setMsgs] = useState([{ role: "ai", text: "Я — бизнес-ассистент. Помогу с отчётами, продажами, документами и закупками." }]);
  const [text, setText] = useState("");
  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((p) => [...p, { role: "user", text: t }, { role: "ai", text: `Беру задачу: «${t}». Подготовлю и пришлю в чат.` }]);
    setText("");
  };
  return (
    <ModulePage title="AI-ассистент" description="Бизнес-аналитика, отчёты и помощь с операциями.">
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <SectionCard title="Диалог">
          <div className="flex h-[460px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="mt-3 flex gap-2">
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Спросите про продажи, склад, клиентов…" />
              <Button type="submit"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </SectionCard>
        <SectionCard title="Подсказки">
          <ul className="space-y-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}><button onClick={() => send(s)} className="flex w-full items-start gap-2 rounded-lg border border-border p-2.5 text-left text-xs hover:bg-muted/40"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-accent" />{s}</button></li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
