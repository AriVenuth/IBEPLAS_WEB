
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { RoleNames, ROLES_LEVEL, Usuario } from "@/models/auth-types";
import { apiClient } from "./api";

export const COOKIE_NAME = "ibeplas_auth";

export async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME);
    return token?.value;
}

export async function setToken(token: string, maxAge?: number) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: true,
        maxAge: maxAge || 60 * 60 * 24 * 30, // 30 dias (mesmo tempo do seu JWT)
        path: "/",
    });
}

export async function removeToken() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getUserFromToken(): Promise<Usuario | null> {

    try {

        const token = await getToken();
        if (!token) {
            return null;
        }

        const usuarioLogado = await apiClient<Usuario>("/me", {
            token: token
        })

        return usuarioLogado;

    } catch (error) {

        return null;
    }
}

export async function requiredLevel(minLevelRequired: RoleNames): Promise<Usuario> {
    const usuario = await getUserFromToken();

    const headersList = await headers();
    const currentPath = headersList.get("x-url") || "/página-desconhecida";

    if (!usuario) {
        redirect("/login");
    }

    const userLevel = ROLES_LEVEL[usuario.role as RoleNames];
    const requiredLevel = ROLES_LEVEL[minLevelRequired];

    if (userLevel < requiredLevel) {
        console.log(currentPath)
        redirect(`/access-denied?from=${encodeURIComponent(currentPath)}`);
    }
    return usuario;
}
