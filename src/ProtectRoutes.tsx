import { JSX } from "react";
import { Navigate } from "react-router";


function ProtectRoutes({children, role}: { children: JSX.Element, role: string }) {
    
    const token = sessionStorage.getItem('token');

    if(!token){
        return <Navigate to='/Login'/>
    }

    // Extraemos y decodificamos los datos del token
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    if(userRole !== role){
        // TODO cambiar por una página de error 403
        return <Navigate to="/Login" />;
    }

    return children
}


export default ProtectRoutes;