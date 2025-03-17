import { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Funcionando')
    
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo del búho */}
        {/* <div className="mb-6 relative w-40 h-40">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AldG6JztvqxVWSOeZeOGgtPcZqpXdP.png"
            alt="Logo de búho"
            className="w-full h-full object-contain rounded=[100px]"
          />
        </div> */}

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
              onClick={handleLogin} 
              className="w-full hover:cursor-pointer"
              variant={'default'}>
                Ingresar
              </Button>

              <div className="text-center mt-2">
                <a href="#" className="text-sm text-amber-600 hover:text-amber-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>

          <div className="bg-slate-800 p-4">
            <p className="text-center text-white text-sm">
              © {new Date().getFullYear()} Yes Owl. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
