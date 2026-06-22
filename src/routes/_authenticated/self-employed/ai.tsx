import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/self-employed/ai")({
  head: () => ({ meta: [{ title: "AI — Самозанятый" }] }),
  component: Page,
});

const SUGGESTIONS = [
  "Подготовь акт по последнему заказу",
  "Напомни клиенту об оплате счёта №7",
  "Сформируй чек ФНС за неделю",
  "Сделай отчёт о доходах за май",
  "Предложи цены на новую услугу",
  "Найди клиента, который давно не заказывал",
];

function Page() {
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Привет! Я помогу с документами, отчётами, чеками ФНС и общением с клиентами. Что сделать?" },
  ]);
  const [text, setText] = useState("");
  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((p) => [...p, { role: "user", text: t }, { role: "ai", text: `Готовлю задачу: «${t}». Подключу к официальным API после соглашения.` }]);
    setText("");
  };
  return (
    <ModulePage title="AI-ассистент" description="Голосовые и текстовые сценарии для самозанятых.">
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <SectionCard title="Диалог">
          <div className="flex h-[460px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="mt-3 flex gap-2">
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Спросите что угодно…" />
              <Button type="submit"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </SectionCard>
        <SectionCard title="Подсказки">
          <ul className="space-y-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button onClick={() => send(s)} className="flex w-full items-start gap-2 rounded-lg border border-border p-2.5 text-left text-xs hover:bg-muted/40">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 text-accent" />
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
