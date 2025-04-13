
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

export function Layout({ children, hideSidebar = false }: LayoutProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  
  // Don't show sidebar on login page
  const shouldShowSidebar = !hideSidebar && !isLoginPage;

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex min-h-screen">
        {shouldShowSidebar && <AppSidebar />}
        <main className={cn("flex-1", !shouldShowSidebar && "w-full")}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
