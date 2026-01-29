"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { ActionState } from "@/models/action-types";
import { revalidatePath } from "next/cache";

export async function createSegmentoAction(formData: FormData): Promise<ActionState> {

    try {

        const token = await getToken();
        if (!token) {
            return {
                success: false,
                error: "Voce nao esta autenticado!",
            };
        }

        await apiClient("/segmentos", {
            method: "POST",
            body: formData,
            token: token,
        });

        return { success: true, message: "Segmento criado com sucesso!" };


    } catch (error) {

        console.log(error);

        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar segmento!" };
    }
}

export async function updateSegmentoAction(id: string, formData: FormData): Promise<ActionState> {
    const token = await getToken();

    if (!token) {
        return {
            success: false,
            error: "Voce nao esta autenticado!",
        };
    }

    try {
        await apiClient(`/segmentos/${id}`, {
            method: "PUT",
            body: formData,
            token: token,
        });

        revalidatePath("/dashboard/segmentos");

        return { success: true, message: "Segmento atualizado com sucesso!" };

    } catch (error) {

        console.log(error);

        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao atualizar segmento!" };
    }
}