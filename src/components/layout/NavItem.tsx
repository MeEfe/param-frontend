import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-150",
        isActive
          ? "bg-primary/12 text-primary font-semibold"
          : "text-muted-foreground hover:bg-sidebar-accent/80 hover:text-foreground"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-primary" />
      )}
      <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
      <span>{label}</span>
    </button>
  );
}
