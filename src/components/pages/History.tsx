import { useState } from "react";
import { History as HistoryIcon, Search, Filter, Calendar, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const History = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  
  const projects = [
    {
      id: 1,
      name: "Llavero personalizado",
      material: "PLA Blanco",
      weight: 60,
      cost: 27,
      date: "20/09/2025",
      time: "2.5 hrs",
      status: "completed",
      client: "Cliente Personal",
      infill: 20,
      complexity: "simple"
    },
    {
      id: 2,
      name: "Soporte para teléfono",
      material: "PETG Transparente",
      weight: 200,
      cost: 90,
      date: "18/09/2025",
      time: "6 hrs",
      status: "completed", 
      client: "Juan Pérez",
      infill: 30,
      complexity: "medium"
    },
    {
      id: 3,
      name: "Engranaje prototipo",
      material: "ABS Negro",
      weight: 150,
      cost: 75,
      date: "15/09/2025",
      time: "4.5 hrs",
      status: "completed",
      client: "TechCorp",
      infill: 50,
      complexity: "complex"
    },
    {
      id: 4,
      name: "Figura decorativa",
      material: "PLA Azul",
      weight: 180,
      cost: 65,
      date: "12/09/2025", 
      time: "8 hrs",
      status: "completed",
      client: "María González",
      infill: 15,
      complexity: "medium"
    },
    {
      id: 5,
      name: "Herramienta personalizada",
      material: "TPU Flexible Rojo",
      weight: 90,
      cost: 120,
      date: "10/09/2025",
      time: "3 hrs",
      status: "completed",
      client: "AutoTaller SA",
      infill: 40,
      complexity: "complex"
    }
  ];

  const materials = ["Todos", "PLA Blanco", "ABS Negro", "PETG Transparente", "PLA Azul", "TPU Flexible Rojo"];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in-progress": return "secondary";
      case "failed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completado";
      case "in-progress": return "En progreso";
      case "failed": return "Fallido";
      default: return "Desconocido";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple": return "text-neon-green";
      case "medium": return "text-neon-yellow";
      case "complex": return "text-neon-pink";
      default: return "text-muted-foreground";
    }
  };

  const totalProjects = projects.length;
  const totalRevenue = projects.reduce((acc, p) => acc + p.cost, 0);
  const totalWeight = projects.reduce((acc, p) => acc + p.weight, 0);
  const avgCost = totalRevenue / totalProjects;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Historial de Impresiones</h1>
        <p className="text-muted-foreground">
          Seguimiento completo de todos tus proyectos 3D
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-dark border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-cyan">{totalProjects}</div>
            <p className="text-sm text-muted-foreground">Total Proyectos</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-secondary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-purple">
              ${totalRevenue.toLocaleString()} MXN
            </div>
            <p className="text-sm text-muted-foreground">Ingresos Totales</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-accent/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-green">
              {(totalWeight / 1000).toFixed(1)} kg
            </div>
            <p className="text-sm text-muted-foreground">Material Usado</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-destructive/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-yellow">
              ${avgCost.toFixed(0)} MXN
            </div>
            <p className="text-sm text-muted-foreground">Promedio por Proyecto</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48 bg-card border-primary/20">
              <SelectValue placeholder="Filtrar por material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((material) => (
                <SelectItem key={material} value={material.toLowerCase().replace(/\s+/g, '-')}>
                  {material}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48 bg-card border-primary/20">
              <SelectValue placeholder="Filtrar por fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fechas</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar proyectos..." 
              className="pl-10 bg-card border-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gradient-dark border-primary/20 hover:shadow-glow-primary transition-all duration-300">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Project Info */}
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <Badge variant={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">Material:</span>
                      <span className="text-neon-cyan font-medium">{project.material}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">Complejidad:</span>
                      <span className={`font-medium capitalize ${getComplexityColor(project.complexity)}`}>
                        {project.complexity}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Peso:</span>
                    <span className="text-sm font-medium text-foreground">{project.weight}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tiempo:</span>
                    <span className="text-sm font-medium text-foreground">{project.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Relleno:</span>
                    <span className="text-sm font-medium text-foreground">{project.infill}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fecha:</span>
                    <span className="text-sm font-medium text-foreground">{project.date}</span>
                  </div>
                </div>
                
                {/* Cost and Actions */}
                <div className="flex flex-col justify-between">
                  <div className="text-center lg:text-right">
                    <div className="text-2xl font-bold text-neon-green">
                      ${project.cost} MXN
                    </div>
                    <p className="text-sm text-muted-foreground">Costo total</p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          <HistoryIcon className="h-4 w-4 mr-2" />
          Cargar más proyectos
        </Button>
      </div>
    </div>
  );
};

export default History;