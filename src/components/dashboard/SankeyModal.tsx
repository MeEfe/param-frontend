import { X } from "lucide-react";
import { SankeyDiagram } from "./SankeyDiagram";
import type { SankeyNode, SankeyLink } from "@/types";

interface SankeyModalProps {
  open: boolean;
  onClose: () => void;
  nodes: SankeyNode[];
  links: SankeyLink[];
  label: string;
}

export function SankeyModal({ open, onClose, nodes, links, label }: SankeyModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-[90vw] max-w-5xl rounded-2xl border border-border bg-card p-8 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Cash Flow</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
        <SankeyDiagram nodes={nodes} links={links} width={900} height={480} />
      </div>
    </div>
  );
}
