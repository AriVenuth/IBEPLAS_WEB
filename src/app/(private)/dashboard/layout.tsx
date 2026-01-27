import { DivSection } from "@/components/templates/sections/div-section";
import { MobileSidebar, Sidebar } from "@/components/templates/sections/sidebar";
import { requiredLevel } from "@/lib/auth";
import { Metadata } from "next"

export const metadata: Metadata = {
    description: 'Área Administrativa | Dashboard IBEPLAS',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const usuarioLogado = await requiredLevel("MANAGER");

    return (

        <DivSection className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Seu Sidebar, Navbar, etc. */}
            <Sidebar usuarioLogado={usuarioLogado} />

            {/* Seu Conteúdo Principal */}
            <div className="flex flex-1 flex-col overflow-hidden">

                <MobileSidebar usuarioLogado={usuarioLogado} />

                <main className="flex-1 overflow-y-auto bg-background text-foreground">

                    {children}

                </main>

            </div>

        </DivSection>
    )
}