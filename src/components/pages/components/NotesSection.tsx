import { StickyNote } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const NotesSection = ({ notes, onNotesChange }: NotesSectionProps) => {
  return (
    <Card className="bg-gradient-dark border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <StickyNote className="h-5 w-5 text-neon-pink" />
          <span>Notas del Proyecto</span>
        </CardTitle>
        <CardDescription>
          Registra detalles importantes sobre la impresión
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-foreground">
            Observaciones y detalles especiales
          </Label>
          <Textarea
            id="notes"
            placeholder="Ej: Usar soportes en los voladizos, velocidad reducida para mejor calidad, post-procesado requerido..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="bg-input border-primary/20 focus:border-primary min-h-24 resize-none"
            rows={4}
          />
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
          <div className="font-medium mb-1">Sugerencias:</div>
          <ul className="space-y-1 ml-2">
            <li>• Configuraciones especiales de slicer</li>
            <li>• Requisitos de post-procesado</li>
            <li>• Tolerancias críticas</li>
            <li>• Consideraciones de diseño</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};