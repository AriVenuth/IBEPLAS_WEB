"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api"; // Importando seu apiClient

export function ForgotPasswordDialog() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            // Utilizando sua ponte de API conforme as regras da IBEPLAS
            // O endpoint começa com /api/v1 (ou conforme definido nas suas rotas)
            const response = await apiClient<{ message: string }>("/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            toast.success(response.message);
            setOpen(false);
            setEmail("");

        } catch (error: any) {
            // O seu apiClient já faz o throw new Error(error.error), 
            // então capturamos a mensagem amigável aqui.
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="link"
                    className="text-sm text-primary hover:underline bg-none border-none cursor-pointer outline-none"
                >
                    Esqueceu sua senha?
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-md space-y-4 bg-card text-card-foreground">

                <form onSubmit={handleSubmit}>

                    <DialogHeader>
                        <DialogTitle>Recuperar Senha</DialogTitle>
                        <DialogDescription>
                            Digite seu e-mail abaixo para receber o link de recuperação.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="recovery-email">E-mail</Label>
                            <Input
                                id="recovery-email"
                                name="recovery-email"
                                type="email"
                                placeholder="exemplo@ibeplas.com.br"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background text-foreground"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Enviando..." : "Enviar Link"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}