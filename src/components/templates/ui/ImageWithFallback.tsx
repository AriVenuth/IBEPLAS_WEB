// src/components/ui/image-with-fallback.tsx
"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";

interface Props extends ImageProps {
    fallback?: React.ReactNode;
}

export function ImageWithFallback({ src, alt, fallback, ...props }: Props) {
    const [error, setError] = useState(false);

    // Reseta o erro se o SRC mudar (ex: ao editar o registro)
    useEffect(() => {
        setError(false);
    }, [src]);

    if (error || !src) {
        return fallback || (
            <div className="flex flex-col items-center justify-center w-full h-full bg-muted/50">
                <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            </div>
        );
    }

    return (
        <Image
            {...props}
            src={src}
            alt={alt}
            onError={() => setError(true)}
        />
    );
}

export const ImageFallBack = () => {
    return (
        <div className="relative w-full aspect-video bg-muted flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
            <span className="text-xs mt-2 font-medium uppercase tracking-wider">IBEPLAS</span>
        </div>
    );
}