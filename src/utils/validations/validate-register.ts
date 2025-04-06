import { toast } from "sonner";

interface FormData {
    nombre: string;
    apellidopaterno: string;
    apellidomaterno: string;
    email: string;
    password: string;
    confirmPassword: string;
    carrera: string;
    telefono: string;
}

export default function validateFormData(formdata: FormData) {
    // Validar nombre (mínimo 3, máximo 40 caracteres)
    if (formdata.nombre.trim().length < 3 || formdata.nombre.trim().length > 40) {
        toast.error("Error", {
            description: "El nombre debe tener entre 3 y 40 caracteres",
        });
        throw new Error("The name must contain between 3 and 40 characters");
    }

    // Validar apellido paterno (mínimo 3, máximo 20 caracteres)
    if (formdata.apellidopaterno.trim().length < 3 || formdata.apellidopaterno.trim().length > 20) {
        toast.error("Error", {
            description: "El apellido paterno debe tener entre 3 y 20 caracteres",
        });
        throw new Error("The last name (paternal) must contain between 3 and 20 characters");
    }

    // Validar apellido materno (mínimo 3, máximo 20 caracteres)
    if (formdata.apellidomaterno.trim().length < 3 || formdata.apellidomaterno.trim().length > 20) {
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
    if (!phoneRegex.test(formdata.telefono)) {
        toast.error("Error", {
            description: "El teléfono debe contener 10 dígitos numéricos",
        });
        throw new Error("The phone number must contain exactly 10 numeric digits");
    }

    // Validar contraseña (mínimo 6, máximo 40 caracteres)
    if (formdata.password.length < 6 || formdata.password.length > 40) {
        toast.error("Error", {
            description: "La contraseña debe tener más de 6 caracteres",
        });
        throw new Error("The password must contain between 6 and 40 characters");
    }

    if (!/[a-z]/.test(formdata.password)) {
        toast.error("Error", {
            description: "La contraseña debe tener al menos 1 minúscula",
        });
        throw new Error("Password must contain at least one lowercase letter.");
    }

    if (!/[A-Z]/.test(formdata.password)) {
        toast.error("Error", {
            description: "La contraseña debe tener al menos 1 mayúscula",
        });
        throw new Error("Password must contain at least one uppercase letter.");
    }

    if (!/\d/.test(formdata.password)) {
        toast.error("Error", {
            description: "La contraseña debe tener al menos 1 número",
        });
        throw new Error("Password must contain at least one number.");
    }

    // Validar confirmación de contraseña
    if (formdata.password !== formdata.confirmPassword) {
        toast.error("Error", {
            description: "Las contraseñas no coinciden",
        });
        throw new Error("Passwords do not match");
    }

    // Validar carrera (mínimo 1 carácter)
    if (formdata.carrera.trim().length < 1) {
        toast.error("Error", {
            description: "La carrera es requerida",
        });
        throw new Error("The career field is required");
    }

}
