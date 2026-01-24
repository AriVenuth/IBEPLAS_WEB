import { ThemeProvider } from "@/components/themes/theme-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        template: '%s | Dashboard IBEPLAS',
        default: 'Dashboard IBEPLAS', // Título padrão se a página não definir um
    },
    description: 'Área Administrativa do Dashboard IBEPLAS',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex min-h-screen flex-col">
                {/* Seu Sidebar, Navbar, etc. */}
                <main>{children}</main>
            </div>
        </ThemeProvider>
    )
}