import { useState } from "react";
import { transactions } from "@/data/mockData";
import { CATEGORY_BADGE, DEFAULT_BADGE } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

type Filter = "all" | "inflow" | "outflow";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "inflow", label: "Income" },
  { id: "outflow", label: "Expenses" },
];

export function TransactionPanel() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = transactions.filter((t: Transaction) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <div className="flex flex-col px-8 py-5" style={{ maxHeight: "calc(100% - 0px)" }}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Recent Transactions
        </p>
        <div className="flex gap-0.5 rounded-lg border border-border/50 bg-secondary/40 p-0.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-150",
                filter === f.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-1 overflow-y-auto">
        {filtered.map((t: Transaction) => {
          const badge = CATEGORY_BADGE[t.category] ?? DEFAULT_BADGE;
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="group flex items-center gap-4 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-secondary/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary group-hover:bg-muted transition-colors duration-150">
                <Icon size={14} strokeWidth={1.5} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.date}</p>
              </div>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", badge.bg, badge.text)}>
                {t.category}
              </span>
              <span className={cn(
                "shrink-0 min-w-[72px] text-right text-[13px] font-semibold tabular-nums",
                t.type === "inflow" ? "text-emerald-500" : "text-foreground"
              )}>
                {t.type === "inflow" ? "+" : "−"}€{t.amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
