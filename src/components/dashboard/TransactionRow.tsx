import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_BADGE, DEFAULT_BADGE } from "@/lib/categoryColors";

interface TransactionRowProps {
  icon: LucideIcon;
  name: string;
  date: string;
  category: string;
  type: "inflow" | "outflow";
  amount: number;
}

export function TransactionRow({ icon: Icon, name, date, category, type, amount }: TransactionRowProps) {
  const badge = CATEGORY_BADGE[category] ?? DEFAULT_BADGE;

  return (
    <div className="group grid grid-cols-[28px_1fr_80px_88px] items-center gap-4 py-3 -mx-2 px-2 rounded-lg transition-colors duration-150 hover:bg-muted/40 cursor-default">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/60 group-hover:bg-secondary transition-colors duration-150">
        <Icon size={14} strokeWidth={1.5} className="text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <span className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-medium text-center",
        badge.bg, badge.text
      )}>
        {category}
      </span>
      <span className={cn(
        "text-sm font-semibold tabular-nums text-right",
        type === "inflow" ? "text-emerald-500" : "text-foreground"
      )}>
        {type === "inflow" ? "+" : "−"}€{amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </div>
  );
}
