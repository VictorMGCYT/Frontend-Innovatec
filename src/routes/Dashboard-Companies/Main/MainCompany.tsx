import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { File, Users2 } from 'lucide-react';


function MainCompany() {

    


    return(
        <>

            <div className="grid items-center p-4 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  w-full">
                <div>
                    <h2 className="text-4xl font-bold">
                        Dashboard de la empresa
                    </h2>
                    <p className="text-gray-500">
                    Bienvenido al panel de control, aquí puedes gestionar tus búsquedas de talento.
                    </p>
                </div>
            </div>
            <div className="grid items-start p-4 grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-4 w-full">
                <Card>
                    <CardContent>
                        <div className='flex justify-between'>
                            <p className='font-medium'>Talentos vistos</p>
                            <Users2 size={20}/>
                        </div>
                        <p className='text-2xl font-bold mt-1'>{42}</p>
                        <p className='text-sm'>Perfiles de estudiantes visualizados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className='flex justify-between'>
                            <p className='font-medium'>Contrataciones</p>
                            <File size={20}/>
                        </div>
                        <p className='text-2xl font-bold mt-1'>{42}</p>
                        <p className='text-sm'>Perfiles de estudiantes visualizados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Busqueda rápida de talentos</CardTitle>
                        <CardDescription>Encuentra estudiantes y egresados según tus necesidades</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className='w-full'>
                            Ver catálogo completo
                        </Button>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>

        </>
    )
}


export default MainCompany;