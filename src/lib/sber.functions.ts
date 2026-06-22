import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const InitInput = z.object({
  amount: z.number().positive().max(100_000_000), // в копейках
  orderNumber: z.string().min(1).max(64),
  description: z.string().max(512).optional(),
  returnUrl: z.string().url(),
  failUrl: z.string().url().optional(),
  email: z.string().email().optional(),
});

type SberRegisterResponse = {
  orderId?: string;
  formUrl?: string;
  errorCode?: string | number;
  errorMessage?: string;
};

/**
 * Регистрация заказа в Сбер «Моментальные платежи» (REST register.do).
 * Документация: https://securepayments.sberbank.ru/wiki/doku.php/integration:api:rest:start
 */
export const sberInitPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => InitInput.parse(data))
  .handler(async ({ data }) => {
    const username = process.env.SBER_API_USERNAME;
    const password = process.env.SBER_API_PASSWORD;
    const env = (process.env.SBER_API_ENV ?? "test").toLowerCase();

    if (!username || !password) {
      return {
        ok: false as const,
        error: "missing_credentials",
        message:
          "Не настроены учётные данные Сбер API. Добавьте SBER_API_USERNAME и SBER_API_PASSWORD.",
      };
    }

    const baseUrl =
      env === "prod" || env === "production"
        ? "https://securepayments.sberbank.ru/payment/rest"
        : "https://3dsec.sberbank.ru/payment/rest";

    const params = new URLSearchParams({
      userName: username,
      password,
      orderNumber: data.orderNumber,
      amount: String(data.amount),
      currency: "643",
      returnUrl: data.returnUrl,
      ...(data.failUrl ? { failUrl: data.failUrl } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.email ? { email: data.email } : {}),
    });

    try {
      const res = await fetch(`${baseUrl}/register.do`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const json = (await res.json()) as SberRegisterResponse;
      if (json.errorCode && String(json.errorCode) !== "0") {
        return {
          ok: false as const,
          error: "sber_error",
          message: json.errorMessage ?? `Sber errorCode ${json.errorCode}`,
        };
      }
      if (!json.orderId || !json.formUrl) {
        return { ok: false as const, error: "bad_response", message: "Некорректный ответ Сбербанка" };
      }
      return { ok: true as const, orderId: json.orderId, formUrl: json.formUrl, env };
    } catch (e) {
      return {
        ok: false as const,
        error: "network",
        message: e instanceof Error ? e.message : "Сетевая ошибка",
      };
    }
  });
