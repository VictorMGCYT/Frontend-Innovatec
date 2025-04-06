import { toast } from "sonner";


export default function validatePassword(password: string) {

    if (password.length < 6) {
        toast.error("Error", {
          description: "La contraseñá debe tener al menos 6 carcteres",
        });
        throw new Error("Password must be contained at least 6 characteres");
    }
    if (!/[a-z]/.test(password)) {
        toast.error("Error", {
        description: "La contraseñá debe tener al menos 1 minúscula",
    });
        throw new Error("Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
        toast.error("Error", {
        description: "La contraseñá debe tener al menos 1 mayúscula",
    });
        throw new Error("Password must contain at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
        toast.error("Error", {
        description: "La contraseñá debe tener al menos 1 número",
    });
        throw new Error("Password must contain at least one number.");
    }
    return true
}