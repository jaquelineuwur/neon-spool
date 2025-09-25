import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Inventory from "./components/pages/Inventory";
import AddMaterials from "./components/pages/AddMaterials";
import QuoteCosts from "./components/pages/QuoteCosts";
import History from "./components/pages/History";
import Profile from "./components/pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={setActiveTab} />;
      case "inventory":
        return <Inventory onNavigate={setActiveTab} />;
      case "add":
        return <AddMaterials onNavigate={setActiveTab} />;
      case "quote":
        return <QuoteCosts />;
      case "history":
        return <History />;
      case "profile":
        return <Profile onNavigate={setActiveTab} />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="pb-6">
            {renderContent()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
