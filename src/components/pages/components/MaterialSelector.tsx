import { useState } from "react";
import { Palette, Plus, Trash2, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface Material {
  id: string;
  name: string;
  materialType: string;
  costPerKg: number;
  available: number;
  icon: string;
  color: string;
}

interface SelectedMaterial {
  id: string;
  quantity: number;
}

interface MaterialSelectorProps {
  materials: Material[];
  selectedMaterials: SelectedMaterial[];
  onMaterialsChange: (materials: SelectedMaterial[]) => void;
}

export const MaterialSelector = ({ materials, selectedMaterials, onMaterialsChange }: MaterialSelectorProps) => {
  const addMaterial = () => {
    onMaterialsChange([...selectedMaterials, { id: "pla-white", quantity: 50 }]);
  };

  const removeMaterial = (index: number) => {
    onMaterialsChange(selectedMaterials.filter((_, i) => i !== index));
  };

  const updateMaterial = (index: number, field: 'id' | 'quantity', value: string | number) => {
    const updated = selectedMaterials.map((material, i) => 
      i === index ? { ...material, [field]: value } : material
    );
    onMaterialsChange(updated);
  };

  return (
    <Card className="bg-gradient-dark border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-neon-cyan" />
            <span>Materiales de Impresión</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addMaterial}
            className="border-neon-green text-neon-green hover:bg-neon-green hover:text-background"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        </CardTitle>
        <CardDescription>
          Selecciona filamentos, resinas y componentes para tu proyecto
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {selectedMaterials.map((selectedMaterial, index) => {
          const material = materials.find(m => m.id === selectedMaterial.id);
          
          return (
            <div key={index} className="p-4 border border-primary/20 rounded-lg space-y-4 bg-card/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
                  <span className="text-lg">{material?.icon}</span>
                  <span className="text-lg">{material?.color}</span>
                  <span>Material {index + 1}</span>
                </h4>
                {selectedMaterials.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMaterial(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Material Selection */}
              <div className="space-y-2">
                <Label className="text-foreground">Tipo de Material</Label>
                <Select 
                  value={selectedMaterial.id} 
                  onValueChange={(value) => updateMaterial(index, 'id', value)}
                >
                  <SelectTrigger className="bg-input border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Selecciona material" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-primary/20">
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        <div className="flex items-center space-x-3 w-full">
                          <span className="text-lg">{material.icon}</span>
                          <span className="text-lg">{material.color}</span>
                          <div className="flex-1">
                            <div className="font-medium">{material.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ${material.costPerKg} MXN/kg • {material.available} 
                              {material.materialType === "component" ? " uds" : " kg"} disponible
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <Label className="text-foreground flex items-center space-x-1">
                  <Weight className="h-4 w-4 text-neon-cyan" />
                  <span>Peso Estimado: {selectedMaterial.quantity}g</span>
                </Label>
                <Slider
                  value={[selectedMaterial.quantity]}
                  onValueChange={([value]) => updateMaterial(index, 'quantity', value)}
                  min={5}
                  max={500}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5g</span>
                  <span>500g</span>
                </div>
              </div>

              {/* Material Info */}
              {material && (
                <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                  <div>Costo: ${((selectedMaterial.quantity / 1000) * material.costPerKg).toFixed(2)} MXN</div>
                  <div>Disponible: {material.available} kg</div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};