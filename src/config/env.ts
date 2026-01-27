
export const env = {
    apiUrl: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
    nodeEnv: process.env.NODE_ENV || "development",
    imagesAPIUrl: process.env.NEXT_PUBLIC_API_IMAGES || "http://localhost:3333/files/",
};