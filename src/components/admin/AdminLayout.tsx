import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminLoginGate, useAdminAuth } from "./AdminAuth";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

function AdminInner() {
  const { logout } = useAdminAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center">
              <SidebarTrigger className="mr-3" />
              <h2 className="font-display font-semibold text-sm text-foreground">Admin Panel</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive gap-1.5 text-xs">
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </Button>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function AdminLayout() {
  return (
    <AdminLoginGate>
      <AdminInner />
    </AdminLoginGate>
  );
}
