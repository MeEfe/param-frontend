import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionRow } from "./TransactionRow";
import { transactions } from "@/data/mockData";
import type { Transaction } from "@/types";

type Filter = "all" | "outflow" | "inflow";

export function TransactionLedger() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = transactions.filter((t: Transaction) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-foreground">Transactions</h2>
        <div className="flex items-center gap-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="h-7 bg-secondary/60 border border-border/40 p-0.5 gap-0.5">
              <TabsTrigger
                value="all"
                className="cursor-pointer text-xs px-3 h-6 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="outflow"
                className="cursor-pointer text-xs px-3 h-6 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
              >
                Outflow
              </TabsTrigger>
              <TabsTrigger
                value="inflow"
                className="cursor-pointer text-xs px-3 h-6 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
              >
                Inflow
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Column headers */}
      <div className="mb-1 grid grid-cols-[28px_1fr_80px_88px] gap-4 px-2 pb-2 border-b border-border/60">
        <div />
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/60">Description</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/60">Category</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/60 text-right">Amount</p>
      </div>

      <div>
        {filtered.map((t: Transaction) => (
          <TransactionRow key={t.id} {...t} />
        ))}
      </div>
      <div className="mt-3 border-t border-border pt-3 text-center">
        <button className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-primary transition-all duration-150 hover:text-primary/80">
          See All Transactions
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}
