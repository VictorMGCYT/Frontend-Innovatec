import WorkInProgressCard from "@/components/personal-components/WorkInProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudent } from "@/hooks/useStudent";
import axios from "axios";
import { FileText, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


const API_URL = import.meta.env.VITE_API_REST_INNOVATEC ?? "http://localhost:3001/api/";

function DocumentsStudents() {
    const student = useStudent();
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [cvError, setCvError] = useState<string | null>(null)
    const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    // Referencias para los inputs de archivo
    const cvInputRef = useRef<HTMLInputElement>(null)

    // Manejar la subida del CV
    const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setCvError(null)

        if (!file) return

        // Validar tipo de archivo
        if (file.type !== "application/pdf") {
        setCvError("El archivo debe ser un PDF")
        return
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
        setCvError("El archivo no debe exceder 5MB")
        return
        }

        setCvFile(file)

        // Crear URL para previsualización
        const fileUrl = URL.createObjectURL(file)
        setCvPreviewUrl(fileUrl)
    }

    function handleDeleteCv() {
        setCvFile(null)
        setCvPreviewUrl(null)
        if (cvInputRef.current) cvInputRef.current.value = ""
    }

    useEffect(()=>{
        if (cvError) {
            toast.error("Error", {
                description: cvError
            })
        }
    }, [cvError])
    

    // Manejo de subida del CV al servidor
    async function uploadCv(){
        if(!cvFile){
            toast.error("Error", {
                description: "No hay archivo para subir, por favor selecciona uno"
            })
            return
        }

        const formData = new FormData();
        formData.append("file", cvFile);

        try {

            const studentId = student?.id;

            setLoading(true);
            await axios.patch(`${API_URL}students/upload-cv/${studentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            toast.success("CV subido", {
                description: "Tu CV ha sido subido correctamente"
            })
        } catch (error) {
            toast.error("Error al subir el CV", {
                description: `Por favor, intenta de nuevo más tarde.`
            });
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className="grid items-center p-6 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  w-full">
                <div>
                    <h2 className="text-4xl font-bold">
                        Documentos
                    </h2>
                    <p className="text-gray-500">
                        Administra tu curriculum y fotografía                  
                    </p>
                </div>
                <div></div>
            </div>
            <div className="flex justify-center gap-4 p-6  w-full">
                <Tabs defaultValue="cv" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="cv">Curriculum</TabsTrigger>
                        <TabsTrigger value="picture">Foto de Perfil</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cv">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Curriculum Vitae
                                </CardTitle>
                                <CardDescription>
                                    Sube tu CV en formato PDF. Tamaño máximo: 5MB.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {
                                    cvFile ? 
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                            <FileText className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                            <p className="font-medium">{cvFile.name}</p>
                                            <p className="text-sm text-muted-foreground">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="destructive" size="icon" 
                                            onClick={handleDeleteCv}
                                            >
                                            <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        </div>
                                    </div>
                                    :
                                    <div 
                                        className="w-full flex items-center justify-center
                                        p-8 rounded-xl flex-col gap-2 border-2 border-dashed
                                        hover:cursor-pointer"
                                        onClick={() => cvInputRef.current?.click()}>
                                        <FileText className="h-10 w-10 text-muted-foreground"/>
                                        <p className="font-medium">
                                            Haz clic para subir tu CV
                                        </p>
                                        <input 
                                        ref={cvInputRef} 
                                        type="file" 
                                        accept=".pdf" 
                                        className="hidden" 
                                        onChange={handleCvUpload} 
                                        />
                                    </div>
                                }
                                <Button className="mt-4 bg-amber-500 hover:bg-amber-600
                                    hover:cursor-pointer"
                                    onClick={uploadCv}
                                    disabled={loading}>
                                    { loading ? "Subiendo..." : "Subir archivo"}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="picture">
                        <WorkInProgressCard/>
                    </TabsContent>
                </Tabs>
            </div>
           
        </>
    )
}


export default DocumentsStudents;