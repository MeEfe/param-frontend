import { TrendingUp, TrendingDown } from "lucide-react";
import { netWorth } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export function NetWorthHero() {
  const { currentMonth } = useApp();
  const isPositive = netWorth.change.startsWith("+");

  return (
    <div className="flex items-center gap-8">
      {/* Net worth */}
      <div className="flex items-baseline gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 self-center">
          Net Worth
        </p>
        <p className="font-serif text-[28px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
          {netWorth.value}
        </p>
        <span className={`inline-flex items-center gap-1 text-[12px] font-semibold tabular-nums ${isPositive ? "text-emerald-500" : "text-destructive"}`}>
          {isPositive ? <TrendingUp size={12} strokeWidth={2} /> : <TrendingDown size={12} strokeWidth={2} />}
          {netWorth.change}
        </span>
        <span className="text-[11px] text-muted-foreground/60">{netWorth.changeLabel}</span>
      </div>

      <div className="h-6 w-px bg-border shrink-0" />

      {/* Assets */}
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/60">Assets</span>
        <span className="text-[14px] font-semibold tabular-nums text-foreground">€31,200</span>
      </div>

      {/* Liabilities */}
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/60">Liabilities</span>
        <span className="text-[14px] font-semibold tabular-nums text-destructive">−€6,350</span>
      </div>

      <div className="ml-auto text-[11px] text-muted-foreground/50 font-medium">
        {currentMonth.label}
      </div>
    </div>
  );
}
