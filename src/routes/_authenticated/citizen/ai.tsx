import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/citizen/kit";

export const Route = createFileRoute("/_authenticated/citizen/ai")({
  head: () => ({ meta: [{ title: "AI · ЦифроРубль" }] }),
  component: AiPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  "Покажи мои расходы за месяц",
  "Сколько я потратил на транспорт",
  "Покажи самые большие платежи",
  "Подготовь выписку",
  "Найди платёж",
  "Напомни оплатить интернет",
  "Покажи подписки",
  "Проанализируй мои расходы",
];

function AiPage() {
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("citizen.ai.history") ?? "[]"); } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { localStorage.setItem("citizen.ai.history", JSON.stringify(messages)); } catch {}
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/citizen-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message ?? "Не удалось получить ответ." }]);
    } catch (e) {
      toast.error("Ошибка AI", { description: e instanceof Error ? e.message : String(e) });
      setMessages((prev) => [...prev, { role: "assistant", content: "Извините, не удалось обработать запрос. Попробуйте позже." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI помощник"
        description="Финансы, документы и налоги — спросите что угодно"
        action={
          messages.length ? (
            <Button variant="outline" onClick={() => setMessages([])}>Очистить</Button>
          ) : null
        }
      />

      <Card className="flex h-[60vh] flex-col overflow-hidden p-0">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl brand-deep text-on-brand">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-xl font-semibold">Чем помочь?</div>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                Спрашивайте о расходах, доходах, подписках, налогах и документах.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-xl border border-border bg-card px-4 py-2.5 text-left text-sm hover:border-primary/30 hover:bg-muted/30"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent-soft text-accent-foreground"
              }`}>
                {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Думаю…
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-border bg-background/60 p-4"
        >
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Напишите сообщение… (Enter — отправить)"
              className="max-h-32 min-h-[44px] resize-none"
              rows={1}
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
