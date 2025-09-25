import { Printer, Clock, Zap, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface Printer {
  id: string;
  name: string;
  powerConsumption: number;
}

interface PrinterSelectorProps {
  printers: Printer[];
  selectedPrinter: string;
  onPrinterChange: (printerId: string) => void;
  printTime: number;
  onPrintTimeChange: (time: number) => void;
  infill: number;
  onInfillChange: (infill: number) => void;
  laborRate: number;
  onLaborRateChange: (rate: number) => void;
}

export const PrinterSelector = ({
  printers,
  selectedPrinter,
  onPrinterChange,
  printTime,
  onPrintTimeChange,
  infill,
  onInfillChange,
  laborRate,
  onLaborRateChange
}: PrinterSelectorProps) => {
  const printer = printers.find(p => p.id === selectedPrinter);

  return (
    <Card className="bg-gradient-dark border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Printer className="h-5 w-5 text-neon-purple" />
          <span>Configuración de Impresora</span>
        </CardTitle>
        <CardDescription>
          Selecciona la impresora y configura los parámetros de impresión
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Printer Selection */}
        <div className="space-y-2">
          <Label className="text-foreground">Impresora</Label>
          <Select value={selectedPrinter} onValueChange={onPrinterChange}>
            <SelectTrigger className="bg-input border-primary/20 focus:border-primary">
              <SelectValue placeholder="Selecciona impresora" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-primary/20">
              {printers.map((printer) => (
                <SelectItem key={printer.id} value={printer.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{printer.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {printer.powerConsumption}W
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {printer && (
            <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
              Consumo energético: {printer.powerConsumption}W
            </div>
          )}
        </div>

        {/* Print Time */}
        <div className="space-y-2">
          <Label className="text-foreground flex items-center space-x-1">
            <Clock className="h-4 w-4 text-neon-purple" />
            <span>Tiempo Estimado: {printTime} horas</span>
          </Label>
          <Slider
            value={[printTime]}
            onValueChange={([value]) => onPrintTimeChange(value)}
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
          <Label className="text-foreground">
            Relleno: {infill}%
          </Label>
          <Slider
            value={[infill]}
            onValueChange={([value]) => onInfillChange(value)}
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

        {/* Labor Rate */}
        <div className="space-y-2">
          <Label className="text-foreground flex items-center space-x-1">
            <Wrench className="h-4 w-4 text-neon-green" />
            <span>Tarifa de Mano de Obra (MXN/hora)</span>
          </Label>
          <Input
            type="number"
            value={laborRate}
            onChange={(e) => onLaborRateChange(Number(e.target.value))}
            className="bg-input border-primary/20 focus:border-primary"
            min={0}
            step={5}
          />
          <div className="text-xs text-muted-foreground">
            Costo total de mano de obra: ${(printTime * laborRate).toFixed(2)} MXN
          </div>
        </div>

        {/* Energy Cost Info */}
        {printer && (
          <div className="bg-muted/20 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-neon-yellow" />
              <span className="text-sm font-medium text-foreground">Costo Energético</span>
            </div>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>Consumo: {((printer.powerConsumption / 1000) * printTime).toFixed(2)} kWh</div>
              <div>Tarifa eléctrica: $3.50 MXN/kWh</div>
              <div className="font-medium text-neon-yellow">
                Total: ${(((printer.powerConsumption / 1000) * printTime * 3.5)).toFixed(2)} MXN
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};