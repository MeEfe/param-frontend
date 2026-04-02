import { TrendingUp, TrendingDown } from "lucide-react";
import { netWorth } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export function NetWorthHero() {
  const { currentMonth } = useApp();
  const isPositive = netWorth.change.startsWith("+");

  return (
    <div>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Net Worth · {currentMonth.label}
      </p>
      <p className="font-serif text-[44px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
        {netWorth.value}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-sm font-semibold tabular-nums ${isPositive ? "text-emerald-500" : "text-destructive"}`}>
          {isPositive
            ? <TrendingUp size={14} strokeWidth={2} />
            : <TrendingDown size={14} strokeWidth={2} />
          }
          {netWorth.change}
        </span>
        <span className="text-xs text-muted-foreground">{netWorth.changeLabel}</span>
      </div>

      {/* Assets / Liabilities inline */}
      <div className="mt-6 flex items-center gap-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Assets</p>
          <p className="mt-0.5 text-base font-semibold tabular-nums text-foreground">€31,200</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Liabilities</p>
          <p className="mt-0.5 text-base font-semibold tabular-nums text-destructive">−€6,350</p>
        </div>
      </div>
    </div>
  );
}
