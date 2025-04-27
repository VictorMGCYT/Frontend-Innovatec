import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Briefcase, Building2, LayoutDashboard, LogOut, Settings, UserCog, Users } from "lucide-react"
import { Link, useNavigate } from "react-router"

// Menu items.
const items = [
    {
      title: "Dashboard",
      url: "/dashboard-company",
      icon: LayoutDashboard,
    },
    {
      title: "Perfil de Empresa",
      url: "/dashboard-company/profile",
      icon: Building2,
    },
    {
      title: "Editar Perfil",
      url: "/dashboard-company/edit-profile",
      icon: UserCog,
    },
    {
      title: "Catálogo de talentos",
      url: "/dashboard-company/students-catalog",
      icon: Users,
    },
    {
      title: "Ofertas de trabajo",
      url: "/dashboard-company/jobs",
      icon: Briefcase,
    },
    {
      title: "Configuración",
      url: "/dashboard-company/settings",
      icon: Settings,
    },
  ]
   

export function AppSidebarCompany() {
  const navigate = useNavigate();

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    sessionStorage.removeItem("token")
    navigate("/Login")

  }

return (
    <>
        <Sidebar variant="sidebar" collapsible="offcanvas">
            <SidebarHeader>
                <h2 className="text-2xl font-bold p-1 text-amber-500">Yes Owl</h2>
            </SidebarHeader>
        
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link to={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-red-500 hover:text-red-600">
                            <a className="hover:cursor-pointer" onClick={ e => {handleLogout(e)}}>
                                <LogOut />
                                Cerrar Sesión
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <p className="text-sm ml-1">© Yes Owl</p>
            </SidebarFooter>
        </Sidebar>
        
    </> 
)
}
  