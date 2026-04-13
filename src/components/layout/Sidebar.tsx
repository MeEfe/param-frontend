import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navItems } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { LogoOnlyThick } from "@/assets/LogoOnlyThick";
import { LogoDarkThick } from "@/assets/LogoDarkThick";
import { LogoWhiteThick } from "@/assets/LogoWhiteThick";

export function Sidebar() {
  const { activeNav, setActiveNav, isDark } = useApp();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border bg-sidebar py-5 transition-all duration-200",
        expanded ? "w-[200px] items-start px-3" : "w-[64px] items-center"
      )}
    >
      {/* Logo */}
      <div className={cn("mb-8 flex items-center", expanded ? "px-1" : "")}>
        {expanded ? (
          isDark
            ? <LogoDarkThick className="h-8 w-auto" />
            : <LogoWhiteThick className="h-8 w-auto" />
        ) : (
          <LogoOnlyThick className="h-8 w-8" />
        )}
      </div>


      {/* Nav icons */}
      <nav className={cn("flex flex-1 flex-col gap-1", expanded ? "w-full" : "items-center")}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={cn(
                "group relative flex cursor-pointer items-center rounded-lg transition-all duration-150",
                expanded ? "h-9 w-full gap-3 px-2" : "h-9 w-9 justify-center",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={17} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
              {expanded ? (
                <span className="text-[13px] font-medium whitespace-nowrap">{item.label}</span>
              ) : (
                /* Tooltip only when collapsed */
                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className={cn(
          "mb-2 flex cursor-pointer items-center rounded-lg text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground",
          expanded ? "h-9 w-full gap-3 px-2" : "h-9 w-9 justify-center"
        )}
      >
        {expanded ? (
          <>
            <ChevronLeft size={15} strokeWidth={1.5} className="shrink-0" />
            <span className="text-[13px] font-medium whitespace-nowrap">Collapse</span>
          </>
        ) : (
          <ChevronRight size={15} strokeWidth={1.5} />
        )}
      </button>

    </aside>
  );
}
