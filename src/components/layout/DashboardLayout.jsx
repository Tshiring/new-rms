import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { Bell, ChefHat, LogOut, Search, User } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { filteredItems } from "../../constants/navigationItems";
import {hasRole} from "../../store/useRole";



function AppSidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };


 
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-purple-200 pb-4">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <ChefHat className="w-6 h-6 text-purple-700" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-4">
        <SidebarMenu className="space-y-2">
          {filteredItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="w-full justify-start text-black hover:bg-purple-600 hover:text-white data-[active=true]:bg-purple-600 data-[active=true]:text-white"
              >
                <NavLink
                to={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                  onClick={(e) => {
                    console.log(`📱 Navigating to: ${item.title}`);
                    console.log(`🔗 URL: ${item.href}`);
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          onClick={handleLogout}
          variant="secondary"
          className="w-full bg-white text-purple-700 hover:bg-gray-100 font-medium cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("🔍 Search submitted:", searchQuery);
    console.log("⏰ Search timestamp:", new Date().toISOString());
  };

  const handleProfileClick = () => {
    console.log("👤 Profile icon clicked");
  };

  const handleNotificationClick = () => {
    console.log("🔔 Notification icon clicked");
  };


  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className="text-2xl font-bold text-purple-700">
              {hasRole("SUPER_ADMIN")?'Superadmin Dashboard' : 'Restaurant Admin Dashboard'}
            </h1>
            <p className="text-gray-600">Welcome back, {hasRole("SUPER_ADMIN")?'Superadmin' : 'admin'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-700 hover:bg-purple-800 px-3"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>

          {/* Action Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 hover:border-purple-500"
            onClick={handleProfileClick}
          >
            <User className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 hover:border-purple-500"
            onClick={handleNotificationClick}
          >
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="bg-purple-800 text-white">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
