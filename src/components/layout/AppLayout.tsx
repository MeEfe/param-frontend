import { AppProvider, useApp } from "@/context/AppContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { BillsView } from "@/components/bills/BillsView";
import { ProfileView } from "@/components/profile/ProfileView";

function renderView(activeNav: string) {
  switch (activeNav) {
    case "bills":   return <BillsView />;
    case "profile": return <ProfileView />;
    default:        return <DashboardView />;
  }
}

function MainContent() {
  const { activeNav } = useApp();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderView(activeNav)}
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export function AppLayout() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
