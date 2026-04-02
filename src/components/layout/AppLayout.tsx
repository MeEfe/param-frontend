import { AppProvider, useApp } from "@/context/AppContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { BillsView } from "@/components/bills/BillsView";

function MainContent() {
  const { activeNav } = useApp();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 overflow-y-auto">
        {activeNav === "bills" ? <BillsView /> : <DashboardView />}
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
