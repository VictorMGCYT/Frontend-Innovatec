import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import validatePassword from "@/common/validatePassword/validate-password";
import axios from 'axios';


const CARRERAS = [
  "Ingeniería en Sistemas Computacionales",
  "Ingeniería Informática",
  "Ingeniería en Gestión Empresarial",
  "Ingeniería en Logistica",
]
  

export default function Register(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      nombre: "",
      apellidopaterno: "",
      apellidomaterno: "",
      email: "",
      password: "",
      confirmPassword: "",
      carrera: "",
      telefono: "",
    })
  const urlEnv = import.meta.env.VITE_API_REST_INNOVATEC ?? `http://localhost:3001/api/`
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      setLoading(true);
      // Validación de la contraseña
      validatePassword(formData.password)
      if(formData.password !== formData.confirmPassword ){
        toast.error("Error", {
          description: "Las contraseñas no coinciden",
        });
        throw new Error("Password and Confirm Password doesn't match");
      }
      if(!formData.carrera ){
        toast.error("Error", {
          description: "La carrera es requerida",
        });
        throw new Error("Career is required");
      }

      // Solicitud a la api para realizar el registro
      await axios.post(`${urlEnv}students/create`,{
        firstName: formData.nombre,
        paternalSurname: formData.apellidopaterno,
        maternalSurname: formData.apellidomaterno,
        career: formData.carrera,
        contact_email: formData.email,
        phone_number: formData.telefono,
        password: formData.password
      })

      setLoading(false);
      navigate('/Login')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        if(errorMessage.startsWith('Key (email)')){
          toast.error("Error", {
            description: "El correo ya se encuentra registrado"
          })
        }
        if(errorMessage.startsWith('Key (phone_number)')){
          toast.error("Error", {
            description: "El correo ya se encuentra registrado"
          })
          setLoading(false);
        }

      } else {
        console.log("Unexpected error");
        setLoading(false);
      }
    }
  }
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-3xl flex flex-col items-center">
        <Card className="w-full bg-white shadow-xl rounded-tl-2xl rounded-tr-xl mt-5">
          <CardHeader className="bg-amber-500 text-white h-[90px] mt-[-35px] rounded-tl-2xl  rounded-tr-2xl">
            <div className="flex items-center mt-4">
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
                    minLength={3}
                    maxLength={40}
                    className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidopaterno">Apellido Paterno</Label>
                  <Input
                    id="apellidopaterno"
                    name="apellidopaterno"
                    placeholder="Apellido Paterno"
                    value={formData.apellidopaterno}
                    onChange={handleInputChange}
                    required
                    minLength={3}
                    maxLength={20}
                    className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidomaterno">Apellido Materno</Label>
                  <Input
                    id="apellidomaterno"
                    name="apellidomaterno"
                    placeholder="Apellido Materno"
                    value={formData.apellidomaterno}
                    onChange={handleInputChange}
                    required
                    minLength={3}
                    maxLength={20}
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
                    maxLength={65}
                    className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Número de teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    minLength={10}
                    maxLength={10}
                    placeholder="123 456 7890"
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
                    maxLength={40}
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
                  <Label >Carrera</Label>
                  <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, carrera: value }))}
                    value={formData.carrera}
                    required
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

              <Button 
              disabled={loading}
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                {loading === false ? "Registrarse" : "Registrando..."}
                
              </Button>

              
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 bg-slate-50 p-6">

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