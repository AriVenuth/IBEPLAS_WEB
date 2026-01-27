import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'IBEPLAS - Indústria Brasileira de Embalagens Plasticas Ltda.',
        short_name: 'IBEPLAS',
        description: 'Website oficial da IBEPLAS - Produção de embalagens de alta qualidade.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0D1E3A', // Cor da barra do navegador no celular
        icons: [
            {
                src: '/assets/favicon/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/assets/favicon/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/assets/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/assets/favicon/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}