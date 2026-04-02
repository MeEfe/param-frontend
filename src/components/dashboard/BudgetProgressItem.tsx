import type { BudgetItem } from "@/types";
import { cn } from "@/lib/utils";

function getBudgetColor(pct: number): string {
  if (pct > 100) return "oklch(0.6509 0.2199 25.04)";    // danger red
  if (pct > 90)  return "oklch(0.7200 0.1800 40)";        // caution orange
  if (pct > 70)  return "oklch(0.7800 0.1500 75)";        // warning amber
  return "oklch(0.7797 0.1299 79.58)";                     // brand/primary (calm)
}

export function BudgetProgressItem({ category, spent, total }: BudgetItem) {
  const pct = Math.round((spent / total) * 100);
  const remaining = total - spent;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-foreground truncate">{category}</span>
          {pct > 100 && (
            <span className="shrink-0 rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
              Over
            </span>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className={cn(
            "text-sm tabular-nums font-semibold",
            pct > 100 ? "text-destructive" :
            pct > 90  ? "text-orange-500" :
            pct > 70  ? "text-amber-500" :
                        "text-foreground"
          )}>
            €{spent}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums"> / €{total}</span>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: getBudgetColor(pct) }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] text-muted-foreground/60 tabular-nums">{pct}%</span>
        <span className="text-[10px] text-muted-foreground/60 tabular-nums">
          {pct > 100 ? `€${Math.abs(remaining)} over` : `€${remaining} left`}
        </span>
      </div>
    </div>
  );
}
