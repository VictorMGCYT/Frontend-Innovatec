import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const CARRERAS = [
  "Ingeniería en Sistemas",
  "Ingeniería Informática",
  "Desarrollo de Software",
  "Administración de Empresas",
]
  

export default function Register(){

    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        confirmPassword: "",
        carrera: "",
        telefono: "",
      })
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Datos del formulario:", {
          ...formData,
        })
        // Aquí iría la lógica para enviar los datos al servidor
      }
    
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-3xl flex flex-col items-center">
            <Card className="w-full bg-white shadow-xl rounded-tl-2xl rounded-tr-2xl">
              <CardHeader className="bg-amber-500 text-white h-[80px] mt-[-35px] rounded-tl-2xl  rounded-tr-2xl">
                <div className="flex items-center mt-2">
                  <Link to="/Login" className="mr-4">
                    <Button variant="ghost" size="icon" className="text-white hover:text-slate-100">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <div>
                    <CardTitle className="text-2xl">Registro de Usuario</CardTitle>
                    <CardDescription className="text-white text-opacity-80">
                      Completa el formulario para crear tu cuenta
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
    
              <CardContent className="pl-6 pr-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Información personal */}
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="apellidos">Apellidos</Label>
                      <Input
                        id="apellidos"
                        name="apellidos"
                        placeholder="Apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        required
                        className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Número de teléfono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="+52 123 456 7890"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="carrera">Carrera</Label>
                      <Select
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, carrera: value }))}
                        value={formData.carrera}
                      >
                        <SelectTrigger className="border-slate-300 focus:border-amber-500 focus:ring-amber-500">
                          <SelectValue placeholder="Selecciona tu carrera" />
                        </SelectTrigger>
                        <SelectContent>
                          {CARRERAS.map((carrera) => (
                            <SelectItem key={carrera} value={carrera}>
                              {carrera}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
    
                  
                </form>
              </CardContent>
    
              <CardFooter className="flex flex-col space-y-4 bg-slate-50 p-6">
                <Button onClick={handleSubmit} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  Registrarse
                </Button>
    
                <p className="text-center text-sm text-slate-600">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/Login" className="text-amber-600 hover:text-amber-700 font-medium">
                    Iniciar sesión
                  </Link>
                </p>
              </CardFooter>
            </Card>
    
            <div className="mt-6 text-center text-slate-600 text-sm">
              © {new Date().getFullYear()} Yes Owl. Todos los derechos reservados.
            </div>
          </div>
        </div>
      )

}