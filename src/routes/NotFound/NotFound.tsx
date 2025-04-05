import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


function NotFound() {
    
    return (
        <>
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md text-center">
              <div className="mb-6">
                <div className="text-amber-500 font-bold text-9xl">404</div>
                <div className="relative w-32 h-32 mx-auto my-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="h-20 w-20 text-slate-300" strokeWidth={1.5} />
                  </div>
                  <div className="absolute top-0 right-0">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-500 text-xl">?</span>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-slate-800 mb-2">Página no encontrada</h1>
              <p className="text-slate-600 mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-amber-500 hover:bg-amber-600">
                  
                </Button>
                <Button asChild variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  
                </Button>
              </div>
            </div>
          </div>
        </>
    )

}


export default NotFound;