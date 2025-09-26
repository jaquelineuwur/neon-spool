import { useState } from "react";
import { Save, Package, DollarSign, Truck, Hash, Calendar, Palette, Beaker, Cpu } from "lucide-react";
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

// 21 predefined colors
const predefinedColors = [
  { id: "white", name: "Blanco", hex: "#FFFFFF", icon: "⚪" },
  { id: "black", name: "Negro", hex: "#000000", icon: "⚫" },
  { id: "red", name: "Rojo", hex: "#FF0000", icon: "🔴" },
  { id: "blue", name: "Azul", hex: "#0000FF", icon: "🔵" },
  { id: "green", name: "Verde", hex: "#00FF00", icon: "🟢" },
  { id: "yellow", name: "Amarillo", hex: "#FFFF00", icon: "🟡" },
  { id: "orange", name: "Naranja", hex: "#FFA500", icon: "🟠" },
  { id: "purple", name: "Morado", hex: "#800080", icon: "🟣" },
  { id: "pink", name: "Rosa", hex: "#FFC0CB", icon: "🩷" },
  { id: "brown", name: "Café", hex: "#A52A2A", icon: "🤎" },
  { id: "gray", name: "Gris", hex: "#808080", icon: "⚫" },
  { id: "cyan", name: "Cian", hex: "#00FFFF", icon: "🔷" },
  { id: "magenta", name: "Magenta", hex: "#FF00FF", icon: "🔸" },
  { id: "lime", name: "Lima", hex: "#00FF00", icon: "💚" },
  { id: "gold", name: "Dorado", hex: "#FFD700", icon: "🟨" },
  { id: "silver", name: "Plateado", hex: "#C0C0C0", icon: "🔘" },
  { id: "clear", name: "Transparente", hex: "#FFFFFF", icon: "💎" },
  { id: "wood", name: "Madera", hex: "#8B4513", icon: "🟫" },
  { id: "copper", name: "Cobre", hex: "#B87333", icon: "🟤" },
  { id: "marble", name: "Mármol", hex: "#F5F5DC", icon: "⚪" },
  { id: "glow", name: "Fosforescente", hex: "#39FF14", icon: "✨" }
];

const materialTypes = [
  { id: "filament", name: "Filamento", icon: "🧵" },
  { id: "resin", name: "Resina", icon: "🧪" },
  { id: "component", name: "Componente", icon: "⚙️" }
];

const filamentTypes = [
  "PLA", "ABS", "PETG", "TPU", "PLA+", "ABS+", "PETG-CF", "PLA-CF",
  "Wood Fill", "Metal Fill", "Silk PLA", "Glow PLA", "Carbon Fiber"
];

const resinTypes = [
  "Standard", "Tough", "Flexible", "High Temp", "Castable", "Ceramic",
  "Bio-compatible", "Water Washable", "ABS-like", "Transparent"
];

