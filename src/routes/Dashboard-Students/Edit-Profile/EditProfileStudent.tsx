import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudent } from "@/hooks/useStudent";
import { CARRERAS } from "@/utils/global-variables/careers";
import validatePersonalInfo from "@/utils/validations/validate-personal-info";
import { Save } from "lucide-react";
import React, { useState } from "react";


   


function EditProfileStudent() {
    const student = useStudent();

    const [dataForm, setDataForm] = useState({
        firstName: "",
        paternalSurname: "",
        maternalSurname: "",
        email: "",
        phone: "",
        career: ""
    })

   

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(dataForm);
        // Validamos los datos para que coincidan
        try {
            validatePersonalInfo(dataForm);
        } catch (error) {
            
        }
    }

    return (
        <>
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
                        <TabsTrigger value="personal">
                                Información Personal
                        </TabsTrigger>
                        <TabsTrigger value="skills">Habilidades e Idiomas</TabsTrigger>
                        <TabsTrigger value="languages">Experiencia</TabsTrigger>
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
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">Nombres</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Nombre"
                                                onChange={ e => (
                                                    setDataForm( prev => ({
                                                        ...prev, 
                                                        firstName: e.target.value})
                                                    )
                                                )}
                                                value={dataForm.firstName}
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
                                                    setDataForm( prev => ({
                                                        ...prev, 
                                                        paternalSurname: e.target.value})
                                                    )
                                                )}
                                                value={dataForm.paternalSurname}
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
                                                    setDataForm( prev => ({
                                                        ...prev, 
                                                        maternalSurname: e.target.value})
                                                    )
                                                )}
                                                value={dataForm.maternalSurname}
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
                                                    setDataForm( prev => ({
                                                        ...prev, 
                                                        email: e.target.value})
                                                    )
                                                )}
                                                value={dataForm.email}
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
                                                    setDataForm( prev => ({
                                                        ...prev, 
                                                        phone: e.target.value})
                                                    )
                                                )}
                                                value={dataForm.phone}
                                                className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label >Carrera</Label>
                                            <Select
                                                value={dataForm.career}
                                                onValueChange={(value) => setDataForm((prev) => ({ ...prev, career: value }))}
                                            >
                                                <SelectTrigger className="border-slate-300 focus:border-amber-500 focus:ring-amber-500">
                                                <SelectValue  placeholder="Selecciona tu carrera" />
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
                                        type="submit"
                                        className="bg-amber-500 hover:bg-amber-600 hover:cursor-pointer">
                                        <Save/> Guardar Cambios
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="skills">Change your password here.</TabsContent>
                    <TabsContent value="languages">Change your languages here.</TabsContent>
                </Tabs>
            </div>

        </>
    )

}

export default EditProfileStudent;