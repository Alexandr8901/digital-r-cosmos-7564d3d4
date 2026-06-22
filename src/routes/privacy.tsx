import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHero } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности · ЦифроРубль" },
      { name: "description", content: "Политика обработки персональных данных пользователей ЦифроРубль." },
      { property: "og:title", content: "Политика конфиденциальности · ЦифроРубль" },
      { property: "og:description", content: "Как мы собираем, храним и защищаем данные." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <MarketingShell>
      <PageHero eyebrow="Политика" title="Политика конфиденциальности" />
      <article className="mx-auto max-w-3xl px-4 pb-16 prose-paragraph">
        <Section title="1. Общие положения">
          Настоящая политика определяет порядок обработки персональных данных пользователей платформы ЦифроРубль
          и соответствует требованиям Федерального закона № 152-ФЗ.
        </Section>
        <Section title="2. Какие данные мы обрабатываем">
          Email, телефон, имя, фамилия, дата рождения, IP-адрес, история операций, метаданные устройств.
          Данные используются исключительно для предоставления сервисов платформы.
        </Section>
        <Section title="3. Как мы храним и защищаем данные">
          Все данные хранятся в зашифрованном виде в российских дата-центрах. Применяется принцип
          минимально необходимых привилегий и непрерывный мониторинг доступа.
        </Section>
        <Section title="4. Передача данных третьим лицам">
          Мы не передаём данные третьим лицам, кроме случаев, предусмотренных законодательством,
          и не используем их для рекламных целей без явного согласия пользователя.
        </Section>
        <Section title="5. Ваши права">
          Вы можете запросить, изменить или удалить ваши данные в любое время через настройки аккаунта
          или обратившись в поддержку.
        </Section>
        <Section title="6. Контакты">
          По вопросам обработки данных: privacy@digitalruble.example
        </Section>
      </article>
    </MarketingShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 first:mt-0">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-muted-foreground">{children}</p>
    </div>
  );
}
