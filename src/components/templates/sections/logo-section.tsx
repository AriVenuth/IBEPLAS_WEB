import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoTitleProps {
    className?: string; // Aqui você passa o h-16, w-40, etc.
}

export const LogoTitle = ({ className }: LogoTitleProps) => {
    return (
        // O container principal agora recebe a classe externa
        // Definimos relative aqui para o 'fill' funcionar sempre
        <div className={cn("relative w-full h-16", className)}>
            <Image
                src="/assets/logos/logo-clean.png"
                alt="Logo IBEPLAS"
                fill
                className="object-contain dark:hidden"
                priority
            />
            <Image
                src="/assets/logos/logo-clean-branco.png"
                alt="Logo IBEPLAS"
                fill
                className="object-contain hidden dark:block"
                priority
            />
        </div>
    );
};