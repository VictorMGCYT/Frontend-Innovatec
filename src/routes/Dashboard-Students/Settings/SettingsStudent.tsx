import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";



function SettingsStudents() {
    const [passData, setPassData] = useState({
        currentPass: "",
        newPass: "",
        confirmPass: ""
    })
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if( passData.newPass !== passData.confirmPass ){
            toast.error("Error", {
                description: "Las contaseñas no coinciden",                
            })
        }else{
            toast("Listo!", {
                description: "Contraseñas cambiadas correctamente"
            })
        }

    }

    return (
        <>
            <div className="grid items-center p-6 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  w-full">
                <div>
                    <h2 className="text-4xl font-bold">
                        Configuración
                    </h2>
                    <p className="text-gray-500">
                        Administra tu cuenta y preferencias                    
                    </p>
                </div>
                <div></div>
            </div>
            <div className="flex justify-center gap-4 p-6  w-full">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="account">Cuenta</TabsTrigger>
                        <TabsTrigger value="password">Contraseña</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Información de la cuenta
                                </CardTitle>
                                <CardDescription>Información básica de tu cuenta</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid items-start grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 w-full">
                                    <div className="flex flex-col">
                                        <p className="font-medium">Nombre de usuario:</p>
                                        <span className="flex items-center gap-2">
                                            <User size={20}/><p>Victor Manuel</p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Email:</p>
                                        <span className="flex items-center gap-2">
                                            <Mail size={20}/><p>victor@gmail.com</p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Fecha de registro:</p>
                                        <span className="flex items-center gap-2">
                                            <p>10 de Enero del 2025</p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Ultimo acceso:</p>
                                        <span className="flex items-center gap-2">
                                            <p>Hoy a las 8:40am</p>
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                    <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Cambiar Contraseña
                                </CardTitle>
                                <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid items-start grid-cols-1 md:grid-cols-[1fr] gap-4 w-full">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="current-pass" className="text-md">
                                                Contraseña Actual
                                            </Label>
                                            <Input 
                                                onChange={ (e) =>setPassData( prev => ({...prev, currentPass: e.target.value}) )}
                                                id="current-pass" 
                                                type="password"/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="current-pass" className="text-md">
                                                Nueva Contraseña
                                            </Label>
                                            <Input 
                                                onChange={ e => setPassData( prev => ({...prev, newPass: e.target.value}))}
                                                id="new-pass" 
                                                type="password"/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="current-pass" className="text-md">
                                                Confirmar Nueva Contraseña
                                            </Label>
                                            <Input
                                                onChange={ e => setPassData( prev => ({...prev, confirmPass: e.target.value}))}
                                                id="confirm-new-pass" 
                                                type="password"/>
                                        </div>
                                    </div>
                                    <Button 
                                        className="mt-6 w-full bg-amber-500 hover:bg-amber-600 hover:cursor-pointer" 
                                        type="submit">
                                        Cambiar Contraseña
                                    </Button>
                                </form>
                            </CardContent>
                            
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="flex justify-center gap-4 pl-6 pr-6 w-full mb-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-red-400 font-bold">
                            Zona de Peligro
                        </CardTitle>
                        <CardDescription>
                            Acciones irreversibles para tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant={"destructive"} className="border-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Avertencia</AlertTitle>
                        <AlertDescription>
                            Las siguientes acciones son permanentes y no se pueden deshacer.
                        </AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            className="w-full border border-red-400 bg-transparent text-red-400
                            hover:bg-red-50 hover:text-black hover:cursor-pointer">
                            Eliminar cuenta
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}


export default SettingsStudents;