import heroImage from "@/assets/hero-3d-printing.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20">
          <img 
            src={heroImage} 
            alt="Futuristic 3D printing workspace" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-primary/20"></div>
        </div>

        {/* Welcome Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-pulse-glow">
            3D Material Manager
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema avanzado de gestión de materiales para impresión 3D. 
            Controla tu inventario, calcula costos y mantén un historial completo de tus proyectos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-primary text-background px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 animate-pulse-glow"
            >
              Acceder a la Aplicación
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-dark p-6 rounded-lg border border-primary/20 hover:shadow-glow-primary transition-all duration-300">
            <h3 className="text-lg font-semibold text-neon-cyan mb-2">Inventario Inteligente</h3>
            <p className="text-sm text-muted-foreground">
              Gestiona tu stock de filamentos con alertas automáticas de bajo inventario
            </p>
          </div>
          
          <div className="bg-gradient-dark p-6 rounded-lg border border-secondary/20 hover:shadow-glow-secondary transition-all duration-300">
            <h3 className="text-lg font-semibold text-neon-purple mb-2">Cotización Precisa</h3>
            <p className="text-sm text-muted-foreground">
              Calcula costos exactos de impresión basados en material, tiempo y complejidad
            </p>
          </div>
          
          <div className="bg-gradient-dark p-6 rounded-lg border border-accent/20 hover:shadow-glow-accent transition-all duration-300">
            <h3 className="text-lg font-semibold text-neon-green mb-2">Historial Completo</h3>
            <p className="text-sm text-muted-foreground">
              Registra todos tus proyectos con estadísticas detalladas de rendimiento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
