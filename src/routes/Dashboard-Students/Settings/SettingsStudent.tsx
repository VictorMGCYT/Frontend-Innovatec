import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudent } from "@/hooks/useStudent";
import { capitalizeWords } from "@/utils/global-functions/capitalize-words";
import validatePassword from "@/utils/validations/validate-password";
import axios from "axios";
import { AlertCircle, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_REST_INNOVATEC ?? "http://localhost:3001/api/";

function SettingsStudents() {
    const student = useStudent();
    const navigate = useNavigate();

    const [passData, setPassData] = useState({
        currentPass: "",
        newPass: "",
        confirmPass: ""
    })
    
    async function handleSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        validatePassword(passData.newPass);

        if( passData.newPass !== passData.confirmPass ){
            toast.error("Error", {
                description: "Las contaseñas no coinciden",                
            })
        }

        try {

            const token = sessionStorage.getItem("token");

            if(!token) return navigate("/Login");

            const payload = JSON.parse(atob(token.split(".")[1]));

            const userId = payload.id;

            await axios.patch(`${API_URL}auth/update-password`, {
                id: userId,
                password: passData.currentPass,
                newPassword: passData.newPass
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success("Listo!", {
                description: "Contraseñas cambiadas correctamente"
            })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
    
               if (status === 400) {
                    toast.error("Error", {
                        description: "Contraseña actual incorrecta",
                    });
                } else if (status === 500) {
                    toast.error("Error del servidor", {
                        description: "Intenta nuevamente más tarde.",
                    });
                } else {
                    toast.error("Error", {
                        description: `Ocurrió un error inesperado (${status}).`,
                    });
                }
            } else {
                toast.error("Error de red", {
                    description: "No se pudo conectar con el servidor.",
                });
            }
        }

    }

    async function deleteAccount() {
        try {

            const studentId = student?.id;

            await axios.delete(`${API_URL}students/delete/${studentId}`);

            toast.success("Cuenta eliminada", {
                description: "Tu cuenta ha sido eliminada correctamente",
            });
            sessionStorage.removeItem("token"); // Elimina el token

            setTimeout(() => {
                navigate("/Login"); // Redirige al login	
            }, 2000);
            
        } catch (error: any) {
            toast.error("Error", {
                description: "Error al intentar eliminar la cuenta"
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
                                            <User size={20}/>
                                            <p>
                                                {`${capitalizeWords(student?.firstName)} ${capitalizeWords(student?.paternalSurname)} ${capitalizeWords(student?.maternalSurname)}`}
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Email:</p>
                                        <span className="flex items-center gap-2">
                                            <Mail size={20}/><p>{student?.contact_email}</p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Fecha de registro:</p>
                                        <span className="flex items-center gap-2">
                                            <p>{student?.createdAt.toString()}</p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Teléfono:</p>
                                        <span className="flex items-center gap-2">
                                            <p>{student?.phone_number}</p>
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
                                <form onSubmit={handleSubmitPassword}>
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
                            onClick={deleteAccount}
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