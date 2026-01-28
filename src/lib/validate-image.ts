export interface ImageValidationResult {
    valid: boolean;
    error?: string;
    width?: number;
    height?: number;
}

export async function validateImage(file: File,
    config: { minW: number; minH: number; maxW: number; maxH: number; maxMB: number }):
    Promise<ImageValidationResult> {

    return new Promise((resolve) => {
        // 1. Validar Peso
        const maxBytes = config.maxMB * 1024 * 1024;
        if (file.size > maxBytes) {
            resolve({ valid: false, error: `O arquivo é muito pesado. Máximo: ${config.maxMB}MB.` });
            return;
        }

        // 2. Validar Dimensões usando ObjectURL (mais rápido que FileReader para imagens grandes)
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl); // Libera a memória imediatamente após ler
            const { width: w, height: h } = img;

            if (w < config.minW || h < config.minH) {
                resolve({ valid: false, error: `Imagem pequena (${w}x${h}px).`, width: w, height: h });
            } else if (w > config.maxW || h > config.maxH) {
                resolve({ valid: false, error: `Imagem grande (${w}x${h}px).`, width: w, height: h });
            } else {
                resolve({ valid: true, width: w, height: h });
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({ valid: false, error: "Arquivo de imagem corrompido ou inválido." });
        };

        img.src = objectUrl;
    });
};