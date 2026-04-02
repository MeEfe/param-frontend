import { statCards } from "@/data/mockData";

const COLORS = [
  "text-emerald-500",
  "text-red-400",
  "text-primary",
  "text-amber-500",
];

export function StatStrip() {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        This Month
      </p>
      {statCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon size={15} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
              <span className="text-[13px] text-muted-foreground">{card.label}</span>
            </div>
            <span className={`text-[13px] font-semibold tabular-nums ${COLORS[i]}`}>
              {card.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
