import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // Cria um novo cabeçalho com a URL atual
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.nextUrl.pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}

export const config = {
    // Aplica a todas as rotas, exceto arquivos estáticos e api
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};