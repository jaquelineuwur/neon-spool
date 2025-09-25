import { useState } from "react";
import { Save, Package, DollarSign, Truck, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddMaterialsProps {
  onNavigate: (tab: string) => void;
}

const AddMaterials = ({ onNavigate }: AddMaterialsProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "PLA Azul",
    type: "PLA",
    initialQuantity: "1.5",
    costPerKg: "450",
    supplier: "MakerSupplies",
    color: "Azul",
    diameter: "1.75",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving
    toast({
      title: "¡Material agregado exitosamente!",
      description: `${formData.name} ha sido añadido al inventario.`,
    });
    
    // Navigate back to inventory
    setTimeout(() => {
      onNavigate("inventory");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Agregar Nuevo Material</h1>
        <p className="text-muted-foreground">
          Registra un nuevo filamento en tu inventario 3D
        </p>
      </div>

      {/* Main Form */}
      <Card className="bg-gradient-dark border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <Package className="h-5 w-5 text-neon-cyan" />
            <span>Información del Material</span>
          </CardTitle>
          <CardDescription>
            Completa los datos del nuevo filamento para impresión 3D
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Nombre del Material</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: PLA Azul"
                  className="bg-card border-primary/20 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-foreground">Tipo de Material</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PLA">PLA</SelectItem>
                    <SelectItem value="ABS">ABS</SelectItem>
                    <SelectItem value="PETG">PETG</SelectItem>
                    <SelectItem value="TPU">TPU</SelectItem>
                    <SelectItem value="WOOD">Wood Fill</SelectItem>
                    <SelectItem value="METAL">Metal Fill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="color" className="text-foreground">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="Ej: Azul, Rojo, Transparente"
                  className="bg-card border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="diameter" className="text-foreground">Diámetro (mm)</Label>
                <Select value={formData.diameter} onValueChange={(value) => handleInputChange("diameter", value)}>
                  <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Selecciona diámetro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.75">1.75 mm</SelectItem>
                    <SelectItem value="3.0">3.0 mm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity and Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-foreground flex items-center space-x-1">
                  <Hash className="h-4 w-4 text-neon-cyan" />
                  <span>Cantidad Inicial (kg)</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.initialQuantity}
                  onChange={(e) => handleInputChange("initialQuantity", e.target.value)}
                  placeholder="1.5"
                  className="bg-card border-primary/20 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cost" className="text-foreground flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-neon-green" />
                  <span>Costo por kg (MXN)</span>
                </Label>
                <Input
                  id="cost"
                  type="number"
                  min="0"
                  value={formData.costPerKg}
                  onChange={(e) => handleInputChange("costPerKg", e.target.value)}
                  placeholder="450"
                  className="bg-card border-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Supplier */}
            <div className="space-y-2">
              <Label htmlFor="supplier" className="text-foreground flex items-center space-x-1">
                <Truck className="h-4 w-4 text-neon-purple" />
                <span>Proveedor</span>
              </Label>
              <Select value={formData.supplier} onValueChange={(value) => handleInputChange("supplier", value)}>
                <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Selecciona proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MakerSupplies">MakerSupplies</SelectItem>
                  <SelectItem value="PrintSupplies">PrintSupplies</SelectItem>
                  <SelectItem value="TechFilament">TechFilament</SelectItem>
                  <SelectItem value="FlexMaterials">FlexMaterials</SelectItem>
                  <SelectItem value="3DWorld">3D World</SelectItem>
                  <SelectItem value="FilamentMX">FilamentMX</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Propiedades especiales, configuraciones de impresión recomendadas, etc."
                className="bg-card border-primary/20 focus:border-primary min-h-20"
              />
            </div>

            {/* Preview Card */}
            <Card className="bg-muted/50 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-sm text-foreground">Vista Previa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Material:</span>
                  <span className="text-sm font-medium text-neon-cyan">
                    {formData.name || "Nombre del material"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cantidad:</span>
                  <span className="text-sm font-medium text-neon-cyan">
                    {formData.initialQuantity || "0"} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor total:</span>
                  <span className="text-sm font-medium text-neon-green">
                    ${((parseFloat(formData.initialQuantity) || 0) * (parseFloat(formData.costPerKg) || 0)).toLocaleString()} MXN
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                type="submit" 
                variant="neon" 
                size="lg" 
                className="flex-1 animate-pulse-glow"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Material
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                onClick={() => onNavigate("inventory")}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMaterials;