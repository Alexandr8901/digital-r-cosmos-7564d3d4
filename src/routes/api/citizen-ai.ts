import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Вы — финансовый ассистент платформы ЦифроРубль (digital ruble экосистема России).
Помогаете гражданину с личными финансами, платежами, налогами, документами и подписками.
Отвечайте кратко, на русском языке, по делу. Если данных недостаточно — спросите уточняющий вопрос.
Не выдумывайте реальные банковские интеграции — все цифры в демо-режиме.`;

export const Route = createFileRoute("/api/citizen-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response(JSON.stringify({ message: "AI временно недоступен (нет ключа)." }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }
        const body = (await request.json()) as { messages?: { role: "user" | "assistant"; content: string }[] };
        const messages = body.messages ?? [];

        try {
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
              ],
              temperature: 0.4,
            }),
          });

          if (!res.ok) {
            const text = await res.text().catch(() => "");
            return new Response(
              JSON.stringify({ message: `AI ошибка: ${res.status}. ${text.slice(0, 200)}` }),
              { status: 200, headers: { "content-type": "application/json" } },
            );
          }

          const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
          const message = data.choices?.[0]?.message?.content ?? "Не удалось получить ответ.";
          return new Response(JSON.stringify({ message }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({ message: `Ошибка соединения с AI: ${e instanceof Error ? e.message : String(e)}` }),
            { status: 200, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
