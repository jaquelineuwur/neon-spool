import { useState } from "react";
import { Calculator, FileText, Plus, Zap, Wrench, StickyNote, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MaterialSelector } from "./components/MaterialSelector";
import { PrinterSelector } from "./components/PrinterSelector";
import { ProjectManager } from "./components/ProjectManager";
import { CostBreakdown } from "./components/CostBreakdown";
import { NotesSection } from "./components/NotesSection";

const QuoteCosts = () => {
  const { toast } = useToast();
  
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedMaterials, setSelectedMaterials] = useState([
    { id: "pla-white", quantity: 120 }
  ]);
  const [selectedPrinter, setSelectedPrinter] = useState("ender3");
  const [printTime, setPrintTime] = useState(5);
  const [infill, setInfill] = useState(20);
  const [laborRate, setLaborRate] = useState(25);
  const [notes, setNotes] = useState("");

  const materials = [
    { id: "pla-white", name: "PLA Blanco", costPerKg: 400, available: 1.2, icon: "🤍" },
    { id: "abs-black", name: "ABS Negro", costPerKg: 520, available: 0.5, icon: "⚫" },
    { id: "petg-clear", name: "PETG Transparente", costPerKg: 680, available: 2.0, icon: "💎" },
    { id: "tpu-red", name: "TPU Flexible Rojo", costPerKg: 850, available: 0.3, icon: "🔴" },
    { id: "pla-blue", name: "PLA Azul", costPerKg: 420, available: 1.8, icon: "🔵" },
    { id: "pla-green", name: "PLA Verde", costPerKg: 420, available: 1.5, icon: "🟢" },
    { id: "pla-yellow", name: "PLA Amarillo", costPerKg: 420, available: 0.8, icon: "🟡" }
  ];

  const printers = [
    { id: "ender3", name: "Ender 3 Pro", powerConsumption: 150 },
    { id: "prusa-mk3", name: "Prusa MK3S+", powerConsumption: 120 },
    { id: "bambu-x1", name: "Bambu Lab X1 Carbon", powerConsumption: 180 },
    { id: "ultimaker", name: "Ultimaker S3", powerConsumption: 200 }
  ];

  const projects = [
    { id: "keychain-project", name: "Llavero Personalizado", created: "2024-09-20" },
    { id: "phone-stand", name: "Soporte para Teléfono", created: "2024-09-18" },
    { id: "gear-prototype", name: "Prototipo de Engranaje", created: "2024-09-15" }
  ];

  // Calculate costs
  const materialCost = selectedMaterials.reduce((total, material) => {
    const materialData = materials.find(m => m.id === material.id);
    return total + ((material.quantity / 1000) * (materialData?.costPerKg || 0));
  }, 0);

  const selectedPrinterData = printers.find(p => p.id === selectedPrinter);
  const electricityCost = ((selectedPrinterData?.powerConsumption || 0) / 1000) * printTime * 3.5; // $3.5 MXN per kWh
  const laborCost = printTime * laborRate;
  const totalCost = materialCost + electricityCost + laborCost;

  const generatePDF = () => {
    toast({
      title: "¡Cotización generada!",
      description: "El PDF se ha descargado exitosamente.",
    });
  };

  const saveProject = () => {
    toast({
      title: "¡Proyecto guardado!",
      description: "Los datos del proyecto se han guardado correctamente.",
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

      {/* Project Management */}
      <ProjectManager 
        projects={projects}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        onSaveProject={saveProject}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Material Selection */}
          <MaterialSelector 
            materials={materials}
            selectedMaterials={selectedMaterials}
            onMaterialsChange={setSelectedMaterials}
          />

          {/* Printer Selection */}
          <PrinterSelector 
            printers={printers}
            selectedPrinter={selectedPrinter}
            onPrinterChange={setSelectedPrinter}
            printTime={printTime}
            onPrintTimeChange={setPrintTime}
            infill={infill}
            onInfillChange={setInfill}
            laborRate={laborRate}
            onLaborRateChange={setLaborRate}
          />

          {/* Notes Section */}
          <NotesSection 
            notes={notes}
            onNotesChange={setNotes}
          />
        </div>

        {/* Quote Summary */}
        <div className="space-y-6">
          {/* Cost Breakdown */}
          <CostBreakdown 
            selectedMaterials={selectedMaterials}
            materials={materials}
            selectedPrinter={selectedPrinter}
            printers={printers}
            printTime={printTime}
            materialCost={materialCost}
            electricityCost={electricityCost}
            laborCost={laborCost}
            totalCost={totalCost}
          />

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