const AddMaterials = ({ onNavigate }: AddMaterialsProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    materialType: "filament",
    brand: "",
    color: "blue",
    supplier: "",
    purchaseDate: "",
    unit: "g",
    
    // Filament/Resin specific
    type: "PLA",
    subtype: "",
    quantityPerRoll: "1000",
    numberOfRolls: "1",
    costPerRoll: "420",
    
    // Component specific
    numberOfUnits: "1",
    costPerComponent: "50",
    
    // Calculated fields
    totalQty: 0,
    unitCost: 0,
    totalCost: 0,
    
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate fields based on material type
      if (prev.materialType === "filament" || prev.materialType === "resin") {
        const qty = parseFloat(updated.quantityPerRoll) || 0;
        const rolls = parseInt(updated.numberOfRolls) || 0;
        const costRoll = parseFloat(updated.costPerRoll) || 0;
        
        updated.totalQty = qty * rolls;
        updated.unitCost = qty > 0 ? costRoll / qty : 0;
        updated.totalCost = costRoll * rolls;
      } else if (prev.materialType === "component") {
        const units = parseInt(updated.numberOfUnits) || 0;
        const costComponent = parseFloat(updated.costPerComponent) || 0;
        
        updated.totalQty = units;
        updated.unitCost = costComponent;
        updated.totalCost = costComponent * units;
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "¡Material agregado exitosamente!",
      description: `${formData.name} ha sido añadido al inventario.`,
    });
    
    setTimeout(() => {
      onNavigate("inventory");
    }, 1500);
  };

  const loadDemo = () => {
    const demoData = formData.materialType === "filament" ? {
      name: "PLA Premium Azul",
      materialType: "filament",
      brand: "PrintSupplies",
      color: "blue",
      supplier: "MakerSupplies",
      purchaseDate: "2024-09-26",
      unit: "g",
      type: "PLA",
      subtype: "Premium",
      quantityPerRoll: "1000",
      numberOfRolls: "2",
      costPerRoll: "420"
    } : formData.materialType === "resin" ? {
      name: "Resina Standard Transparente",
      materialType: "resin",
      brand: "ResinTech", 
      color: "clear",
      supplier: "3D Resins",
      purchaseDate: "2024-09-26",
      unit: "ml",
      type: "Standard",
      subtype: "High Detail",
      quantityPerRoll: "1000",
      numberOfRolls: "1",
      costPerRoll: "850"
    } : {
      name: "Tornillos M3x12",
      materialType: "component",
      brand: "FastenTech",
      color: "silver",
      supplier: "Hardware Store",
      purchaseDate: "2024-09-26", 
      unit: "uds",
      numberOfUnits: "50",
      costPerComponent: "2"
    };
    
    setFormData(prev => ({ ...prev, ...demoData }));
  };

  const selectedColor = predefinedColors.find(c => c.id === formData.color);
  const materialTypeData = materialTypes.find(t => t.id === formData.materialType);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Agregar Nuevo Material</h1>
        <p className="text-muted-foreground">
          Registra filamentos, resinas y componentes para tu inventario 3D
        </p>
      </div>

      {/* Main Form */}
      <Card className="bg-gradient-dark border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <div className="flex items-center space-x-2">
              {materialTypeData && <span className="text-xl">{materialTypeData.icon}</span>}
              <Package className="h-5 w-5 text-neon-cyan" />
              <span>Información del Material</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={loadDemo}
              className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-background"
            >
              Demo
            </Button>
          </CardTitle>
          <CardDescription>
            Completa los datos del nuevo material para impresión 3D
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Material Type Selection */}
            <div className="space-y-2">
              <Label className="text-foreground">Tipo de Material</Label>
              <div className="grid grid-cols-3 gap-4">
                {materialTypes.map((type) => (
                  <Button
                    key={type.id}
                    type="button"
                    variant={formData.materialType === type.id ? "neon" : "outline"}
                    onClick={() => handleInputChange("materialType", type.id)}
                    className="flex items-center justify-center space-x-2 p-4 h-auto"
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span>{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Nombre del Material</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: PLA Azul Premium"
                  className="bg-card border-primary/20 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-foreground">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Ej: PrintSupplies, Hatchbox"
                  className="bg-card border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color Selection */}
              <div className="space-y-2">
                <Label className="text-foreground flex items-center space-x-1">
                  <Palette className="h-4 w-4 text-neon-cyan" />
                  <span>Color</span>
                </Label>
                <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                  <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                    <SelectValue>
                      <div className="flex items-center space-x-2">
                        {selectedColor && <span>{selectedColor.icon}</span>}
                        <span>{selectedColor?.name}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {predefinedColors.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        <div className="flex items-center space-x-3">
                          <span>{color.icon}</span>
                          <span>{color.name}</span>
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Unidad</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                  <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">Gramos (g)</SelectItem>
                    <SelectItem value="ml">Mililitros (ml)</SelectItem>
                    <SelectItem value="uds">Unidades (uds)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-foreground flex items-center space-x-1">
                  <Truck className="h-4 w-4 text-neon-purple" />
                  <span>Proveedor (Opcional)</span>
                </Label>
                <Input
                  value={formData.supplier}
                  onChange={(e) => handleInputChange("supplier", e.target.value)}
                  placeholder="Nombre del proveedor"
                  className="bg-card border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-neon-green" />
                  <span>Fecha de Compra</span>
                </Label>
                <Input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                  className="bg-card border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Specific Fields - Filament/Resin */}
            {(formData.materialType === "filament" || formData.materialType === "resin") && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">
                      {formData.materialType === "filament" ? "Tipo de Filamento" : "Tipo de Resina"}
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(formData.materialType === "filament" ? filamentTypes : resinTypes).map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground">Subtipo (Opcional)</Label>
                    <Input
                      value={formData.subtype}
                      onChange={(e) => handleInputChange("subtype", e.target.value)}
                      placeholder="Ej: Premium, CF, Silk"
                      className="bg-card border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">Cantidad por {formData.materialType === "filament" ? "Rollo" : "Botella"} ({formData.unit})</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.quantityPerRoll}
                      onChange={(e) => handleInputChange("quantityPerRoll", e.target.value)}
                      className="bg-card border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground">Número de {formData.materialType === "filament" ? "Rollos" : "Botellas"}</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.numberOfRolls}
                      onChange={(e) => handleInputChange("numberOfRolls", e.target.value)}
                      className="bg-card border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground">Costo por {formData.materialType === "filament" ? "Rollo" : "Botella"} (MXN)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.costPerRoll}
                      onChange={(e) => handleInputChange("costPerRoll", e.target.value)}
                      className="bg-card border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Specific Fields - Component */}
            {formData.materialType === "component" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-foreground">Número de Unidades</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.numberOfUnits}
                    onChange={(e) => handleInputChange("numberOfUnits", e.target.value)}
                    className="bg-card border-primary/20 focus:border-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-foreground">Costo por Componente (MXN)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.costPerComponent}
                    onChange={(e) => handleInputChange("costPerComponent", e.target.value)}
                    className="bg-card border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>
            )}

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
                <CardTitle className="text-sm text-foreground">Vista Previa de Cálculos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Material:</span>
                  <span className="text-sm font-medium text-neon-cyan">
                    {formData.name || "Nombre del material"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cantidad total:</span>
                  <span className="text-sm font-medium text-neon-cyan">
                    {formData.totalQty} {formData.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Costo unitario:</span>
                  <span className="text-sm font-medium text-neon-yellow">
                    ${formData.unitCost.toFixed(2)} MXN/{formData.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Costo total:</span>
                  <span className="text-sm font-medium text-neon-green">
                    ${formData.totalCost.toFixed(2)} MXN
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
                Agregar Material
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