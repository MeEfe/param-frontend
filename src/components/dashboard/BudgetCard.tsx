import { BudgetProgressItem } from "./BudgetProgressItem";
import { budgetItems } from "@/data/mockData";

export function BudgetCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-foreground">Budget</h2>
        <span className="text-[11px] text-muted-foreground">This month</span>
      </div>
      <div className="space-y-4">
        {budgetItems.map((item) => (
          <BudgetProgressItem key={item.category} {...item} />
        ))}
      </div>
    </div>
  );
}
