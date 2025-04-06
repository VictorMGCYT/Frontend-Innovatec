import { Routes, Route, Outlet, useNavigate } from "react-router";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
// import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import NotFound from "./routes/NotFound/NotFound";
import ProfileStudent from "./routes/Dashboard-Students/Profile/ProfileStudent";
import ProtectRoutes from "./ProtectRoutes";
import { useEffect, useState } from "react";
import axios from 'axios';
import StudentInterface from "./interfaces/student/student.interface";
import EditProfileStudent from "./routes/Dashboard-Students/Edit-Profile/EditProfileStudent";
import { useTheme } from "./hooks/useTheme";

function Layout() {
  const { theme, setTheme } = useTheme();
  const [student, setStudent] = useState<StudentInterface>();
  // const [company, setCompany] = useState<any>();
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
          const userRole = payload.rol;

          if( userRole === "company"){
            // TODO completar para los datos de las compañias
          }else{
            try {
              const response = await axios.get(`${urlEnv}students/get/${userEmail}`);
              
              setStudent(response.data);

            } catch (error) {
                // TODO cambiar por una pagina 403 o regresar al login
                console.log(error);
            }
          }

          

      };

      getStudentById();
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
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
                  {`${student?.paternalSurname[0].toLocaleUpperCase()}${student?.paternalSurname[1].toLocaleUpperCase()}`}
              </AvatarFallback>
          </Avatar>
          <h3 className='font-medium'>
              {student?.paternalSurname.replace(/\b\w/g, char => char.toUpperCase())}
          </h3>
      </div>
    </SidebarProvider>

  );
}

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <Routes>
      {/* Rutas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Página de inicio</div>} />
        <Route path="dashboard-student" element={<div>Dashboard</div>} />
        <Route path="dashboard-student/profile" element={<ProtectRoutes role="student"><ProfileStudent/></ProtectRoutes>}></Route>
        <Route path="dashboard-student/edit-profile" element={<ProtectRoutes role="student"><EditProfileStudent/></ProtectRoutes>}></Route>
      </Route>

      {/* Rutas sin Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<Register />} />
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
