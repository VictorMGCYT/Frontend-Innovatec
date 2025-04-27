import { useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { Outlet, useNavigate } from "react-router";
import axios from 'axios';
import StudentInterface from "./interfaces/student/student.interface";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { AppSidebarCompany } from "./components/app-sidebar-companies";


function LayoutCompany() {
    const { theme, setTheme } = useTheme();
    // const [student, setStudent] = useState<StudentInterface>();
    // // const [company, setCompany] = useState<any>();
    // const navigate = useNavigate();
    // const urlEnv = import.meta.env.VITE_API_REST_INNOVATEC ?? `http://localhost:3001/api/`;
  
    // useEffect(() => {
    //   async function getStudentById() {
            
    //         const token = sessionStorage.getItem('token');
    //         if(!token){
    //             return navigate('/Login');
    //         }
  
    //         const payload = JSON.parse(atob(token.split(".")[1]));  
    //         const userEmail = payload.email;
    //         const userRole = payload.rol;
  
    //         if( userRole === "company"){
    //           // TODO completar para los datos de las compañias
    //         }else{
    //           try {
    //             const response = await axios.get(`${urlEnv}students/get/${userEmail}`, {
    //               headers: {
    //                   Authorization: `Bearer ${token}`  // Aquí se envía el token en el header
    //               }
    //             });
                
    //             setStudent(response.data);
  
    //           } catch (error) {
    //               // TODO cambiar por una pagina 403 o regresar al login
    //               console.log(error);
    //           }
    //         }
  
            
  
    //     };
  
    //     getStudentById();
    // }, [])

    return (
        <SidebarProvider>
          <AppSidebarCompany />
          <main className='w-full'>
              <SidebarTrigger className='flex sticky top-0 h-[60px] rounded-[0] border-b border-b-gray-200 z-10'/>
              {/* Todo el content que no pertenezca al sidebar */}
              <Outlet /> {/* Aquí se renderizan las rutas hijas */}
          </main>
          <div 
          className='flex items-center justify-end right-4 
          fixed top-0 h-[60px] w-full border-b border-b-gray-200 gap-4 bg-white
          dark:bg-neutral-950'>
              {/* <Bell size={20}/> */}
              <button
                className="px-4 text-sm py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              <Avatar>
                  <AvatarImage></AvatarImage>
                  <AvatarFallback className='bg-amber-100 p-2 rounded-full dark:text-black'>
                      {`EN`}
                  </AvatarFallback>
              </Avatar>
              <h3 className='font-medium'>
                  {"Nombre de la empresa"}
              </h3>
          </div>
        </SidebarProvider>
    );
}


export default LayoutCompany;