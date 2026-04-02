import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApp } from "@/context/AppContext";
import { navItems } from "@/data/mockData";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function TopBar() {
  const { activeNav, monthIdx, setMonthIdx, currentMonth, canPrev, canNext } = useApp();
  const navLabel = navItems.find((n) => n.id === activeNav)?.label ?? "Dashboard";

  return (
    <div className="flex h-14 shrink-0 items-center justify-between px-8">
      {/* Page title */}
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {navLabel}
      </p>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Month pill navigator */}
        <div className="flex items-center gap-0.5 rounded-full border border-border px-1 py-1 bg-secondary/40">
          <button
            onClick={() => setMonthIdx(monthIdx + 1)}
            disabled={!canPrev}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all duration-150 hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft size={12} />
          </button>
          <span className="min-w-[68px] px-1 text-center text-[11px] font-semibold text-foreground tabular-nums">
            {currentMonth.label}
          </span>
          <button
            onClick={() => setMonthIdx(monthIdx - 1)}
            disabled={!canNext}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all duration-150 hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight size={12} />
          </button>
        </div>

        <ThemeSwitcher />

        <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell size={15} />
        </button>

        <button className="rounded-full ring-2 ring-transparent transition-all duration-150 hover:ring-primary/30">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary/20 text-[10px] font-bold text-primary">JD</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  );
}
