import { NetWorthHero } from "./NetWorthHero";
import { StatStrip } from "./StatStrip";
import { BudgetPanel } from "./BudgetPanel";
import { CashFlowPanel } from "./CashFlowPanel";
import { TransactionPanel } from "./TransactionPanel";

export function DashboardView() {
  return (
    <div className="flex h-full min-h-0">
      {/* Left column — identity & summary */}
      <div className="flex w-[340px] shrink-0 flex-col border-r border-border px-8 py-8 overflow-y-auto">
        <NetWorthHero />
        <div className="my-7 h-px bg-border" />
        <StatStrip />
        <div className="my-7 h-px bg-border" />
        <BudgetPanel />
      </div>

      {/* Right column — visualization & activity */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <CashFlowPanel />
        <div className="h-px bg-border shrink-0" />
        <TransactionPanel />
      </div>
    </div>
  );
}
