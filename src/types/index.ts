import type { LucideIcon } from "lucide-react";

export interface StatCardData {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface SankeyNode {
  id: string;
  label: string;
  value: number;
  side: "source" | "target";
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface BudgetItem {
  category: string;
  spent: number;
  total: number;
}

export interface Transaction {
  id: string;
  icon: LucideIcon;
  name: string;
  date: string;
  category: string;
  type: "inflow" | "outflow";
  amount: number;
}

export interface NavItemData {
  id: string;
  label: string;
  iconName: "LayoutDashboard" | "BarChart3" | "Briefcase" | "ArrowLeftRight" | "Target" | "Receipt";
}

export interface NetWorthData {
  value: string;
  change: string;
  changeLabel: string;
}

export interface MonthSnapshot {
  id: string;
  label: string;
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export type BillStatus = "paid" | "upcoming" | "pending" | "overdue";

export interface FixedBill {
  id: string;
  icon: LucideIcon;
  name: string;
  dueDate: string;
  amount: number;
  status: BillStatus;
  category: string;
}

export interface VariableBill {
  id: string;
  icon: LucideIcon;
  name: string;
  used: number;
  budget: number;
  category: string;
}

export interface FeatureFlag {
  enabled: boolean;
  label: string;
  description: string;
}

export type FeatureFlags = Record<string, FeatureFlag>;
