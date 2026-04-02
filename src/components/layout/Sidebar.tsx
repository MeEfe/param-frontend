import { Settings, TrendingUp } from "lucide-react";
import { navItems } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { activeNav, setActiveNav } = useApp();

  return (
    <aside className="flex h-full w-[64px] shrink-0 flex-col items-center border-r border-border bg-sidebar py-5">
      {/* Logo mark */}
      <div className="mb-8 flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
        <TrendingUp size={15} className="text-primary-foreground" strokeWidth={2.5} />
      </div>

      {/* Nav icons */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              title={item.label}
              className={cn(
                "group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all duration-150",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={17} strokeWidth={isActive ? 2 : 1.5} />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <button
        title="Settings"
        className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
      >
        <Settings size={17} strokeWidth={1.5} />
        <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
          Settings
        </span>
      </button>
    </aside>
  );
}
