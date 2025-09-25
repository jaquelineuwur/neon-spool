import { Package, DollarSign, History, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HomeProps {
  onNavigate: (tab: string) => void;
}

const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Hola, Javier! 👋
        </h1>
        <p className="text-xl text-muted-foreground">
          Bienvenido a tu centro de control de materiales 3D
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-dark border-primary/20 hover:shadow-glow-primary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("inventory")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Inventario</CardTitle>
            <Package className="h-4 w-4 text-neon-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-cyan">12 materiales</div>
            <p className="text-xs text-muted-foreground">
              Ver inventario completo
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-dark border-secondary/20 hover:shadow-glow-secondary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("quote")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Nueva Cotización</CardTitle>
            <DollarSign className="h-4 w-4 text-neon-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-purple">Calcular</div>
            <p className="text-xs text-muted-foreground">
              Estimar costos de impresión
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-dark border-accent/20 hover:shadow-glow-accent transition-all duration-300 cursor-pointer" onClick={() => onNavigate("history")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Historial</CardTitle>
            <History className="h-4 w-4 text-neon-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-green">4 impresiones</div>
            <p className="text-xs text-muted-foreground">
              Proyectos recientes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Graph Section */}
      <Card className="bg-gradient-dark border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-neon-cyan" />
            <span>Uso de Materiales Este Mes</span>
          </CardTitle>
          <CardDescription>
            Seguimiento del consumo de materiales en septiembre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simulated graph bars */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">PLA Blanco</span>
                <span className="text-sm font-medium text-neon-cyan">2.5 kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ABS Negro</span>
                <span className="text-sm font-medium text-neon-purple">1.2 kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">PETG Transparente</span>
                <span className="text-sm font-medium text-neon-green">0.8 kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-accent h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="neon" size="lg" onClick={() => onNavigate("add")} className="animate-pulse-glow">
          Agregar Material
        </Button>
        <Button variant="outline" size="lg" onClick={() => onNavigate("inventory")}>
          Ver Inventario Completo
        </Button>
      </div>
    </div>
  );
};

export default Home;