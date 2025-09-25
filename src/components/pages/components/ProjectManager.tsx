import { FolderOpen, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  created: string;
}

interface ProjectManagerProps {
  projects: Project[];
  selectedProject: string;
  onProjectChange: (projectId: string) => void;
  onSaveProject: () => void;
}

export const ProjectManager = ({ 
  projects, 
  selectedProject, 
  onProjectChange, 
  onSaveProject 
}: ProjectManagerProps) => {
  return (
    <Card className="bg-gradient-accent border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5 text-neon-orange" />
            <span>Gestión de Proyecto</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-background"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nuevo
            </Button>
            <Button
              variant="neon"
              size="sm"
              onClick={onSaveProject}
            >
              <Save className="h-4 w-4 mr-1" />
              Guardar
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Selecciona un proyecto existente o crea uno nuevo
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Select value={selectedProject} onValueChange={onProjectChange}>
          <SelectTrigger className="bg-input border-primary/20 focus:border-primary">
            <SelectValue placeholder="Selecciona o crea un proyecto" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-primary/20">
            <SelectItem value="new-project">
              <div className="flex items-center space-x-2">
                <Plus className="h-4 w-4 text-neon-green" />
                <span>Crear Nuevo Proyecto</span>
              </div>
            </SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{project.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Creado: {project.created}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};