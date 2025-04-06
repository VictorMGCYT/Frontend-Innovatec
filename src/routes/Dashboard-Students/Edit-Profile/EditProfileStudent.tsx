import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";




function EditProfileStudent() {

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
            <div className="grid place-items-center p-4 grid-cols-1 gap-4 w-full">
                <Tabs defaultValue="personal" className="w-[80%] max-w-[900px]">
                    <TabsList className="w-full h-[50px] bg-gray-200 md:h-auto">  
                        <TabsTrigger className="whitespace-normal text-center" value="personal">Información Personal</TabsTrigger>
                        <TabsTrigger value="skills">Habilidades</TabsTrigger>
                        <TabsTrigger value="languages">Idiomas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal">Make changes to your account here.</TabsContent>
                    <TabsContent value="skills">Change your password here.</TabsContent>
                    <TabsContent value="languages">Change your languages here.</TabsContent>
                </Tabs>
            </div>

        </>
    )

}

export default EditProfileStudent;