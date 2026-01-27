"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FormCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    children: ReactNode;
    footerActions?: ReactNode;
    submitLabel?: string;
    // Alterado: action agora aceita a função do useActionState
    action?: (payload: FormData) => void;
    onSubmit?: (e: React.FormEvent) => void;
    isLoading?: boolean;
}

export function CardForm({
    icon: Icon,
    title,
    description,
    children,
    footerActions,
    submitLabel = "Confirmar",
    action, // Novo
    onSubmit,
    isLoading = false,
}: FormCardProps) {
    return (
        <Card className="w-full max-w-md space-y-4 bg-card text-card-foreground shadow-md">
            <CardHeader>
                <div className="flex gap-2 items-center">
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle><h1>{title}</h1></CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            {/* Se houver action, usamos ela. Caso contrário, usamos onSubmit */}
            <form action={action} onSubmit={onSubmit} className="space-y-6">
                <CardContent className="space-y-4">
                    {children}
                </CardContent>

                <CardFooter className="space-y-4 flex-col border-t pt-6">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex gap-2 items-center">
                                <Spinner className="w-4 h-4" />
                                <span>Processando...</span>
                            </div>
                        ) : submitLabel}
                    </Button>

                    {footerActions && (
                        <div className="flex flex-col items-center w-full">
                            {footerActions}
                        </div>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}