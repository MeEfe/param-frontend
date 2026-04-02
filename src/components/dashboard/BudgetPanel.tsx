import { budgetItems } from "@/data/mockData";
import { cn } from "@/lib/utils";

function getBarColor(pct: number): string {
  if (pct > 100) return "oklch(0.6509 0.2199 25.04)";
  if (pct > 90)  return "oklch(0.7200 0.1800 40)";
  if (pct > 70)  return "oklch(0.7800 0.1500 75)";
  return "oklch(0.7797 0.1299 79.58)";
}

export function BudgetPanel() {
  return (
    <div>
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Budget
      </p>
      <div className="space-y-5">
        {budgetItems.map((item) => {
          const pct = Math.round((item.spent / item.total) * 100);
          const remaining = item.total - item.spent;
          const isOver = pct > 100;
          return (
            <div key={item.category}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-medium text-foreground">{item.category}</span>
                <span className={cn(
                  "text-[13px] tabular-nums font-semibold",
                  isOver ? "text-destructive" : pct > 90 ? "text-orange-500" : pct > 70 ? "text-amber-500" : "text-muted-foreground"
                )}>
                  {isOver ? `+€${Math.abs(remaining)} over` : `€${remaining} left`}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: getBarColor(pct) }}
                />
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-[10px] text-muted-foreground/50 tabular-nums">€{item.spent}</span>
                <span className="text-[10px] text-muted-foreground/50 tabular-nums">€{item.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
