'use client'; // Obrigatório para usar hooks de navegação

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
    const pathname = usePathname(); // Captura a URL que deu erro 404

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
            <h1>404 - Página Não Encontrada</h1>
            <p>O recurso solicitado <strong>"{pathname}"</strong> não existe.</p>
            <Link href="/">Voltar para o Início</Link>
        </div>
    );
}