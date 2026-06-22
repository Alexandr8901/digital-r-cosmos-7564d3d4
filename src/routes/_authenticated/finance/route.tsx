import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, Bell, Bookmark, Building2, Calendar, Coins, CreditCard, Download, FileText, History, Home, Landmark, QrCode, Repeat, ShieldCheck, Smartphone, Sparkles, Users, Wallet } from "lucide-react";
import { PlatformShell, type PlatformNavGroup } from "@/components/platform/shell";

export const Route = createFileRoute("/_authenticated/finance")({
  component: Layout,
});

const GROUPS: PlatformNavGroup[] = [
  { label: "Главное", items: [
      { to: "/finance", label: "Обзор", icon: Home, exact: true },
      { to: "/finance/payments", label: "Платежи", icon: CreditCard },
      { to: "/finance/pay", label: "Оплатить", icon: Sparkles },
      { to: "/finance/transfers", label: "Переводы", icon: ArrowLeftRight },
      { to: "/finance/digital-ruble", label: "Цифровой рубль", icon: Coins },
      { to: "/finance/qr", label: "QR", icon: QrCode },
      { to: "/finance/sbp", label: "СБП", icon: Smartphone },
      { to: "/finance/bank-accounts", label: "Банковские счета", icon: Landmark }
    ] },
  { label: "Операции", items: [
      { to: "/finance/history", label: "История", icon: History },
      { to: "/finance/templates", label: "Шаблоны", icon: Bookmark },
      { to: "/finance/autopayments", label: "Автоплатежи", icon: Repeat },
      { to: "/finance/recipients", label: "Получатели", icon: Users },
      { to: "/finance/requisites", label: "Реквизиты", icon: FileText }
    ] },
  { label: "Документы", items: [
      { to: "/finance/documents", label: "Документы", icon: FileText },
      { to: "/finance/counterparties", label: "Контрагенты", icon: Building2 },
      { to: "/finance/calendar", label: "Календарь", icon: Calendar }
    ] },
  { label: "Инструменты", items: [
      { to: "/finance/ai", label: "AI", icon: Sparkles },
      { to: "/finance/export", label: "Экспорт", icon: Download },
      { to: "/finance/security", label: "Безопасность", icon: ShieldCheck },
      { to: "/finance/notifications", label: "Уведомления", icon: Bell }
    ] }
];

function Layout() {
  return <PlatformShell area="Финансы" areaIcon={Wallet} groups={GROUPS} searchPlaceholder="Поиск по разделу «Финансы»…" />;
}
