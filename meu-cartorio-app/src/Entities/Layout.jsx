import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, LayoutDashboard, Upload, Users, Scale } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "../Components/ui/sidebar";

// Função mock para criar URLs de página
function createPageUrl(page) {
  return `/${page}`;
}

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Nova Escritura",
    url: createPageUrl("NovaEscritura"),
    icon: Upload,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  // Dados mockados do usuário
  const [user] = React.useState({
    full_name: "Usuário Exemplo",
    email: "usuario@exemplo.com"
  });

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --cartorio-navy: #1e3a5f;
          --cartorio-gold: #d4af37;
          --cartorio-gray: #f8f9fa;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar className="border-r border-gray-200 bg-white shadow-xl">
          <SidebarHeader className="border-b border-gray-200 p-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center shadow-lg">
                <Scale className="w-7 h-7 text-[#1e3a5f]" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">Cartório Digital</h2>
                <p className="text-xs text-blue-100">Sistema de Escrituras</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                Navegação
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-[#1e3a5f] transition-all duration-200 rounded-xl mb-2 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white shadow-md' 
                            : 'text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                Informações
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-gray-600">Escrituras Ativas</span>
                    <span className="ml-auto font-semibold text-[#1e3a5f]">-</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-gray-600">Em Revisão</span>
                    <span className="ml-auto font-semibold text-[#1e3a5f]">-</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {user?.full_name || 'Usuário'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-[#1e3a5f]">Cartório Digital</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
