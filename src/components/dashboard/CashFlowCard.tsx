import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { SankeyDiagram } from "./SankeyDiagram";
import { SankeyModal } from "./SankeyModal";
import { useApp } from "@/context/AppContext";

export function CashFlowCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentMonth } = useApp();

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-5 overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-foreground">Cash Flow</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">Income → Allocation</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-all duration-150 hover:border-border hover:bg-secondary hover:text-foreground"
            title="Expand diagram"
          >
            <Maximize2 size={12} />
            <span>Expand</span>
          </button>
        </div>
        <SankeyDiagram nodes={currentMonth.nodes} links={currentMonth.links} />
      </div>

      <SankeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        nodes={currentMonth.nodes}
        links={currentMonth.links}
        label={currentMonth.label}
      />
    </>
  );
}
