import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, File, Locate, Mail, Phone, Upload, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router';


function ProfileCompany() {
    const navigate = useNavigate();
    


    return(
        <>

            <div className="grid items-center p-4 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  w-full">
                <div>
                    <h2 className="text-4xl font-bold">
                        Mi Perfil
                    </h2>
                    <p className="text-gray-500">
                        Visualiza y gestiona tu información personal y profesional
                    </p>
                </div>
                <Button onClick={() => navigate('/dashboard-company/edit-profile')}
                    className="bg-amber-500 mr-auto ml-auto w-full md:ml-auto md:w-[50%] md:mr-0 hover:bg-amber-600 hover:cursor-pointer">
                    Editar Perfil
                </Button>
            </div>
            <div className="grid items-start p-4 grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Información de la empresa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                        <div className='w-full flex flex-col items-center'>
                            <Avatar className='w-[100px] h-[100px] mb-4'>
                                <AvatarFallback className='text-4xl'>
                                    YO
                                </AvatarFallback>
                            </Avatar>
                            <p className='text-2xl font-medium'>
                                YesOwl
                            </p>
                            <p className='text-gray-500'>
                                Tecnología
                            </p>
                        </div>

                        <ul className="flex flex-col gap-2 mt-4">
                            {/* Aquí hay que hace el mapeo */}
                            <li className='flex gap-4 items-center'>
                                <Mail size={20}/>
                                <p className='text-gray-500'>
                                    yesowlrrhh@yesowl.com
                                </p>
                            </li>
                            <li className='flex gap-4 items-center'>
                                <Phone size={20}/>
                                <p className='text-gray-500'>
                                    4181582406
                                </p>
                            </li>
                            <li className='flex gap-4 items-center'>
                                <Locate size={20}/>
                                <p className='text-gray-500'>
                                    Irapuato Gto.
                                </p>
                            </li>
                            <li className='flex gap-4 items-center'>
                                <File size={20}/>
                                <p className='text-gray-500'>
                                    fundada en 2024
                                </p>
                            </li>
                            <li className='flex gap-4 items-center'>
                                <Users2 size={20}/>
                                <p className='text-gray-500'>
                                    4 empleados
                                </p>
                            </li>
                        </ul>
                        
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                        <p className='font-medium'>Sobre la empresa</p>
                        <p className='text-sm text-gray-500'>
                            Conectamos empresas con estudiantes y recién egresados a través de un 
                            software diseñado para facilitar oportunidades de prácticas profesionales y 
                            primeros empleos, impulsando el desarrollo profesional y el talento joven.
                        </p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Logo o fotografía
                        </CardTitle>
                        <CardDescription>
                            Gestiona la imágen de tu empresa
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 text-center">
                                <div className="h-32 w-32 mx-auto bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-4xl font-bold text-amber-700">YO</span>
                                </div>
                                <p className="text-sm font-medium mb-2">Vista previa</p>
                                <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Confirmar y Subir
                                </Button>
                            </div>
                            <div className="border rounded-lg p-4 text-center">
                                <div className="h-32 w-full bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <Building2 className="h-12 w-12 text-gray-400" />
                                </div>
                                <p className="text-sm font-medium mb-2">Selecciona la imagen</p>
                                <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Cargar imagen
                                </Button>
                            </div>
                        </div>
                        
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}


export default ProfileCompany;