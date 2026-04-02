import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
}

export function StatCard({ icon: Icon, label, value, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:ring-1 hover:ring-border/80">
      <div className="mb-4">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconBg)}>
          <Icon size={15} strokeWidth={1.75} className={iconColor} />
        </div>
      </div>
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground">
        {label}
      </p>
      <p className="text-[26px] leading-none font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}
