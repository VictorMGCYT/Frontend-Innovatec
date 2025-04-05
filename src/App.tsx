import { Routes, Route, Outlet } from "react-router";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import NotFound from "./routes/NotFound/NotFound";
import ProfileStudent from "./routes/Dashboard-Students/Profile/ProfileStudent";
import ProtectRoutes from "./ProtectRoutes";

function Layout() {
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
                fixed top-0 h-[60px] w-full border-b border-b-gray-200 gap-4 bg-white'>
                    <Bell size={20}/>
                    <Avatar>
                        <AvatarImage></AvatarImage>
                        <AvatarFallback className='bg-amber-100 p-2 rounded-full'>
                            UN
                        </AvatarFallback>
                    </Avatar>
                    <h3 className='font-medium'>
                        User_Name
                    </h3>
                </div>
            </SidebarProvider>

  );
}

function App() {
  return (
    <Routes>
      {/* Rutas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Página de inicio</div>} />
        <Route path="dashboard-student" element={<div>Dashboard</div>} />
        <Route path="dashboard-student/profile" element={<ProtectRoutes role="student"><ProfileStudent/></ProtectRoutes>}></Route>
      </Route>

      {/* Rutas sin Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notfound" element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
