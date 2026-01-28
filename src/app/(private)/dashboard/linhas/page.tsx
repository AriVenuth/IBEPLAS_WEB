import { Metadata } from "next";
import Image from "next/image";
import { DivSection } from "@/components/templates/sections/div-section";
import { getToken } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { HeaderPageSection } from "@/components/templates/sections/header-page-section";
import { LinhasForm } from "@/components/templates/forms/linhas-form";
import { Linha } from "@/models/linhas-types";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash, ImageIcon } from "lucide-react";
import { env } from "@/config/env";
import { ImageWithFallback, ImageFallBack } from "@/components/templates/ui/ImageWithFallback";

export const metadata: Metadata = {
    title: 'Linhas',
}

export default async function Page() {

    const token = await getToken();
    const listData = await apiClient<Linha[]>("/linhas", {
        token: token,
    });


    return (
        <DivSection className="space-y-6 pb-12">
            <HeaderPageSection
                title="Linhas"
                subTitle="Gerencie as linhas dos produtos aqui."
                actions={<LinhasForm />}
            />
            {listData && listData.length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">

                    {listData.map(item => (

                        <Card key={item.id} className="group overflow-hidden pt-0 hover:shadow-lg transition-all duration-300">

                            {item.imagemUrl ? (
                                <div className="relative w-full aspect-video bg-foreground/35">
                                    <ImageWithFallback
                                        src={`${env.imagesAPIUrl}${item.imagemUrl}`}
                                        alt={item.nome}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                        fallback={
                                            <ImageFallBack />
                                        }
                                    />
                                    <div className="absolute inset-0 z-10 bg-foreground/5" />
                                </div>

                            ) : (
                                <ImageFallBack />
                            )}

                            <CardHeader className="pb-0">
                                <CardTitle>{item.nome}</CardTitle>
                            </CardHeader>

                            <CardFooter className="flex gap-2 justify-end p-3 opacity-10 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                                <Button
                                    variant="default"
                                    title="Editar esse registro"
                                    className="rounded-full h-7 w-7 p-0"
                                >
                                    <FilePenLine className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    title="Excluir esse registro"
                                    className="rounded-full h-7 w-7 p-0"
                                >
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-centerw-full text-center">
                    <p className="text-2xl lg:text-3xl">Nenhum registro encontrado.</p>
                </div>
            )}
        </DivSection>
    )
}