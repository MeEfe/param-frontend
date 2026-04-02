import { StatCard } from "./StatCard";
import { statCards } from "@/data/mockData";

const CARD_ACCENTS = [
  { iconBg: "bg-emerald-500/12", iconColor: "text-emerald-500" }, // Monthly Income
  { iconBg: "bg-red-500/12",     iconColor: "text-red-400" },     // Expenses
  { iconBg: "bg-primary/12",     iconColor: "text-primary" },     // Savings Rate
  { iconBg: "bg-amber-500/12",   iconColor: "text-amber-500" },   // Upcoming Bills
];

export function StatCardGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <StatCard
          key={card.label}
          icon={card.icon}
          label={card.label}
          value={card.value}
          iconBg={CARD_ACCENTS[index].iconBg}
          iconColor={CARD_ACCENTS[index].iconColor}
        />
      ))}
    </div>
  );
}
