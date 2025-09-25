import { Calculator, Zap, Wrench, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Material {
  id: string;
  name: string;
  costPerKg: number;
  available: number;
  icon: string;
}

interface Printer {
  id: string;
  name: string;
  powerConsumption: number;
}

interface SelectedMaterial {
  id: string;
  quantity: number;
}

interface CostBreakdownProps {
  selectedMaterials: SelectedMaterial[];
  materials: Material[];
  selectedPrinter: string;
  printers: Printer[];
  printTime: number;
  materialCost: number;
  electricityCost: number;
  laborCost: number;
  totalCost: number;
}

export const CostBreakdown = ({
  selectedMaterials,
  materials,
  selectedPrinter,
  printers,
  printTime,
  materialCost,
  electricityCost,
  laborCost,
  totalCost
}: CostBreakdownProps) => {
  const selectedPrinterData = printers.find(p => p.id === selectedPrinter);
  const totalWeight = selectedMaterials.reduce((sum, material) => sum + material.quantity, 0);

  return (
    <Card className="bg-gradient-dark border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Calculator className="h-5 w-5 text-neon-green" />
          <span>Resumen de Costos</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Materials Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm font-medium text-foreground">
            <Palette className="h-4 w-4 text-neon-cyan" />
            <span>Materiales ({selectedMaterials.length})</span>
          </div>
          
          {selectedMaterials.map((selectedMaterial, index) => {
            const material = materials.find(m => m.id === selectedMaterial.id);
            const cost = ((selectedMaterial.quantity / 1000) * (material?.costPerKg || 0));
            
            return (
              <div key={index} className="flex justify-between items-center text-xs bg-muted/10 p-2 rounded">
                <div className="flex items-center space-x-2">
                  <span>{material?.icon}</span>
                  <span className="text-muted-foreground">
                    {material?.name} - {selectedMaterial.quantity}g
                  </span>
                </div>
                <span className="text-neon-cyan font-medium">
                  ${cost.toFixed(2)} MXN
                </span>
              </div>
            );
          })}
          
          <div className="flex justify-between items-center pt-2 border-t border-primary/20">
            <span className="text-sm text-muted-foreground">Subtotal materiales:</span>
            <span className="text-sm font-medium text-neon-cyan">
              ${materialCost.toFixed(2)} MXN
            </span>
          </div>
        </div>

        {/* Printer Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Impresora:</span>
            <span className="text-sm font-medium text-foreground">
              {selectedPrinterData?.name}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tiempo total:</span>
            <span className="text-sm font-medium text-foreground">
              {printTime} hrs
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Peso total:</span>
            <span className="text-sm font-medium text-foreground">
              {totalWeight}g
            </span>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="border-t border-primary/20 pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-neon-yellow" />
              <span className="text-sm text-muted-foreground">Electricidad:</span>
            </div>
            <span className="text-sm font-medium text-neon-yellow">
              ${electricityCost.toFixed(2)} MXN
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Wrench className="h-3 w-3 text-neon-green" />
              <span className="text-sm text-muted-foreground">Mano de obra:</span>
            </div>
            <span className="text-sm font-medium text-neon-green">
              ${laborCost.toFixed(2)} MXN
            </span>
          </div>
        </div>
        
        <div className="border-t border-primary/20 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">Total estimado:</span>
            <span className="text-xl font-bold text-neon-green">
              ${totalCost.toFixed(2)} MXN
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};