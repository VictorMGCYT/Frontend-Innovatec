import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { File, Locate, Mail, Phone, Users2 } from 'lucide-react';


function EditProfileCompany() {

    


    return(
        <>

            <div className="grid items-center p-4 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  w-full">
                <div>
                    <h2 className="text-4xl font-bold">
                        Editar perfil de la empresa
                    </h2>
                    <p className="text-gray-500">
                        Gestiona la información de tu empresa y cómo se muestra                    
                    </p>
                </div>
            </div>
            <div className="grid items-start p-4 grid-cols-1 md:grid-cols-[1fr] gap-4 w-[80%] ml-auto mr-auto">
                <Card>  
                    <CardHeader>
                        <CardTitle className="text-2xl">
                        Información de la empresa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full flex flex-col items-center">
                        <Avatar className="w-[100px] h-[100px] mb-4">
                            <AvatarFallback className="text-4xl">YO</AvatarFallback>
                        </Avatar>
                        <p className="text-2xl font-medium">YesOwl</p>
                        <p className="text-gray-500">Tecnología</p>
                        </div>

                        <ul className="flex flex-col gap-2 mt-4">
                        <li className="flex gap-4 items-center">
                            <Mail size={20} />
                            <Input
                            type="email"
                            defaultValue="yesowlrrhh@yesowl.com"
                            className=" border-b border-gray-300 focus:outline-none focus:border-amber-500"
                            />
                        </li>
                        <li className="flex gap-4 items-center">
                            <Phone size={20} />
                            <Input
                            type="text"
                            defaultValue="4181582406"
                            className=" border-b border-gray-300 focus:outline-none focus:border-amber-500"
                            />
                        </li>
                        <li className="flex gap-4 items-center">
                            <Locate size={20} />
                            <Input
                            type="text"
                            defaultValue="Irapuato Gto."
                            className=" border-b border-gray-300 focus:outline-none focus:border-amber-500"
                            />
                        </li>
                        <li className="flex gap-4 items-center">
                            <File size={20} />
                            <Input
                            type="text"
                            defaultValue="fundada en 2024"
                            className=" border-b border-gray-300 focus:outline-none focus:border-amber-500"
                            />
                        </li>
                        <li className="flex gap-4 items-center">
                            <Users2 size={20} />
                            <Input
                            type="text"
                            defaultValue="4 empleados"
                            className=" border-b border-gray-300 focus:outline-none focus:border-amber-500"
                            />
                        </li>
                        </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2">
                        <p className="font-medium">Sobre la empresa</p>
                        <Textarea
                        className="w-full text-sm  border border-gray-300 rounded-md p-2 focus:outline-none focus:border-amber-500"
                        defaultValue="Conectamos empresas con estudiantes y recién egresados a través de un software diseñado para facilitar oportunidades de prácticas profesionales y primeros empleos, impulsando el desarrollo profesional y el talento joven."
                        rows={4}
                        />
                        <Button className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">
                        Guardar
                        </Button>
                    </CardFooter>
                </Card>

            </div>

        </>
    )
}


export default EditProfileCompany;