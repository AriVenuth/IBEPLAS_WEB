"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban } from "lucide-react";
import ButtonRedirect from "@/components/templates/buttons/button-redirect";

export default function DeniedSection() {

    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "página restrita";

    const formattedFrom = from
        .split('/')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' > ') || from;


    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">

            <Card className="w-full max-w-md space-y-4 bg-card shadow-lg">

                <CardHeader className="flex flex-col items-center">
                    <Ban className="text-foreground size-16" />
                    <CardTitle className="text-xl md:text-2xl">
                        <h1>Acesso Negado</h1>
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-center">
                    <p>Você tentou acessar: <strong>"{formattedFrom}"</strong></p>
                    <p>Você não tem permissão para acessar esta página.</p>
                </CardContent>

                <CardFooter className="flex-col justify-center md:justify-end gap-4 px-4 border-t">
                    <ButtonRedirect toPage="/login" textButton="Login" className="w-full" />
                    <ButtonRedirect toPage="/" textButton="Página Inicial" className="w-full" />
                </CardFooter>

            </Card>

        </div>
    );
}