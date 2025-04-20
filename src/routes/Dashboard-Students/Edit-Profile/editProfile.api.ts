
import axios from 'axios';
import { InterfaceUpdateStudentPersonalInfo } from './editProfile.types';
import { toast } from 'sonner';


const API_URL = import.meta.env.VITE_API_REST_INNOVATEC ?? "http://localhost:3001/api/";


export async function updateStudentPersonalInfo( studentId: string | undefined, data: InterfaceUpdateStudentPersonalInfo ){
    await axios.patch(`${API_URL}students/update/${studentId}`, {
        firstName: data.firstName,
        paternalSurname: data.paternalSurname,
        maternalSurname: data.maternalSurname,
        contact_email: data.email,
        phone_number: data.phone,
        career: data.career,
    })

}


export async function updateStudentSkills( studentId: string | undefined, data: string[] ){

    await axios.patch(`${API_URL}students/update/${studentId}`, {
        skills: data,
    })

    console.log("Habilidades del estudiante actualizadas")

}

export async function updateStudentLanguages( studentId: string | undefined, data: string[] ){

    await axios.patch(`${API_URL}students/update/${studentId}`, {
        languages: data,
    })

    console.log("Habilidades del estudiante actualizadas")

}


export async function handleErrors(error: any) {
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
}