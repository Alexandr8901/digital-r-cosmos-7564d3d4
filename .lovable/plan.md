# ЦифроРубль — Итерация 1: Фундамент

Строим базу, на которой потом нарастут все 8 частей ТЗ. В этой итерации — лендинг, дизайн-система, авторизация, онбординг, выбор роли. Кабинеты (Гражданин, Самозанятый, ИП, ООО, Разработчик), Финансы, CRM/ERP, Developer Platform, Marketplace, Admin — следующими итерациями, каждая отдельным запросом, чтобы каждый блок был production-quality, а не заглушкой.

## Стек

- TanStack Start + React 19 + TypeScript + Tailwind v4 + shadcn/ui + Framer Motion
- Lovable Cloud (Supabase под капотом) — auth, БД, профили, роли
- Стек ТЗ (Next.js/NestJS/PostgreSQL/Redis) заменён на стек шаблона Lovable; функционально эквивалентно, готово к масштабированию.

## Дизайн-система

Палитра (semantic tokens в `src/styles.css`, OKLCH):
- `--primary` — глубокий синий `oklch(0.32 0.13 258)` (близко к #1e2a78)
- `--accent` — бирюзовый `oklch(0.72 0.13 195)` (≈ #2dd4bf)
- `--success` зелёный, `--destructive` красный, `--warning` оранжевый
- Полноценная тёмная тема (не инверсия): тёмно-синий фон `oklch(0.18 0.04 258)`, не чёрный
- Glass-поверхности через `backdrop-blur` + `color-mix`
- Градиенты: `--gradient-primary`, тени: `--shadow-elegant`

Типографика: Inter Tight (заголовки) + Inter (body) через `@fontsource`. Крупные H1 (clamp 48–88px), чёткая шкала.

Базовые компоненты (на shadcn): Button (variants: default/primary/accent/ghost/glass), Card, Input с маской и валидацией, Select, Dropdown, Modal/Dialog, Tooltip, Badge, Tabs, Table, Skeleton, EmptyState, ErrorState, SuccessState, Breadcrumb, ThemeToggle, LangSwitch (RU фиксирован, архитектурно готов к добавлению).

Структура: `src/components/ui/*` (shadcn), `src/components/marketing/*` (лендинг), `src/components/app/*` (общее для кабинетов), `src/features/*` (по модулям), `src/lib/*`.

## Маршруты (TanStack Router, файловое)

Публичные:
- `/` — лендинг
- `/features`, `/for-citizens`, `/for-business`, `/for-developers`, `/api`, `/docs`, `/pricing` — отдельные роуты с собственным `head()` (SEO)
- `/auth` — единая страница: табы Войти / Регистрация / Восстановление
- `/auth/reset-password` — установка нового пароля

Защищённые (`_authenticated/` слой управляется интеграцией):
- `/onboarding` — слайды + выбор роли
- `/app` — редирект на дашборд активной роли (в этой итерации — заглушечный «Добро пожаловать в кабинет», с честным состоянием «модуль готовится», т.к. кабинеты делаются следующими итерациями; **это единственное место, где допустим placeholder, и он будет красиво оформлен как welcome-экран, а не «в разработке»**)

## Лендинг (`/`)

Один длинный SSR-роут с секциями:
1. **Header** sticky, glass: лого, навигация, Войти/Регистрация, ThemeToggle
2. **Hero**: заголовок «ЦифроРубль», подзаголовок «Единая финансовая экосистема России», 2 CTA, справа — анимированный мокап интерфейса (карточки баланса/операций, Framer Motion stagger)
3. **Преимущества** — 8 карточек с иконками lucide (Безопасность, Скорость, Единый аккаунт, API, Интеграции, AI, Мобильное приложение, Официальные подключения)
4. **Возможности по ролям** — 5 интерактивных табов (Гражданин/Самозанятый/ИП/ООО/Разработчик), при выборе — список фич + превью-карточки
5. **Developer Platform** — код-сниппет с подсветкой, список SDK
6. **AI** — карточка чата с примерами запросов («Оплати интернет», «Покажи расходы»…)
7. **Интеграции** — сетка логотипов с статусами «Доступно / В разработке / После подключения официального API»
8. **CTA-блок**
9. **Footer**

Анимации: Framer Motion (fade-up на скролле, parallax hero, hover на карточках). Без перегруза.

## Авторизация

Lovable Cloud Auth:
- Email + пароль (включая HIBP-проверку пароля)
- Google OAuth через `lovable.auth.signInWithOAuth('google')` + `configure_social_auth`
- Восстановление пароля (resetPasswordForEmail → `/auth/reset-password`)

Архитектурно подготовлено (UI + точки расширения, но без реализации):
- Телефон/SMS, Passkey, 2FA, управление устройствами/сессиями, история входов — отдельные карточки в Профиле со статусом «Скоро», без фейковой работы.

Регистрация — мастер с прогресс-баром (5 шагов из ТЗ): credentials → подтверждение (UI; реальная отправка SMS — после официальной интеграции) → ФИО+ДР → выбор роли → финал с анимацией. Все формы: react-hook-form + zod, маски (телефон), автосохранение черновика в sessionStorage.

## БД (Lovable Cloud / Supabase)

Таблицы public-схемы (с GRANT и RLS по гайдлайнам):

- `profiles` (id → auth.users, first_name, last_name, birth_date, phone, avatar_url, locale, theme, active_role, created_at)
- `user_roles` (id, user_id, role app_role, created_at, UNIQUE(user_id,role)) — **enum** `app_role`: `citizen | self_employed | sole_proprietor | llc | developer | admin`. Отдельная таблица — обязательно, без хранения роли в profiles.
- `has_role(_user_id, _role)` — SECURITY DEFINER функция
- Триггер `handle_new_user` создаёт `profiles` + дефолтную роль `citizen` после signup

RLS: пользователь видит/правит только свой профиль и свои роли; админ — через `has_role`.

## Онбординг

После signup → `/onboarding`:
- 4 слайда (Framer Motion): Добро пожаловать → Один аккаунт → Безопасность → AI и Финансы
- Финальный шаг: выбор активной роли (5 карточек) → запись в `profiles.active_role` + `user_roles`
- Кнопка «Пропустить» в шапке

## Темы и i18n

- next-themes-style провайдер на TanStack: класс `.dark` на `<html>`, переключатель в header и в профиле, сохранение в `localStorage` + `profiles.theme`
- i18n: словарь RU в `src/lib/i18n/ru.ts`, хук `useT()`. Архитектурно готово к добавлению других языков, но в первой итерации только русский.

## SEO

Каждый публичный роут имеет свой `head()`: уникальные `title`, `description`, `og:title`, `og:description`. На лендинге — `og:image` (сгенерируем). На `__root.tsx` — только глобальное (favicon, viewport, theme-color).

## Технические детали

- Шрифты через `@fontsource/inter` и `@fontsource/inter-tight`, импорт в `src/main.tsx`, регистрация в `@theme` `src/styles.css`
- Все цвета через семантические токены, никаких `bg-blue-500` в компонентах
- Framer Motion для микро-анимаций; для hero — `motion.div` + `useScroll`
- Иллюстрация для hero и og:image — сгенерируем через imagegen (премиум для og:image с текстом)
- Доступность: фокус-стили, ARIA, контраст AA, навигация с клавиатуры

## Что НЕ входит в эту итерацию

(Делается следующими запросами «дальше», каждый — production-quality.)
- Кабинет Гражданина (Dashboard, Кошелёк, Платежи, QR, Аналитика, Подписки, Документы, AI-чат)
- Кабинеты Самозанятого / ИП / ООО
- Раздел Финансы и Цифровой рубль
- CRM / ERP / Склад / Бухгалтерия / BI
- Developer Platform / API Explorer / Sandbox / Webhooks
- Marketplace / Партнёрский кабинет / Конструктор автоматизации
- Admin / Security Center / Monitoring / Compliance

После одобрения этого плана буду включать Lovable Cloud, генерировать иллюстрации, ставить шрифты и собирать всё перечисленное.
