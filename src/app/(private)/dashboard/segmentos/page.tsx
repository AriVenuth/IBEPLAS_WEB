import { Metadata } from "next";
import { DivSection } from "@/components/templates/sections/div-section";
import { getToken } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { HeaderPageSection } from "@/components/templates/sections/header-page-section";
import { SegmentosForm } from "@/components/segmentos/segmentos-form";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/config/env";
import { ImageWithFallback, ImageFallBack } from "@/components/templates/ui/ImageWithFallback";
import { Segmento } from "@/models/segmentos-types";
import { SegmentoEditButton } from "@/components/segmentos/segmento-edit-button";
import { SegmentoDeleteButton } from "@/components/segmentos/segmento-delete-dialog";

export const metadata: Metadata = {
    title: 'Segmentos',
}

export default async function Page() {

    const token = await getToken();
    const listData = await apiClient<Segmento[]>("/segmentos", {
        token: token,
    });


    return (
        <DivSection className="space-y-6 pb-12">
            <HeaderPageSection
                title="Segmentos"
                subTitle="Gerencie os segmentos dos produtos aqui."
                actions={<SegmentosForm />}
            />
            {listData && listData.length > 0 ? (

                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">

                    {listData.map(item => (

                        <Card key={item.id} className="group overflow-hidden py-0 hover:shadow-lg transition-all duration-300">

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

                                <SegmentoEditButton item={item} />
                                <SegmentoDeleteButton id={item.id} nome={item.nome} token={token} />

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