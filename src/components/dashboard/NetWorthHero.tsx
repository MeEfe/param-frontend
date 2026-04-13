import { TrendingUp, TrendingDown } from "lucide-react";
import { netWorth } from "@/data/mockData";

export function NetWorthHero() {
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
      </div>
    </div>
  );
}
