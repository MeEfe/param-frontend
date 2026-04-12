import { statCards } from "@/data/mockData";

// green = inflow/positive, red = outflow/upcoming
const VALUE_COLORS = [
  "text-emerald-500",   // Monthly Income
  "text-red-400",       // Expenses
  "text-emerald-500",   // Savings Rate
  "text-red-400",       // Upcoming Bills
];

export function StatStrip() {
  return (
    <div className="space-y-4">
      {statCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon size={15} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
              <span className="text-[13px] text-muted-foreground">{card.label}</span>
            </div>
            <span className={`text-[13px] font-semibold tabular-nums ${VALUE_COLORS[i]}`}>
              {card.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
