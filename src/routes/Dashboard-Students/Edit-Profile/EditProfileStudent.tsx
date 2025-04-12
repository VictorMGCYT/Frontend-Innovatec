import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudent } from "@/hooks/useStudent";
import { capitalizeWords } from "@/utils/global-functions/capitalize-words";
import { CARRERAS } from "@/utils/global-variables/careers";
import validatePersonalInfo from "@/utils/validations/validate-personal-info";
import { Loader, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { updateStudentPersonalInfo } from "./editProfile.api";
import { toast } from "sonner";
import WorkInProgressCard from "@/components/personal-components/WorkInProgress";

   


function EditProfileStudent() {
    const student = useStudent();
    const [loading, setLoading] = useState(false);
    const [loadingContent, setLoadingContent] = useState(true);
    const navigate = useNavigate();

    // Formulario para la información personal
    const [personalDataForm, setPersonalDataForm] = useState({
        firstName: "",
        paternalSurname: "",
        maternalSurname: "",
        email: "",
        phone: "",
        career: ""
    })

    useEffect(() => {
        if(student){
            // Se pasan los datos del hook al estado
            setPersonalDataForm({
                firstName: student?.firstName || "",
                paternalSurname: student?.paternalSurname || "",
                maternalSurname: student?.maternalSurname || "",
                email: student?.contact_email || "",
                phone: student?.phone_number || "",
                career: student?.career || ""
            })
            setLoadingContent(false);
        }
    }, [student])


    async function handleSubmitPersonal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            validatePersonalInfo(personalDataForm);
            setLoading(true);

            const studentId = student?.id;
            await updateStudentPersonalInfo(studentId, personalDataForm);

            toast.message("Datos actualizados", {
                description: "Los datos se han actualizado exitosamente",
            })

        } catch (error: any) {
            if (error.response) {
                // El servidor respondió con un código de error (400, 404, etc.)
                if (error.response.status === 400) {
                    toast.error("Datos inválidos", {
                        description: "Verifica los campos ingresados.",
                    });
                } else {
                    toast.error("Error del servidor", {
                        description: `Error ${error.response.status}: ${error.response.data?.message || 'Algo salió mal'}`,
                    });
                }
            } else if (error.request) {
                // La petición se hizo pero no hubo respuesta (sin conexión o el servidor no responde)
                toast.error("Sin conexión", {
                    description: "No se pudo conectar con el servidor. Revisa tu conexión a internet.",
                });
            } 
        } finally {
            setLoading(false)
        }
    }

    return (
        <> 
            {
                loadingContent ? (
                <div className="fixed top-0 left-0 w-full h-screen bg-black/80 z-30">
                <div className="flex flex-col items-center justify-center w-full h-screen">
                    <Loader2 size={80} className="animate-spin text-amber-500" />
                    <p className="text-white">Cargando...</p>
                </div>
                </div>
                )
                : null
            }
            <div className="grid items-center p-4 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  w-full">
                <div>
                    <h2 className="text-4xl font-bold">
                        Editar Perfil
                    </h2>
                    <p className="text-gray-500">
                        Actualiza tu información personal y profesional
                    </p>
                </div>
                <div></div>
            </div>
            <div className="grid place-items-center p-4 grid-cols-1 gap-4 w-full mb-8">
                <Tabs defaultValue="personal" className="w-[90%] md:w-[80%] max-w-[900px]">
                    <TabsList 
                        className="w-full h-[50px] bg-gray-200 md:h-auto 
                        dark:bg-neutral-900">  
                        <TabsTrigger className="whitespace-normal" value="personal">
                                Información Personal
                        </TabsTrigger>
                        <TabsTrigger className="whitespace-normal" value="skills">Habilidades e Idiomas</TabsTrigger>
                        <TabsTrigger value="experience">Experiencia</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">
                                    Información Personal
                                </CardTitle>
                                <CardDescription>
                                    Actualiza tus datos personales y de contacto
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmitPersonal} className="space-y-6">
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">Nombres</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Nombre"
                                                onChange={ e => (
                                                    setPersonalDataForm( prev => ({
                                                        ...prev, 
                                                        firstName: e.target.value})
                                                    )
                                                )}
                                                value={capitalizeWords(personalDataForm?.firstName)}
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
                                                onChange={ e => (
                                                    setPersonalDataForm( prev => ({
                                                        ...prev, 
                                                        paternalSurname: e.target.value})
                                                    )
                                                )}
                                                value={capitalizeWords(personalDataForm?.paternalSurname)}
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
                                                onChange={ e => (
                                                    setPersonalDataForm( prev => ({
                                                        ...prev, 
                                                        maternalSurname: e.target.value})
                                                    )
                                                )}
                                                value={capitalizeWords(personalDataForm?.maternalSurname)}
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
                                                onChange={ e => (
                                                    setPersonalDataForm( prev => ({
                                                        ...prev, 
                                                        email: e.target.value})
                                                    )
                                                )}
                                                value={personalDataForm?.email}
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
                                                onChange={ e => (
                                                    setPersonalDataForm( prev => ({
                                                        ...prev, 
                                                        phone: e.target.value})
                                                    )
                                                )}
                                                value={personalDataForm?.phone}
                                                className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label >Carrera</Label>
                                            <Select
                                                value={personalDataForm?.career}
                                                onValueChange={(value) => setPersonalDataForm((prev) => ({ ...prev, career: value }))}
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
                                        className="bg-amber-500 hover:bg-amber-600 hover:cursor-pointer">
                                        <Save/> {loading ? "Guardando..." : "Guardar Cambios"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="skills">
                        <Card className="w-full">
                            <CardHeader className=" pb-2">
                                <CardTitle className="text-3xl">
                                    Habilidades e Idiomas
                                </CardTitle>
                                <CardDescription>
                                    Actualiza tus habilidades e idiomas
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="experience">
                        <WorkInProgressCard/>
                    </TabsContent>
                </Tabs>
            </div>

        </>
    )

}

export default EditProfileStudent;