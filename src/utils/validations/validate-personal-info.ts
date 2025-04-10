import { toast } from "sonner";

interface FormData {
    firstName: string;
    paternalSurname: string;
    maternalSurname: string;
    email: string;
    phone: string;
    career: string;
}


export default function validatePersonalInfo(formdata: FormData) {
    // Validar nombre (mínimo 3, máximo 40 caracteres)
    if (formdata.firstName.trim().length < 3 || formdata.firstName.trim().length > 40) {
        toast.error("Error", {
            description: "El nombre debe tener entre 3 y 40 caracteres",
        });
        throw new Error("The name must contain between 3 and 40 characters");
    }

    // Validar apellido paterno (mínimo 3, máximo 20 caracteres)
    if (formdata.paternalSurname.trim().length < 3 || formdata.paternalSurname.trim().length > 20) {
        toast.error("Error", {
            description: "El apellido paterno debe tener entre 3 y 20 caracteres",
        });
        throw new Error("The last name (paternal) must contain between 3 and 20 characters");
    }

    // Validar apellido materno (mínimo 3, máximo 20 caracteres)
    if (formdata.maternalSurname.trim().length < 3 || formdata.maternalSurname.trim().length > 20) {
        toast.error("Error", {
            description: "El apellido materno debe tener entre 3 y 20 caracteres",
        });
        throw new Error("The last name (maternal) must contain between 3 and 20 characters");
    }

    // Validar email (máximo 65 caracteres)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email) || formdata.email.length > 65) {
        toast.error("Error", {
            description: "El email no es válido",
        });
        throw new Error("Invalid email format or exceeds 65 characters");
    }

    // Validar teléfono (exactamente 10 dígitos numéricos)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formdata.phone)) {
        toast.error("Error", {
            description: "El teléfono debe contener 10 dígitos numéricos",
        });
        throw new Error("The phone number must contain exactly 10 numeric digits");
    }

    // Validar carrera (mínimo 1 carácter)
    if (formdata.career.trim().length < 1) {
        toast.error("Error", {
            description: "La carrera es requerida",
        });
        throw new Error("The career field is required");
    }

}

