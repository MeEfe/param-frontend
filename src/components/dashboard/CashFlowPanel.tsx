import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { SankeyDiagram } from "./SankeyDiagram";
import { useApp } from "@/context/AppContext";

export function CashFlowPanel() {
  const [expanded, setExpanded] = useState(false);
  const { currentMonth } = useApp();

  return (
    <>
      <div className="flex flex-1 flex-col overflow-hidden px-8 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Cash Flow
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground/60">Income allocation · {currentMonth.label}</p>
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-all duration-150 hover:border-border hover:bg-secondary hover:text-foreground"
          >
            <Maximize2 size={11} />
            Expand
          </button>
        </div>
        <div className="flex-1 min-h-0">
          <SankeyDiagram nodes={currentMonth.nodes} links={currentMonth.links} height={220} />
        </div>
      </div>

      {/* Fullscreen modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[2px]"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-[90vw] max-w-5xl rounded-2xl border border-border bg-card p-8 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Cash Flow</p>
                <p className="mt-0.5 text-lg font-semibold text-foreground">{currentMonth.label}</p>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
              >
                <X size={15} />
              </button>
            </div>
            <SankeyDiagram nodes={currentMonth.nodes} links={currentMonth.links} width={900} height={480} />
          </div>
        </div>
      )}
    </>
  );
}
