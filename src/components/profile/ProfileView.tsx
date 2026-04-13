import { useApp } from "@/context/AppContext";
import { Switch } from "@/components/ui/switch";

export function ProfileView() {
  const { featureFlags, toggleFeature } = useApp();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-8 py-5">
        <h1 className="text-sm font-semibold text-foreground">Profile</h1>
      </div>

      {/* Content */}
      <div className="px-8 py-6 max-w-lg">
        {/* Features section */}
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Features
        </p>

        <div className="space-y-1">
          {Object.entries(featureFlags).map(([key, flag]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg px-4 py-3.5 transition-colors hover:bg-muted/40"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{flag.label}</p>
                <p className="text-xs text-muted-foreground">{flag.description}</p>
              </div>
              <Switch
                checked={flag.enabled}
                onCheckedChange={() => toggleFeature(key)}
                aria-label={`Toggle ${flag.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
