"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { CardForm } from "@/components/templates/forms/card-form";
import { ForgotPasswordDialog } from "@/components/auth/forgot-password-dialog";
import { loginAction } from "@/actions/auth";
import { toast } from "react-toastify";

export function LoginForm() {

    const router = useRouter();
    const [actionState, submitAction, isPending] = useActionState(loginAction, null);

    useEffect(() => {
        if (actionState?.error) {
            toast.error(actionState.error);
        }
        if (actionState?.success) {
            toast.success(actionState.message);
            router.push(actionState.redirectTo || "/dashboard");
        }
    }, [actionState, router]);

    return (
        <CardForm
            icon={LogIn}
            title="Login"
            description="Informe seus dados para acessar sua conta"
            submitLabel="Entrar"
            action={submitAction}
            isLoading={isPending}
            footerActions={<ForgotPasswordDialog />}
        >
            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    type="email"
                    id="email"
                    name="email" // O 'name' é fundamental para o FormData na Action
                    required
                    defaultValue={actionState?.fields?.email || ""}
                    placeholder="Seu e-mail de acesso"
                    className="bg-background text-foreground"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="senha">Senha</Label>
                <Input
                    type="password"
                    id="senha"
                    name="senha" // O 'name' é fundamental para o FormData na Action
                    required
                    placeholder="Sua senha de acesso"
                    className="bg-background text-foreground"
                />
            </div>

            {/* Exibição opcional de erro vindo da action */}
            {actionState?.error && (
                <p className="text-sm text-destructive text-center font-medium">
                    {actionState.error}
                </p>
            )}
        </CardForm>
    );
}