import { useMemo, useState } from "react";
import { sankey, sankeyLinkHorizontal, sankeyLeft, type SankeyLink as D3SankeyLink, type SankeyNode as D3SankeyNode } from "d3-sankey";
import type { SankeyNode, SankeyLink } from "@/types";

type NodeDatum = { id: string; label: string; value: number; side: "source" | "target" };
type LinkDatum = object;
type SNode = D3SankeyNode<NodeDatum, LinkDatum>;
type SLink = D3SankeyLink<NodeDatum, LinkDatum>;

interface SankeyDiagramProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  width?: number;
  height?: number;
}

const CHART_COLORS = [
  "oklch(0.6500 0.1500 200)",
  "oklch(0.6000 0.1500 160)",
  "oklch(0.6500 0.1200 280)",
  "oklch(0.5500 0.1200 310)",
  "oklch(0.5800 0.1000 240)",
];
const GOLD = "oklch(0.7800 0.1300 80)";
const NODE_WIDTH = 12;
const NODE_PADDING = 14;

export function SankeyDiagram({ nodes: rawNodes, links: rawLinks, width = 600, height = 300 }: SankeyDiagramProps) {
  const [hoveredLinkIdx, setHoveredLinkIdx] = useState<number | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const { nodes, links } = useMemo(() => {
    const graphNodes: NodeDatum[] = rawNodes.filter((n) => n.value > 0).map((n) => ({ ...n }));
    const validIds = new Set(graphNodes.map((n) => n.id));
    const idIndex = Object.fromEntries(graphNodes.map((n, i) => [n.id, i]));
    const graphLinks = rawLinks
      .filter((l) => validIds.has(l.source) && validIds.has(l.target) && l.value > 0)
      .map((l) => ({ source: idIndex[l.source], target: idIndex[l.target], value: l.value }));

    const layout = sankey<NodeDatum, LinkDatum>()
      .nodeWidth(NODE_WIDTH)
      .nodePadding(NODE_PADDING)
      .nodeAlign(sankeyLeft)
      .extent([[120, 10], [width - 90, height - 10]]);

    return layout({ nodes: graphNodes, links: graphLinks });
  }, [rawNodes, rawLinks, width, height]);

  const isLinkRelatedToNode = (link: SLink, nodeId: string) => {
    const src = link.source as SNode;
    const tgt = link.target as SNode;
    return src.id === nodeId || tgt.id === nodeId;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" className="overflow-visible">
      {/* Links */}
      {links.map((link: SLink, i: number) => {
        const generator = sankeyLinkHorizontal<NodeDatum, LinkDatum>();
        const path = generator(link);
        const linkWidth = Math.max(1, link.width ?? 1);
        const isHovered = hoveredLinkIdx === i;
        const isNodeHovered = hoveredNodeId !== null && isLinkRelatedToNode(link, hoveredNodeId);
        const dimmed = (hoveredLinkIdx !== null && !isHovered) || (hoveredNodeId !== null && !isNodeHovered);
        return (
          <path
            key={i}
            d={path ?? ""}
            fill="none"
            stroke={isHovered || isNodeHovered ? GOLD : GOLD}
            strokeWidth={linkWidth}
            strokeOpacity={dimmed ? 0.05 : isHovered || isNodeHovered ? 0.45 : 0.15}
            style={{ transition: "stroke-opacity 0.15s ease", cursor: "pointer" }}
            onMouseEnter={() => setHoveredLinkIdx(i)}
            onMouseLeave={() => setHoveredLinkIdx(null)}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node: SNode) => {
        const x = node.x0 ?? 0;
        const y = node.y0 ?? 0;
        const w = (node.x1 ?? 0) - x;
        const h = (node.y1 ?? 0) - y;
        const isSource = node.side === "source";
        const isSavings = node.id === "savings";
        const targetIdx = nodes.filter((n) => n.side === "target").indexOf(node);
        const fill = isSource || isSavings ? GOLD : CHART_COLORS[targetIdx % CHART_COLORS.length];
        const isHovered = hoveredNodeId === node.id;
        const dimmed = hoveredNodeId !== null && !isHovered;
        const opacity = dimmed ? 0.25 : isHovered ? 1 : isSource || isSavings ? 0.85 : 0.7;

        return (
          <g
            key={node.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredNodeId(node.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
          >
            <rect
              x={x}
              y={y}
              width={w}
              height={Math.max(h, 4)}
              fill={fill}
              fillOpacity={opacity}
              rx={2}
              style={{ transition: "fill-opacity 0.15s ease" }}
            />
            {isSource ? (
              <text
                x={x - 6}
                y={y + h / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="oklch(0.7800 0.0400 270)"
                fillOpacity={dimmed ? 0.3 : 1}
                style={{ transition: "fill-opacity 0.15s ease" }}
              >
                {node.label}
              </text>
            ) : (
              <text
                x={x + w + 6}
                y={y + h / 2}
                textAnchor="start"
                dominantBaseline="middle"
                fontSize={11}
                fill="oklch(0.7800 0.0400 270)"
                fontWeight="400"
                fillOpacity={dimmed ? 0.3 : 1}
                style={{ transition: "fill-opacity 0.15s ease" }}
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
