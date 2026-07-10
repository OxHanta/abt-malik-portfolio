import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProjectShowcase from "@/pages/ProjectShowcase";
import DronePhotography from "@/pages/DronePhotography";
import StockFootage from "@/pages/StockFootage";
import { CursorProvider } from "@/context/CursorContext";
import { CustomCursor } from "@/components/CustomCursor";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:id" component={ProjectShowcase} />
      <Route path="/aerials" component={DronePhotography} />
      <Route path="/stock-footage" component={StockFootage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Prevent context menu on media elements to deter downloading
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" ||
        target.tagName === "VIDEO" ||
        target.tagName === "CANVAS" ||
        target.closest(".pnlm-container")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CursorProvider>
          <CustomCursor />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </CursorProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
