import { TrendingUp } from "lucide-react";
import { netWorth } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export function NetWorthCard() {
  const { currentMonth } = useApp();

  return (
    <div className="rounded-2xl border border-border bg-card px-8 py-6">
      <div className="flex items-start justify-between gap-8">
        {/* Left: primary net worth */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Net Worth
            </p>
            <span className="text-[11px] text-muted-foreground/50">·</span>
            <span className="text-[11px] text-muted-foreground/60">{currentMonth.label}</span>
          </div>
          <p className="font-serif text-[52px] leading-none font-semibold text-foreground tabular-nums">
            {netWorth.value}
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-500">
              <TrendingUp size={11} strokeWidth={2.5} />
              {netWorth.change}
            </span>
            <span className="text-xs text-muted-foreground">{netWorth.changeLabel}</span>
          </div>
        </div>

        {/* Right: assets/liabilities breakdown */}
        <div className="flex items-center gap-6 self-center">
          <div className="h-12 w-px bg-border" />
          <div className="space-y-1 text-right">
            <p className="text-[11px] uppercase tracking-[0.07em] text-muted-foreground">Assets</p>
            <p className="text-lg font-semibold tabular-nums text-foreground">€31,200</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="space-y-1 text-right">
            <p className="text-[11px] uppercase tracking-[0.07em] text-muted-foreground">Liabilities</p>
            <p className="text-lg font-semibold tabular-nums text-destructive">−€6,350</p>
          </div>
        </div>
      </div>
    </div>
  );
}
