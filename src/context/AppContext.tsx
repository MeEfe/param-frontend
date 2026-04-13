import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { monthSnapshots } from "@/data/mockData";
import defaultFlags from "@/data/featureFlags.json";
import type { FeatureFlags } from "@/types";

interface AppContextValue {
  activeNav: string;
  setActiveNav: (id: string) => void;
  monthIdx: number;
  setMonthIdx: (idx: number) => void;
  currentMonth: typeof monthSnapshots[0];
  canPrev: boolean;
  canNext: boolean;
  isDark: boolean;
  toggleDark: () => void;
  featureFlags: FeatureFlags;
  toggleFeature: (key: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function loadFlags(): FeatureFlags {
  try {
    const stored = localStorage.getItem("featureFlags");
    const overrides: Record<string, { enabled: boolean }> = stored ? JSON.parse(stored) : {};
    const merged: FeatureFlags = { ...defaultFlags };
    for (const key of Object.keys(merged)) {
      if (key in overrides) {
        merged[key] = { ...merged[key], enabled: overrides[key].enabled };
      }
    }
    return merged;
  } catch {
    return { ...defaultFlags };
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [monthIdx, setMonthIdx] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(loadFlags);

  const currentMonth = monthSnapshots[monthIdx];
  const canPrev = monthIdx < monthSnapshots.length - 1;
  const canNext = monthIdx > 0;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const toStore: Record<string, { enabled: boolean }> = {};
    for (const key of Object.keys(featureFlags)) {
      toStore[key] = { enabled: featureFlags[key].enabled };
    }
    localStorage.setItem("featureFlags", JSON.stringify(toStore));
  }, [featureFlags]);

  const toggleDark = () => setIsDark((d) => !d);

  const toggleFeature = (key: string) => {
    setFeatureFlags((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  return (
    <AppContext.Provider value={{ activeNav, setActiveNav, monthIdx, setMonthIdx, currentMonth, canPrev, canNext, isDark, toggleDark, featureFlags, toggleFeature }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
