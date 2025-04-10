import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import axios from 'axios';
import validateFormData from "@/utils/validations/validate-register";
import { CARRERAS } from "@/utils/global-variables/careers";


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
      // Validación todos los datos del formulario
      validateFormData(formData)

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
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const errorMessage: string = error.response?.data.message;
        console.log(errorMessage);
        if(errorMessage.includes('Key (email)')){
          toast.error("Error", {
            description: "El correo ya se encuentra registrado"
          })
        }
        if(errorMessage.includes('Key (phone_number)')){
          toast.error("Error", {
            description: "El número de teléfono ya se encuentra registrado"
          })
        }

      } else {
        console.log("Unexpected error");
      }
    }
  }
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gray-50 p-4 dark:bg-neutral-900">
    <div className="w-full max-w-3xl flex flex-col items-center">
        <Card className="w-full bg-white shadow-xl rounded-tl-2xl 
          rounded-tr-xl mt-5 dark:bg-neutral-900">
          <CardHeader className="bg-amber-500 text-white h-[90px] mt-[-35px] rounded-tl-2xl  rounded-tr-2xl">
            <div className="flex items-center mt-4">
              <Link to="/Login" className="mr-4">
                <Button variant="ghost" size="icon" className="text-white hover:text-slate-100">
                  <ChevronLeft className="h-5 w-5 dark:stroke-black" />
                </Button>
              </Link>
              <div>
                <CardTitle className="text-2xl dark:text-black">Registro de Usuario</CardTitle>
                <CardDescription className="text-white dark:text-black">
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
                  <Label htmlFor="nombre">Nombres</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
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
                    className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label >Carrera</Label>
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

              <Button 
              disabled={loading}
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600">
                {loading === false ? "Registrarse" : "Registrando..."}
                
              </Button>

              
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 bg-slate-50 p-6 dark:bg-neutral-950  ">

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