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
import { FileText, LogOut, Settings, User, UserCog } from "lucide-react"
import { Link, useNavigate } from "react-router"

// Menu items.
const items = [
    {
      title: "Mi Perfil",
      url: "/dashboard-student/profile",
      icon: User,
    },
    {
      title: "Editar Perfil",
      url: "/dashboard-student/edit-profile",
      icon: UserCog,
    },
    {
      title: "Mi Foto y CV",
      url: "/dashboard-student/documents",
      icon: FileText,
    },
    // {
    //   title: "Dashboard",
    //   url: "#",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Configuración",
      url: "/dashboard-student/settings",
      icon: Settings,
    },
  ]
   

export function AppSidebar() {
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
  