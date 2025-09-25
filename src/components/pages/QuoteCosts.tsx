import { useState } from "react";
import { Calculator, FileText, Printer, Clock, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const QuoteCosts = () => {
  const { toast } = useToast();
  const [quoteData, setQuoteData] = useState({
    material: "pla-white",
    weight: 120,
    printTime: 5,
    infill: 20,
    complexity: "medium"
  });

  const materials = [
    { id: "pla-white", name: "PLA Blanco", costPerKg: 400, available: 1.2 },
    { id: "abs-black", name: "ABS Negro", costPerKg: 520, available: 0.5 },
    { id: "petg-clear", name: "PETG Transparente", costPerKg: 680, available: 2.0 },
    { id: "tpu-red", name: "TPU Flexible Rojo", costPerKg: 850, available: 0.3 },
    { id: "pla-blue", name: "PLA Azul", costPerKg: 420, available: 1.8 }
  ];

  const selectedMaterial = materials.find(m => m.id === quoteData.material);
  
  // Calculate costs
  const materialCost = ((quoteData.weight / 1000) * (selectedMaterial?.costPerKg || 0));
  const complexityMultiplier = {
    simple: 1.0,
    medium: 1.2,
    complex: 1.5
  }[quoteData.complexity] || 1.2;
  
  const laborCost = (quoteData.printTime * 15) * complexityMultiplier; // $15 MXN per hour
  const totalCost = materialCost + laborCost;

  const handleInputChange = (field: string, value: any) => {
    setQuoteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePDF = () => {
    toast({
      title: "¡Cotización generada!",
      description: "El PDF se ha descargado exitosamente.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Cotización de Impresión</h1>
        <p className="text-muted-foreground">
          Calcula el costo estimado de tu próxima impresión 3D
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Material Selection */}
          <Card className="bg-gradient-dark border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Printer className="h-5 w-5 text-neon-cyan" />
                <span>Configuración de Impresión</span>
              </CardTitle>
              <CardDescription>
                Selecciona los parámetros de tu proyecto
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Material Selection */}
              <div className="space-y-2">
                <Label htmlFor="material" className="text-foreground">Material</Label>
                <Select value={quoteData.material} onValueChange={(value) => handleInputChange("material", value)}>
                  <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Selecciona material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{material.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {material.available} kg disponible
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-foreground flex items-center space-x-1">
                  <Weight className="h-4 w-4 text-neon-cyan" />
                  <span>Peso Estimado: {quoteData.weight}g</span>
                </Label>
                <Slider
                  value={[quoteData.weight]}
                  onValueChange={([value]) => handleInputChange("weight", value)}
                  min={10}
                  max={2000}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10g</span>
                  <span>2000g</span>
                </div>
              </div>

              {/* Print Time */}
              <div className="space-y-2">
                <Label htmlFor="time" className="text-foreground flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-neon-purple" />
                  <span>Tiempo Estimado: {quoteData.printTime} horas</span>
                </Label>
                <Slider
                  value={[quoteData.printTime]}
                  onValueChange={([value]) => handleInputChange("printTime", value)}
                  min={0.5}
                  max={48}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30 min</span>
                  <span>48 hrs</span>
                </div>
              </div>

              {/* Infill Percentage */}
              <div className="space-y-2">
                <Label htmlFor="infill" className="text-foreground">
                  Relleno: {quoteData.infill}%
                </Label>
                <Slider
                  value={[quoteData.infill]}
                  onValueChange={([value]) => handleInputChange("infill", value)}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Complexity */}
              <div className="space-y-2">
                <Label htmlFor="complexity" className="text-foreground">Complejidad del Proyecto</Label>
                <Select value={quoteData.complexity} onValueChange={(value) => handleInputChange("complexity", value)}>
                  <SelectTrigger className="bg-card border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Selecciona complejidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple - Sin soportes (+0%)</SelectItem>
                    <SelectItem value="medium">Medio - Algunos soportes (+20%)</SelectItem>
                    <SelectItem value="complex">Complejo - Muchos soportes (+50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote Summary */}
        <div className="space-y-6">
          {/* Cost Breakdown */}
          <Card className="bg-gradient-dark border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Calculator className="h-5 w-5 text-neon-green" />
                <span>Resumen de Costos</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Material seleccionado:</span>
                  <span className="text-sm font-medium text-foreground">
                    {selectedMaterial?.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Costo por kg:</span>
                  <span className="text-sm font-medium text-neon-cyan">
                    ${selectedMaterial?.costPerKg} MXN
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Peso del proyecto:</span>
                  <span className="text-sm font-medium text-foreground">
                    {quoteData.weight}g
                  </span>
                </div>
                
                <div className="border-t border-primary/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Costo material:</span>
                    <span className="text-sm font-medium text-neon-cyan">
                      ${materialCost.toFixed(2)} MXN
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Mano de obra:</span>
                    <span className="text-sm font-medium text-neon-purple">
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
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card className="bg-gradient-dark border-secondary/20">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Detalles del Proyecto</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tiempo de impresión:</span>
                <span className="text-foreground">{quoteData.printTime} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Porcentaje de relleno:</span>
                <span className="text-foreground">{quoteData.infill}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Complejidad:</span>
                <span className="text-foreground capitalize">{quoteData.complexity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material disponible:</span>
                <span className="text-foreground">{selectedMaterial?.available} kg</span>
              </div>
            </CardContent>
          </Card>

          {/* Generate PDF Button */}
          <Button 
            variant="neon" 
            size="lg" 
            onClick={generatePDF}
            className="w-full animate-pulse-glow"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generar PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCosts;