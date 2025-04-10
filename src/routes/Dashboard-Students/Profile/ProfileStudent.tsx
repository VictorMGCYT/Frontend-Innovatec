import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Hammer, Languages, Lightbulb, Mail, Phone, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useStudent } from "@/hooks/useStudent";
import { capitalizeWords } from "@/utils/global-functions/capitalize-words";


function ProfileStudent() {

    const student = useStudent(); // Aquí se obtiene el estudiante desde el hooks
    const [fullName, setFullName] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const navigate = useNavigate();

    
    useEffect(() => {

        setFullName(
            `${capitalizeWords(student?.firstName)} 
            ${capitalizeWords(student?.paternalSurname)} 
            ${capitalizeWords(student?.maternalSurname)}`);


        setSkills(student?.skills ?? [])
        setLanguages(student?.languages ?? [])

    }, [student])


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
                <Button onClick={() => navigate('/dashboard-student/edit-profile')}
                    className="bg-amber-500 mr-auto ml-auto w-full md:ml-auto md:w-[50%] md:mr-0 hover:bg-amber-600 hover:cursor-pointer">
                    Editar Perfil
                </Button>
            </div>
            <div className="grid items-start p-4 grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">
                            Información Personal
                        </CardTitle>
                        <CardDescription>{fullName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col gap-3">
                            <li className="flex gap-4">
                                <Mail/> {student?.contact_email}
                            </li>
                            <li className="flex gap-4">
                                <Phone/> {`+52 ${student?.phone_number}`}
                            </li>
                            <li className="flex gap-4">
                                <Hammer/> {`${student?.career.replace(/\b\w/, char => char.toUpperCase())}`}
                            </li>
                        </ul>
                        
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    <Dialog>
                        <DialogTrigger 
                            className="w-full text-white bg-amber-500 hover:bg-amber-600 
                            hover:text-white hover:cursor-pointer" 
                            asChild>
                            <Button 
                                className="dark:bg-amber-500 dark:hover:bg-amber-600 
                                dark:text-black hover:cursor-pointer" 
                                variant="outline">
                                Ver CV
                            </Button>
                        </DialogTrigger>
                        <DialogContent 
                        className={ 
                            !student?.cv_url ? "sm:max-w-[525px] sm:w-[90%]"
                            :  "sm:max-w-[1025px] sm:w-[90%]"}>
                            <DialogHeader>
                                <DialogTitle>Curriculum Vitae</DialogTitle>
                            </DialogHeader>
                            {
                                !student?.cv_url ?
                                <div className="flex flex-col items-center">
                                    <Search className="h-20 w-20 text-slate-300" strokeWidth={1.5} />
                                    <h3 className="w-[50%] text-center text-gray-500">
                                        No se ha encongtrado un CV cargado en tu perfil
                                    </h3>
                                </div>
                                :
                                <iframe
                                className="max-h-[80vh]"
                                src={student?.cv_url}
                                width="100%"  
                                height="600px" 
                                style={{ border: 'none' }}
                                title="PDF Viewer"
                                />
                            }
                        </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">
                            Habilidades e Idiomas
                        </CardTitle>
                        <CardDescription>
                            Mi información adicional
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-medium mb-4">
                            Idiomas
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {/* TODO Hacer un mapeo de los idiomas hablados */}
                            {
                                languages.length > 0 ?
                                languages.map((language, index) => {
                                    return (
                                        <li key={index} className="flex gap-4">
                                            <Languages/> {language}
                                        </li>
                                    )
                                })
                                :
                                <li className="flex gap-4 text-gray-500 w-[70%]">
                                    Tip: Agrega idiomas en editar perfil para
                                    mejorar tus oportunidades de ser reclutado
                                </li>
                            }
                        </ul>
                        <h3 className="text-lg font-medium mt-4 mb-4">
                            Habilidades
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {/* TODO Hacer un mapeo de las habilidades */}
                            {
                                skills.length > 0 ?
                                skills.map((skill, index) => {
                                    return (
                                        <li key={index} className="flex gap-4">
                                            <Lightbulb/> {skill}
                                        </li>
                                    )
                                })
                                :
                                <li className="flex gap-4 text-gray-500 w-[70%]">
                                    Tip: Agrega habilidades en editar perfil para
                                    mejorar tus oportunidades de ser reclutado
                                </li>
                            }
                        </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}


export default ProfileStudent;