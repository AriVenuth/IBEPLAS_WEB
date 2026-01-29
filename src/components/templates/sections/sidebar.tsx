"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Usuario } from "@/models/auth-types";
import { cn } from "@/lib/utils";
import { GalleryHorizontal, LayoutDashboard, LayoutList, List, LogOut, MailCheck, Menu, MessageSquarePlus, Package, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { logoutAction } from "@/actions/auth";
import { LogoTitle } from "./logo-section";


interface SidebarProps {
    usuarioLogado?: Usuario
}

const menuItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Linhas', href: '/dashboard/linhas', icon: LayoutList },
    { title: 'Segmentos', href: '/dashboard/segmentos', icon: List },
    { title: 'Produtos', href: '/dashboard/produtos', icon: Package },
    { title: 'Orçamentos', href: '/dashboard/orcamentos', icon: MessageSquarePlus },
    { title: 'Banners', href: '/dashboard/banners', icon: GalleryHorizontal },
    { title: "Remetentes", href: '/dashboard/remetentes', icon: MailCheck },
    { title: 'Usuários', href: '/dashboard/usuarios', icon: UsersRound },
]

const NavContent = ({ onItemClick }: { onItemClick?: () => void }) => {

    const pathname = usePathname();

    return (
        <>
            <nav className="flex-1 overflow-y-auto space-y-2 py-4">
                {menuItems.map(menu => {

                    const isActive = pathname === menu.href;

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            onClick={onItemClick}
                            className={cn(
                                "flex items-center text-sm font-medium px-4 py-3 transition-colors duration-300",
                                isActive ? "bg-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <menu.icon className="mr-4 h-5 w-5" />
                            <span>{menu.title}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-app-border py-2">
                <form action={logoutAction}>
                    <Button
                        type="submit"
                        variant="ghost"
                        className="w-full px-4 py-4 justify-start text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-300 ease-in-out">
                        <LogOut className="h-5 w-5" />
                        Sair
                    </Button>
                </form>

            </div>
        </>

    )
}

export function Sidebar({ usuarioLogado }: SidebarProps) {

    return (
        <aside className="hidden lg:flex flex-col min-h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">

            <div className="p-6 flex flex-col gap-2">
                <LogoTitle className="h-14" />
                {usuarioLogado && (
                    <p className="text-sm text-center truncate">
                        Olá, {usuarioLogado.nome}
                    </p>
                )}
            </div>

            <NavContent />

        </aside>
    );
}

export function MobileSidebar({ usuarioLogado }: SidebarProps) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="lg:hidden">
            <header className="stick top-0 z-50 flex items-center justify-between p-4 border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-r-app-border bg-sidebar text-sidebar-foreground gap-2">
                        <SheetTitle>
                            <div className="mt-2 p-6 flex flex-col gap-2">
                                <LogoTitle className="h-12" />
                                {usuarioLogado && (
                                    <p className="text-sm text-center truncate">
                                        Olá, {usuarioLogado.nome}
                                    </p>
                                )}
                            </div>
                        </SheetTitle>

                        <NavContent onItemClick={() => setOpen(false)} />

                    </SheetContent>
                </Sheet>

                <div className="flex items-center gap-4">
                    <div className="min-w-32">
                        <h2><LogoTitle className="h-12" /></h2>
                    </div>
                    <ThemeToggle className="" />
                </div>

            </header>
        </div>
    );
}