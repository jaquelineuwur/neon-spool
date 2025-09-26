import { useState } from "react";
import { Plus, Filter, Search, AlertTriangle, TrendingUp, Package, Beaker, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface InventoryProps {
  onNavigate: (tab: string) => void;
}

const Inventory = ({ onNavigate }: InventoryProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const materials = [
    // Filaments
    {
      id: 1,
      name: "PLA Blanco Premium",
      materialType: "filament",
      type: "PLA",
      brand: "PrintSupplies",
      quantity: 1200,
      unit: "g",
      lastRestock: "10/09/2025",
      unitCost: 0.40,
      totalValue: 480,
      supplier: "PrintSupplies",
      status: "normal",
      icon: "🧵",
      color: "⚪"
    },
    {
      id: 2,
      name: "ABS Negro Industrial",
      materialType: "filament",
      type: "ABS", 
      brand: "TechFilament",
      quantity: 500,
      unit: "g",
      lastRestock: "05/09/2025",
      unitCost: 0.52,
      totalValue: 260,
      supplier: "TechFilament",
      status: "low",
      icon: "🧵",
      color: "⚫"
    },
    {
      id: 3,
      name: "PETG Transparente HD",
      materialType: "filament",
      type: "PETG",
      brand: "MakerSupplies",
      quantity: 2000,
      unit: "g", 
      lastRestock: "18/09/2025",
      unitCost: 0.68,
      totalValue: 1360,
      supplier: "MakerSupplies",
      status: "normal",
      icon: "🧵",
      color: "💎"
    },
    // Resins
    {
      id: 4,
      name: "Resina Standard Gris",
      materialType: "resin",
      type: "Standard",
      brand: "ResinTech",
      quantity: 1000,
      unit: "ml",
      lastRestock: "12/09/2025", 
      unitCost: 0.85,
      totalValue: 850,
      supplier: "3D Resins",
      status: "normal",
      icon: "🧪",
      color: "⚫"
    },
    {
      id: 5,
      name: "Resina Flexible Transparente",
      materialType: "resin",
      type: "Flexible",
      brand: "FlexResin",
      quantity: 250,
      unit: "ml",
      lastRestock: "15/09/2025",
      unitCost: 1.20,
      totalValue: 300,
      supplier: "ResinWorld", 
      status: "low",
      icon: "🧪",
      color: "💎"
    },
    // Components
    {
      id: 6,
      name: "Tornillos M3x12 Inox",
      materialType: "component",
      type: "Hardware",
      brand: "FastenTech",
      quantity: 50,
      unit: "uds",
      lastRestock: "20/09/2025",
      unitCost: 2.50,
      totalValue: 125,
      supplier: "Hardware Store",
      status: "normal",
      icon: "⚙️",
      color: "🔘"
    },
    {
      id: 7,
      name: "Insertos Roscados M4",
      materialType: "component",
      type: "Hardware",
      brand: "TechParts",
      quantity: 15,
      unit: "uds",
      lastRestock: "16/09/2025",
      unitCost: 5.00,
      totalValue: 75,
      supplier: "Components Co",
      status: "critical",
      icon: "⚙️",
      color: "🟡"
    }
  ];

  const filters = [
    { id: "all", label: "Todos", count: materials.length },
    { id: "filament", label: "Filamentos", count: materials.filter(m => m.materialType === "filament").length },
    { id: "resin", label: "Resinas", count: materials.filter(m => m.materialType === "resin").length },
    { id: "component", label: "Componentes", count: materials.filter(m => m.materialType === "component").length },
    { id: "low", label: "Stock Bajo", count: materials.filter(m => m.status === "low" || m.status === "critical").length },
  ];

  const getMaterialTypeIcon = (materialType: string) => {
    switch (materialType) {
      case "filament": return "🧵";
      case "resin": return "🧪";
      case "component": return "⚙️";
      default: return "📦";
    }
  };

  const getMaterialTypeName = (materialType: string) => {
    switch (materialType) {
      case "filament": return "Filamento";
      case "resin": return "Resina";
      case "component": return "Componente";
      default: return "Material";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "low": return "secondary";  
      default: return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical": return "Crítico";
      case "low": return "Bajo";
      default: return "Normal";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventario de Materiales</h1>
          <p className="text-muted-foreground">Gestiona filamentos, resinas y componentes 3D</p>
        </div>
        <Button variant="neon" onClick={() => onNavigate("add")} className="animate-pulse-glow">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Material
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "neon" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="flex items-center space-x-1"
            >
              <span>{filter.label}</span>
              <Badge variant="secondary" className="ml-1">{filter.count}</Badge>
            </Button>
          ))}
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar materiales..." 
              className="pl-10 bg-card border-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <Card key={material.id} className="bg-gradient-dark border-primary/20 hover:shadow-glow-primary transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-foreground flex items-center space-x-2">
                    <span className="text-lg">{material.icon}</span>
                    <span className="text-lg">{material.color}</span>
                    <Package className="h-4 w-4 text-neon-cyan" />
                    <span>{material.name}</span>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {getMaterialTypeName(material.materialType)}: {material.type} • {material.brand}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(material.status)}>
                  {getStatusText(material.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cantidad disponible</span>
                  <span className={`text-lg font-bold ${
                    material.status === "critical" ? "text-destructive" : 
                    material.status === "low" ? "text-secondary" : "text-neon-cyan"
                  }`}>
                    {material.quantity} {material.unit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Costo unitario</span>
                  <span className="text-sm font-medium text-neon-green">
                    ${material.unitCost.toFixed(2)} MXN/{material.unit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valor total</span>
                  <span className="text-sm font-medium text-neon-yellow">
                    ${material.totalValue} MXN
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Último restock</span>
                  <span className="text-sm text-foreground">{material.lastRestock}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-primary/20">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="neon" size="sm" className="flex-1">
                    Usar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-gradient-dark border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-cyan">{materials.length}</div>
            <p className="text-sm text-muted-foreground">Total Materiales</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-secondary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-purple">
              {materials.reduce((acc, m) => acc + m.totalValue, 0).toLocaleString()} MXN
            </div>
            <p className="text-sm text-muted-foreground">Valor Total Inventario</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-accent/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-green flex items-center justify-center space-x-1">
              <span>🧵</span>
              <span>{materials.filter(m => m.materialType === "filament").length}</span>
              <span>🧪</span>
              <span>{materials.filter(m => m.materialType === "resin").length}</span>
              <span>⚙️</span>
              <span>{materials.filter(m => m.materialType === "component").length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Fil • Res • Com</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-destructive/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 mr-1" />
              {materials.filter(m => m.status === "low" || m.status === "critical").length}
            </div>
            <p className="text-sm text-muted-foreground">Stock Bajo</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;