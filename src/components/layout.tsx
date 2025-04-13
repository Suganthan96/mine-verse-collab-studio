
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

export function Layout({ children, hideSidebar = false }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex min-h-screen">
        {!hideSidebar && <AppSidebar />}
        <main className={cn("flex-1", hideSidebar && "w-full")}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
