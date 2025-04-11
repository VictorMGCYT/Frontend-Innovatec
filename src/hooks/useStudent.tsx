import StudentInterface from "@/interfaces/student/student.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';



export function useStudent(){
    const [student, setStudent] = useState<StudentInterface>();
    const navigate = useNavigate();
    const urlEnv = import.meta.env.VITE_API_REST_INNOVATEC ?? `http://localhost:3001/api/`;

    useEffect(() => {
        async function getStudentById() {
            
            const token = sessionStorage.getItem('token');
            if(!token){
                return navigate('/Login');
            }

            const payload = JSON.parse(atob(token.split(".")[1]));  
            const userEmail = payload.email;

            try {
                const response = await axios.get(`${urlEnv}students/get/${userEmail}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Aquí se envía el token en el header
                    }
                });
                
                setStudent(response.data);

            } catch (error) {
                if (axios.isAxiosError(error)){
                    if (error.response && error.response.status === 401) {
                        // Token expirado o inválido
                        sessionStorage.removeItem("token"); // Elimina el token
                        navigate("/Login"); // Redirige al login
                    } else {
                        console.log(error); // Manejo de otros errores
                    }
                }else {
                    console.log("Unexpected error");
                }
                
            }

        };

        getStudentById();
    }, [])


    return student;

}