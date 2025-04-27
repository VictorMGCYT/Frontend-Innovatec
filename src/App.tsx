import { Routes, Route } from "react-router";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
// import { Bell } from "lucide-react";
import NotFound from "./routes/NotFound/NotFound";
import ProfileStudent from "./routes/Dashboard-Students/Profile/ProfileStudent";
import ProtectRoutes from "./ProtectRoutes";
import { useEffect } from "react";
import EditProfileStudent from "./routes/Dashboard-Students/Edit-Profile/EditProfileStudent";
import { useTheme } from "./hooks/useTheme";
import SettingsStudents from "./routes/Dashboard-Students/Settings/SettingsStudent";
import DocumentsStudents from "./routes/Dashboard-Students/CV/CV";
import Layout from "./LayoutStudents";
import LayoutCompany from "./LayoutCompanies";
import MainCompany from "./routes/Dashboard-Companies/Main/MainCompany";



  

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
        <Route path="dashboard-student/settings" element={<ProtectRoutes role="student"><SettingsStudents/></ProtectRoutes>}></Route>
        <Route path="dashboard-student/documents" element={<ProtectRoutes role="student"><DocumentsStudents/></ProtectRoutes>}></Route>
      </Route>

      {/* Rutas con layout de empresas */}
      <Route path="/" element={<LayoutCompany/>} >
        <Route path="dashboard-company" element={<MainCompany/>} />
        <Route path="dashboard-company/profile" element={<div>Perfil de la empresa</div>} />
        <Route path="dashboard-company/edit-profile" element={<div>Editar Perfil</div>} />
        <Route path="dashboard-company/students-catalog" element={<div>Catalogo de estudiantes</div>} />
        <Route path="dashboard-company/jobs" element={<div>Ofertas de empleo</div>} />
        <Route path="dashboard-company/settings" element={<div>Configuraciones</div>} />
      </Route>

      {/* Rutas sin Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<Register />} />
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
