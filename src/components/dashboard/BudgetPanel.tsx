import { useApp } from '@/context/AppContext';
import { budgetItems } from "@/data/mockData";
import { getBarColor } from "@/lib/budgetStatus";
import { ArrowRight } from 'lucide-react';

export function BudgetPanel() {
  const { setActiveNav } = useApp();

  return (
    <div>
      <button
        className="mb-5 flex items-center gap-2 cursor-pointer group"
        onClick={() => setActiveNav("budgets")}
        aria-label="Go to budgets"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground transition-colors duration-150">
          Budget
        </p>
        <ArrowRight size={13} className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-150" />
      </button>
      <div className="space-y-5">
        {budgetItems.map((item) => {
          const pct = Math.round((item.spent / item.total) * 100);
          return (
            <div key={item.category}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-medium text-foreground">{item.category}</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: getBarColor(pct) }}
                />
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-[10px] text-muted-foreground/50 tabular-nums">€{item.spent}</span>
                <span className="text-[10px] text-muted-foreground/50 tabular-nums">€{item.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
