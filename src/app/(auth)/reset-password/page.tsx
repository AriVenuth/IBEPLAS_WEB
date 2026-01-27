"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api";
import { CardForm } from "@/components/templates/forms/card-form";


function ResetPasswordForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();

        if (!token) {
            toast.error("Token de recuperação ausente ou inválido.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        try {
            const response = await apiClient<{ message: string }>("/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password }),
            });

            toast.success(response.message);
            router.push("/login");

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CardForm
            icon={KeyRound}
            title="Nova Senha"
            description="Defina sua nova senha de acesso ao sistema"
            submitLabel="Alterar Senha"
            onSubmit={handleResetPassword}
            isLoading={loading}
        >
            <div className="space-y-1">
                <Label htmlFor="password">Nova Senha</Label>
                <Input
                    type="password"
                    id="password"
                    required
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background text-foreground"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                    type="password"
                    id="confirm-password"
                    required
                    placeholder="Repita a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-background text-foreground"
                />
            </div>

            {!token && (
                <p className="text-xs text-destructive mt-2 text-center">
                    Link de recuperação inválido ou sem token.
                </p>
            )}
        </CardForm>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-primary" />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}