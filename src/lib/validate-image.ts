export interface ImageValidationResult {
    valid: boolean;
    error?: string;
    width?: number;
    height?: number;
}

export const validateImage = async (
    file: File,
    config: { minW: number; minH: number; maxW: number; maxH: number; maxMB: number }
): Promise<ImageValidationResult> => {

    return new Promise((resolve) => {

        // 1. Validar Peso do Arquivo (Bytes)
        const maxBytes = config.maxMB * 1024 * 1024;
        if (file.size > maxBytes) {
            resolve({ valid: false, error: `O arquivo é muito pesado. Máximo permitido: ${config.maxMB}MB.` });
            return;
        }

        // 2. Validar Dimensões (Pixels)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
                const { width: w, height: h } = img;

                if (w < config.minW || h < config.minH) {
                    resolve({ valid: false, error: `Imagem muito pequena (${w}x${h}px). Mínimo: ${config.minW}x${config.minH}px.`, width: w, height: h });
                } else if (w > config.maxW || h > config.maxH) {
                    resolve({ valid: false, error: `Imagem muito grande (${w}x${h}px). Máximo: ${config.maxW}x${config.maxH}px.`, width: w, height: h });
                } else {
                    resolve({ valid: true, width: w, height: h });
                }
            };
        };

    });
};