import type { VariableBill } from "@/types";
import { cn } from "@/lib/utils";

function getBarColor(pct: number): string {
  if (pct > 100) return "oklch(0.6509 0.2199 25.04)";   // danger red
  if (pct > 90)  return "oklch(0.7200 0.1800 40)";       // caution orange
  if (pct > 70)  return "oklch(0.7800 0.1500 75)";       // warning amber
  return "oklch(0.7797 0.1299 79.58)";                    // brand/primary
}

function getAmountClass(pct: number): string {
  if (pct > 100) return "text-destructive";
  if (pct > 90)  return "text-orange-500";
  if (pct > 70)  return "text-amber-500";
  return "text-foreground";
}

export function VariableBillRow({ icon: Icon, name, used, budget }: VariableBill) {
  const rawPct = (used / budget) * 100;
  const pct = Math.min(rawPct, 100);
  const isOver = used > budget;

  return (
    <div className="group px-4 py-3 hover:bg-muted/40 transition-colors duration-150">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/60 group-hover:bg-secondary transition-colors duration-150">
          <Icon size={13} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground truncate">{name}</span>
          <div className="flex items-center gap-2 shrink-0">
            {isOver && (
              <span className="rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                +€{used - budget} over
              </span>
            )}
            <span className={cn("text-sm tabular-nums font-semibold", getAmountClass(rawPct))}>
              €{used}
            </span>
            <span className="text-xs text-muted-foreground/70 tabular-nums">/ €{budget}</span>
          </div>
        </div>
      </div>
      <div className="ml-10 space-y-1">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, backgroundColor: getBarColor(rawPct) }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-muted-foreground/50 tabular-nums">{Math.round(rawPct)}% used</span>
          <span className="text-[10px] text-muted-foreground/50 tabular-nums">
            {isOver ? "Budget exceeded" : `€${budget - used} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
}
