import { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import axios from 'axios';
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const urlEnv = import.meta.env.VITE_API_REST_INNOVATEC ?? `http://localhost:3001/api/`

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (password.length < 6) {
      toast.error("Error", {
        description: "La contraseñá debe tener al menos 6 carcteres",
      });
      throw new Error("Password must be contained at least 6 characteres");
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Error", {
        description: "La contraseñá debe tener al menos 1 minúscula",
      });
      throw new Error("Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Error", {
        description: "La contraseñá debe tener al menos 1 mayúscula",
      });
      throw new Error("Password must contain at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
      toast.error("Error", {
        description: "La contraseñá debe tener al menos 1 número",
      });
      throw new Error("Password must contain at least one number.");
    }


    // Lógica de autenticación
    try {
      const response = await axios.post(`${urlEnv}auth/login`, {
        "email": email,
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
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md flex flex-col items-center">

        <div className="w-full bg-white rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.6)] overflow-hidden ">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Iniciar Sesión</h1>

            <form onSubmit={handleLogin} className='space-y-4'>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
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
                <Label htmlFor="password" className="text-slate-700">
                  Contraseña:
                </Label>
                <Input
                  minLength={6}
                  required
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button 
              type='submit'
              className="w-full hover:cursor-pointer bg-amber-500 hover:bg-amber-600"
              variant={'default'}>
                Ingresar
              </Button>

              <div className="flex flex-col text-center gap-2">
                {/* <Link href="#" className="text-sm text-amber-600 hover:text-amber-700">
                  ¿Olvidaste tu contraseña?
                </Link> */}
                <Link to='/Register' className="text-sm text-amber-600 hover:text-amber-700">
                  ¿No tienes cuenta? Registrate
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-slate-100 p-4">
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
