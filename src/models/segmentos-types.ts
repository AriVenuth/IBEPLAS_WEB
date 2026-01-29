export interface Segmento {
    id: number;
    nome: string;
    imagemUrl: string;
    created_at: string;
}
export interface SegmentoCreateData {
    nome: string;
    file: File;
}