export const ROLES_LEVEL = {
    USER: 0,
    MANAGER: 50,
    ADMIN: 90
};

export type RoleNames = keyof typeof ROLES_LEVEL;

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    role: "USER" | "MANAGER" | "ADMIN";
    imagemUrl?: string;
    createdAt: string;
}
export interface LoginResponse {
    token: string;
    usuario: Usuario;
}