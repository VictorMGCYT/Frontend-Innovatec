
import axios from 'axios';
import { InterfaceUpdateStudentPersonalInfo } from './editProfile.types';


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

    console.log("Información personal del estudiante actualizada")
}