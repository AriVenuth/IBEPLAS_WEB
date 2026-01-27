"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { ActionState } from "@/models/action-types";

export async function createLinhaAction(formData: FormData): Promise<ActionState> {

    try {

        const token = await getToken();
        if (!token) {
            return {
                success: false,
                error: "Voce não está autenticado!",
            };
        }

        await apiClient("/linhas", {
            method: "POST",
            body: formData,
            token: token,
        });

        return { success: true, message: "Linha criada com sucesso!" };


    } catch (error) {

        console.log(error);

        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar linha!" };
    }
}