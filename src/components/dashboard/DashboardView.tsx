import { useApp } from "@/context/AppContext";
import { NetWorthHero } from "./NetWorthHero";
import { StatStrip } from "./StatStrip";
import { BudgetPanel } from "./BudgetPanel";
import { CashFlowPanel } from "./CashFlowPanel";
import { TransactionPanel } from "./TransactionPanel";

export function DashboardView() {
  const { featureFlags } = useApp();

  return (
    <div className="flex h-full min-h-0 flex-col">
      {featureFlags.trading?.enabled && (
        <div className="shrink-0 border-b border-border px-8 py-4">
          <NetWorthHero />
        </div>
      )}

      {/* Main content — two columns */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left widget column */}
        <div className="flex w-[280px] shrink-0 flex-col gap-0 border-r border-border overflow-y-auto">
          <div className="px-6 py-5 border-b border-border/60">
            <StatStrip />
          </div>
          <div className="px-6 py-5">
            <BudgetPanel />
          </div>
        </div>

        {/* Right — visualization & activity */}
        <div className="flex flex-1 flex-col overflow-hidden min-h-0">
          <CashFlowPanel />
          <div className="h-px bg-border shrink-0" />
          <TransactionPanel />
        </div>
      </div>
    </div>
  );
}
