import { createFileRoute } from "@tanstack/react-router";
import {
  Home, Wallet, Users, Package, FileText, ReceiptText, QrCode, PieChart,
  Sparkles, Settings, LifeBuoy, CreditCard,
} from "lucide-react";
import { WorkspaceShell, type NavGroup, type NavItem } from "@/components/workspace/shell";

export const Route = createFileRoute("/_authenticated/self-employed")({
  component: SelfEmployedLayout,
});

const groups: NavGroup[] = [
  {
    label: "Бизнес",
    items: [
      { to: "/self-employed", label: "Главная", icon: Home, exact: true },
      { to: "/self-employed/income", label: "Доходы", icon: Wallet },
      { to: "/self-employed/clients", label: "Клиенты", icon: Users },
      { to: "/self-employed/services", label: "Услуги", icon: Package },
      { to: "/self-employed/invoices", label: "Счета", icon: ReceiptText },
      { to: "/self-employed/documents", label: "Документы", icon: FileText },
    ],
  },
  {
    label: "Операции",
    items: [
      { to: "/self-employed/payments", label: "Платежи", icon: CreditCard },
      { to: "/self-employed/qr", label: "QR", icon: QrCode },
      { to: "/self-employed/analytics", label: "Аналитика", icon: PieChart },
      { to: "/self-employed/ai", label: "AI", icon: Sparkles },
    ],
  },
];

const secondary: NavItem[] = [
  { to: "/self-employed/settings", label: "Настройки", icon: Settings },
  { to: "/self-employed/support", label: "Поддержка", icon: LifeBuoy },
];

function SelfEmployedLayout() {
  return <WorkspaceShell workspaceKind="self_employed" groups={groups} secondary={secondary} />;
}
