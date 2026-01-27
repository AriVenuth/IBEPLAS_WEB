import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { ThemeToggle } from "@/components/themes/theme-toggle";

const oswald = Oswald({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-oswald', // Definimos uma variável CSS
    weight: ['400', '700'],    // Escolha os pesos que vai usar
});

export const metadata: Metadata = {
    title: {
        template: '%s | IBEPLAS',
        default: 'IBEPLAS - Indústria Brasileira de Embalagens Plasticas Ltda.', // Título padrão se a página não definir um
    },
    description: 'Website oficial: IBEPLAS - Indústria Brasileira de Embalagens Plasticas Ltda.',
    icons: {
        icon: [
            { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32' },
            { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16' },
        ],
        apple: [
            { url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${oswald.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

                    <div className="hidden lg:block">
                        <ThemeToggle />
                    </div>

                    {children}

                    <Toaster
                        position="bottom-right"
                        richColors
                    />

                </ThemeProvider>
            </body>
        </html>
    );
}
