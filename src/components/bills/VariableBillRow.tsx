import type { VariableBill } from "@/types";
import { getBarColor } from "@/lib/budgetStatus";

export function VariableBillRow({ icon: Icon, name, used, budget }: VariableBill) {
  const rawPct = (used / budget) * 100;
  const pct = Math.min(rawPct, 100);

  return (
    <div className="group px-4 py-3 hover:bg-muted/40 transition-colors duration-150">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/60 group-hover:bg-secondary transition-colors duration-150">
          <Icon size={13} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground truncate">{name}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm tabular-nums font-semibold text-foreground">€{used}</span>
            <span className="text-xs text-muted-foreground/70 tabular-nums">/ €{budget}</span>
          </div>
        </div>
      </div>
      <div className="ml-10">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, backgroundColor: getBarColor(rawPct) }}
          />
        </div>
      </div>
    </div>
  );
}
