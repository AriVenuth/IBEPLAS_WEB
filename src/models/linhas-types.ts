
export interface Linha {
    id: number;
    nome: string;
    imagemUrl: string;
    created_at: string;
}
export interface LinhaCreateData {
    nome: string;
    file: File;
}