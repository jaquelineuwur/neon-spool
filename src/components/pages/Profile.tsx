import { useState } from "react";
import { User, Mail, LogOut, Settings, Globe, Moon, Sun, Edit, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface ProfileProps {
  onNavigate: (tab: string) => void;
}

const Profile = ({ onNavigate }: ProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  const [profileData, setProfileData] = useState({
    name: "Javier Prieto",
    email: "javier@email.com",
    phone: "+52 55 1234 5678",
    company: "3D Innovations",
    language: "es",
    timezone: "America/Mexico_City"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "¡Perfil actualizado!",
      description: "Tus cambios han sido guardados exitosamente.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
  };

  const stats = [
    { label: "Proyectos completados", value: "47", color: "text-neon-cyan" },
    { label: "Material usado", value: "12.5 kg", color: "text-neon-purple" },
    { label: "Ingresos totales", value: "$25,480 MXN", color: "text-neon-green" },
    { label: "Tiempo de impresión", value: "156 hrs", color: "text-neon-yellow" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Perfil de Usuario</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y preferencias
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-dark border-primary/20">
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src="/api/placeholder/96/96" />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-background">
                    JP
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="neon"
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-foreground">{profileData.name}</CardTitle>
              <CardDescription className="text-neon-cyan">
                Diseñador 3D Profesional
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-neon-cyan" />
                <span className="text-sm text-foreground">{profileData.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-neon-purple" />
                <span className="text-sm text-foreground">{profileData.company}</span>
              </div>
              
              <div className="pt-4 border-t border-primary/20">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleLogout}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-gradient-dark border-secondary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Estadísticas</CardTitle>
              <CardDescription>Resumen de tu actividad</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{stat.label}:</span>
                  <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-gradient-dark border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tus datos personales y de contacto
                </CardDescription>
              </div>
              <Button
                variant={isEditing ? "neon" : "outline"}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Nombre completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card border-primary/20 focus:border-primary disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card border-primary/20 focus:border-primary disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card border-primary/20 focus:border-primary disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground">Empresa</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card border-primary/20 focus:border-primary disabled:opacity-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-gradient-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Settings className="h-5 w-5 text-neon-cyan" />
                <span>Preferencias</span>
              </CardTitle>
              <CardDescription>
                Configura tu experiencia en la aplicación
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-foreground flex items-center space-x-1">
                    <Globe className="h-4 w-4 text-neon-purple" />
                    <span>Idioma</span>
                  </Label>
                  <Select value={profileData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="bg-card border-primary/20">
                      <SelectValue placeholder="Selecciona idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español (ES)</SelectItem>
                      <SelectItem value="en">English (EN)</SelectItem>
                      <SelectItem value="fr">Français (FR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-foreground">Zona horaria</Label>
                  <Select value={profileData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger className="bg-card border-primary/20">
                      <SelectValue placeholder="Selecciona zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground flex items-center space-x-2">
                      <Moon className="h-4 w-4 text-neon-cyan" />
                      <span>Modo Oscuro</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Activa el tema oscuro de la aplicación
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Notificaciones</Label>
                    <p className="text-xs text-muted-foreground">
                      Recibir alertas sobre el estado de impresiones
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-dark border-secondary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
              <CardDescription>
                Accede rápidamente a las funciones principales
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => onNavigate("inventory")}
                  className="h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <User className="h-6 w-6" />
                  <span>Ver Inventario</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => onNavigate("add")}
                  className="h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <Settings className="h-6 w-6" />
                  <span>Agregar Material</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => onNavigate("history")}
                  className="h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <Globe className="h-6 w-6" />
                  <span>Ver Historial</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;