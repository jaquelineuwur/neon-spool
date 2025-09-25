import { useState } from "react";
import { 
  Home, 
  Package, 
  Plus, 
  Calculator, 
  History, 
  User,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "add", label: "Add Materials", icon: Plus },
    { id: "quote", label: "Quote Costs", icon: Calculator },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="bg-gradient-dark border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-2xl font-bold text-foreground">3D Material</h1>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "neon" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className="flex items-center space-x-2"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </nav>

          {/* Mobile navigation */}
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className="md:hidden border-t border-primary/20">
        <div className="grid grid-cols-6 gap-1 p-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "neon" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center space-y-1 h-auto py-2"
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;