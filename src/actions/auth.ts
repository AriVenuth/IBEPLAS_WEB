"use server";

import { redirect } from "next/navigation";
import { apiClient } from "@/lib/api";
import { ActionState } from "@/models/action-types";
import { LoginResponse } from "@/models/auth-types";
import { setToken, removeToken } from "@/lib/auth";

export async function loginAction(prevState: any, formData: FormData): Promise<ActionState> {

    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    if (!email || !senha) {
        return {
            error: "Preencha todos os campos",
            fields: { email }
        };
    }

    const data = {
        email,
        senha
    };

    try {

        const response = await apiClient<LoginResponse>("/session", {
            method: "POST",
            body: JSON.stringify(data),
        });

        await setToken(response.token);

        return { success: true, message: "Login realizado com sucesso!", redirectTo: "/dashboard" };

    } catch (error: any) {

        if (error instanceof Error) {
            return {
                success: false,
                error: error.message || "Erro ao realizar login",
                fields: { email }
            };
        }

        return {
            success: false,
            error: "Erro ao realizar login",
            fields: { email }
        };
    }
}

export async function logoutAction() {
    await removeToken();
    redirect("/");
}