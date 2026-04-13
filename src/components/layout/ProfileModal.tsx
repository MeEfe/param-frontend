import { useState } from "react";
import { Moon, Sun, User, Sliders } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

type Section = "profile" | "features" | "settings";

const NAV: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "profile",  label: "Profile",  icon: User },
  { id: "features", label: "Features", icon: Sliders },
  { id: "settings", label: "Settings", icon: Moon },
];

export function ProfileModal() {
  const { featureFlags, toggleFeature, isDark, toggleDark } = useApp();
  const [section, setSection] = useState<Section>("profile");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full ring-2 ring-transparent transition-all duration-150 hover:ring-primary/30">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary/20 text-[10px] font-bold text-primary">
              JD
            </AvatarFallback>
          </Avatar>
        </button>
      </DialogTrigger>

      <DialogContent className="min-w-4xl p-0 gap-0 overflow-hidden">
        <div className="flex h-[520px]">

          {/* Left nav */}
          <aside className="flex w-44 shrink-0 flex-col border-r border-border bg-muted/30 px-3 py-5">
            <div className="mb-5 flex flex-col items-center gap-2 px-1">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/20 text-sm font-bold text-primary">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-[13px] font-semibold text-foreground">John Doe</p>
                <p className="text-[11px] text-muted-foreground">john@example.com</p>
              </div>
            </div>

            <nav className="flex flex-col gap-0.5">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors duration-100 cursor-pointer",
                    section === id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} className="shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right content */}
          <div className="flex flex-1 flex-col overflow-y-auto p-6">

            {section === "profile" && (
              <div className="space-y-6">
                <SectionHeading>Account</SectionHeading>
                <div className="space-y-3">
                  <Field label="Name" value="John Doe" />
                  <Field label="Email" value="john@example.com" />
                  <Field label="Role" value="Personal" />
                </div>
              </div>
            )}

            {section === "features" && (
              <div className="space-y-4">
                <SectionHeading>Features</SectionHeading>
                <p className="text-xs text-muted-foreground -mt-2">
                  Toggle experimental features on or off.
                </p>
                <div className="space-y-1">
                  {Object.entries(featureFlags).map(([key, flag]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-muted/40"
                    >
                      <div className="space-y-0.5">
                        <p className="text-[13px] font-medium text-foreground">{flag.label}</p>
                        <p className="text-[11px] text-muted-foreground">{flag.description}</p>
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
            )}

            {section === "settings" && (
              <div className="space-y-4">
                <SectionHeading>Settings</SectionHeading>
                <div className="space-y-1">
                  <div className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-muted/40">
                    <div className="space-y-0.5">
                      <p className="text-[13px] font-medium text-foreground">
                        {isDark ? "Dark mode" : "Light mode"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Switch between light and dark appearance.
                      </p>
                    </div>
                    <button
                      onClick={toggleDark}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
                      aria-label="Toggle theme"
                    >
                      {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </p>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground/70">
        {label}
      </span>
      <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-[13px] text-foreground">
        {value}
      </div>
    </div>
  );
}
