import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BillsPieChart } from "./BillsPieChart";
import { FixedBillRow } from "./FixedBillRow";
import { VariableBillRow } from "./VariableBillRow";
import { fixedBills, variableBills } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { BillStatus } from "@/types";

type Tab = "fixed" | "variable";

const FIXED_COLORS: Record<string, string> = {
  Housing:       "oklch(0.7800 0.1300 80)",
  Utilities:     "oklch(0.6500 0.1500 200)",
  Insurance:     "oklch(0.6000 0.1400 260)",
  Subscriptions: "oklch(0.6500 0.1500 160)",
  Transport:     "oklch(0.6800 0.1600 40)",
  Health:        "oklch(0.6500 0.1600 330)",
  Education:     "oklch(0.6000 0.1200 290)",
};

const VARIABLE_COLORS: Record<string, string> = {
  Food:      "oklch(0.7200 0.1400 95)",
  Transport: "oklch(0.6200 0.1400 55)",
  Work:      "oklch(0.5800 0.1300 215)",
  Health:    "oklch(0.5800 0.1400 345)",
  Leisure:   "oklch(0.5500 0.1300 175)",
  Personal:  "oklch(0.5500 0.1100 305)",
  Housing:   "oklch(0.5800 0.1300 275)",
  Education: "oklch(0.5200 0.1100 325)",
};

function buildSlices(tab: Tab) {
  if (tab === "fixed") {
    const map: Record<string, number> = {};
    fixedBills.forEach((b) => { map[b.category] = (map[b.category] ?? 0) + b.amount; });
    return Object.entries(map).map(([label, value]) => ({
      label, value, color: FIXED_COLORS[label] ?? "oklch(0.5500 0.1000 270)",
    }));
  } else {
    const map: Record<string, number> = {};
    variableBills.forEach((b) => { map[b.category] = (map[b.category] ?? 0) + b.used; });
    return Object.entries(map).map(([label, value]) => ({
      label, value, color: VARIABLE_COLORS[label] ?? "oklch(0.5500 0.1000 270)",
    }));
  }
}

const STATUS_ORDER: BillStatus[] = ["overdue", "upcoming", "pending", "paid"];
const STATUS_LABEL: Record<BillStatus, string> = {
  overdue: "Overdue",
  upcoming: "Upcoming",
  pending: "Pending",
  paid: "Paid",
};

const paidCount = fixedBills.filter((b) => b.status === "paid").length;
const overdueCount = fixedBills.filter((b) => b.status === "overdue").length;
const upcomingCount = fixedBills.filter((b) => b.status === "upcoming").length;
const overBudgetCount = variableBills.filter((b) => b.used > b.budget).length;

export function BillsView() {
  const [tab, setTab] = useState<Tab>("fixed");
  const slices = buildSlices(tab);
  const total = tab === "fixed"
    ? fixedBills.reduce((s, b) => s + b.amount, 0)
    : variableBills.reduce((s, b) => s + b.used, 0);

  return (
    <div className="flex h-full min-h-0">
      {/* Left pane — summary */}
      <div className="flex w-[300px] shrink-0 flex-col border-r border-border px-7 py-7 overflow-y-auto">
        {/* Status summary */}
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Overview
        </p>
        <div className="space-y-2 mb-6">
          {overdueCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-destructive font-medium">Overdue</span>
              <span className="text-[12px] font-semibold tabular-nums text-destructive">{overdueCount}</span>
            </div>
          )}
          {upcomingCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-amber-500 font-medium">Upcoming</span>
              <span className="text-[12px] font-semibold tabular-nums text-amber-500">{upcomingCount}</span>
            </div>
          )}
          {overBudgetCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-destructive font-medium">Over budget</span>
              <span className="text-[12px] font-semibold tabular-nums text-destructive">{overBudgetCount}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-muted-foreground">Paid</span>
            <span className="text-[12px] font-semibold tabular-nums text-emerald-500">{paidCount}</span>
          </div>
        </div>

        <div className="h-px bg-border mb-6" />

        {/* Tab toggle */}
        <div className="mb-5 flex gap-1 rounded-lg border border-border/50 bg-secondary/40 p-0.5">
          {(["fixed", "variable"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 cursor-pointer rounded-md py-1.5 text-[11px] font-medium capitalize transition-all duration-150",
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Donut */}
        <div className="flex justify-center mb-4">
          <BillsPieChart slices={slices} />
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {slices.map((sl) => (
            <div key={sl.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: sl.color }} />
                <span className="text-[11px] text-muted-foreground truncate">{sl.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-muted-foreground/50 tabular-nums">
                  {Math.round((sl.value / total) * 100)}%
                </span>
                <span className="text-[12px] font-semibold tabular-nums text-foreground">
                  €{sl.value.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[11px] text-muted-foreground uppercase tracking-[0.08em] font-medium">Total</span>
          <span className="text-[15px] font-semibold tabular-nums text-foreground">
            €{total.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Right pane — bill list */}
      <div className="flex flex-1 flex-col overflow-hidden px-6 py-7">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground shrink-0">
          {tab === "fixed" ? "Fixed Bills" : "Variable Spending"}
        </p>
        <ScrollArea className="flex-1">
          {tab === "fixed" && (
            <div className="space-y-5 pr-3">
              {STATUS_ORDER.map((status) => {
                const group = fixedBills.filter((b) => b.status === status);
                if (group.length === 0) return null;
                return (
                  <div key={status}>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
                        {STATUS_LABEL[status]}
                      </span>
                      <div className="h-px flex-1 bg-border/50" />
                    </div>
                    <div className="space-y-px rounded-xl overflow-hidden border border-border">
                      {group.map((b, i) => (
                        <div key={b.id} className={cn(i > 0 && "border-t border-border/60")}>
                          <FixedBillRow {...b} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab === "variable" && (
            <div className="rounded-xl overflow-hidden border border-border pr-3">
              {variableBills.map((b, i) => (
                <div key={b.id} className={cn(i > 0 && "border-t border-border/60")}>
                  <VariableBillRow {...b} />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
