import { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import axios from 'axios';
import { toast } from "sonner";
import validatePassword from '@/utils/validations/validate-password'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const urlEnv = import.meta.env.VITE_API_REST_INNOVATEC ?? `http://localhost:3001/api/`

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Función ubicada en la carpeta commons
    validatePassword(password)
    setLoading(true);


    // Lógica de autenticación
    try {
      const response = await axios.post(`${urlEnv}auth/login`, {
        "email": email.toLowerCase().trim(),
        "password": password
      });


      const data = response.data;
      // TODO guardar el token
      sessionStorage.setItem('token', data.token);

      // 🔥 Decodificar el token para obtener el rol
      const payload = JSON.parse(atob(data.token.split(".")[1]));  
      const userRole = payload.role;
    
      // 🔀 Redirigir según el rol
      if (userRole === "student") {
        navigate('/dashboard-student/profile');
      } else if (userRole === "company") {
        navigate('/dashboard-company/profile');
      } else {
        navigate('/home'); // Ruta por defecto en caso de error
      }
    } catch (error) {
      // ! Error en caso de que el usuario o contraseña sean incorrectos
      toast.error("Error", {
        description: "Correo o contraseña incorrectos",
      });
      
    }finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center 
        justify-center bg-gray-50 p-4 dark:bg-neutral-900">
      <div className="w-full max-w-md flex flex-col items-center">

        <div 
          className="w-full bg-white rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.6)] 
          overflow-hidden dark:bg-neutral-900">
          <div className="p-8">
            <h1 
              className="text-3xl font-bold text-center text-slate-800 mb-6 dark:text-white">
              Iniciar Sesión
            </h1>

            <form onSubmit={handleLogin} className='space-y-4'>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-gray-400">
                  Email:
                </Label>
                <Input
                  required
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-gray-400">
                  Contraseña:
                </Label>
                <Input
                  required
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500 "
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button 
              disabled={loading}
              type='submit'
              className="w-full hover:cursor-pointer bg-amber-500 hover:bg-amber-600"
              variant={'default'}>
                { loading ? "Iniciando Sesión..." : "Ingresar" }
              </Button>

              <div className="flex flex-col text-center gap-2">
                {/* <Link href="#" className="text-sm text-amber-600 hover:text-amber-700">
                  ¿Olvidaste tu contraseña?
                </Link> */}
                <Link to='/register-student' className="text-xs text-amber-600 hover:text-amber-700">
                  ¿Eres estudiante y no tienes cuenta? Registrate
                </Link>
                <Link to='/register-company' className="text-xs text-amber-600 hover:text-amber-700">
                  ¿Eres una empresa y no tienes cuenta? Registrate
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-slate-100 p-4 dark:bg-neutral-950">
            <p className="text-center text-slate-600 text-sm">
              © {new Date().getFullYear()} Yes Owl. Todos los derechos reservados, los izquierdos también.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
