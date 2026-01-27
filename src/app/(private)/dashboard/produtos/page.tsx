import { Metadata } from "next";
import { DivSection } from "@/components/templates/sections/div-section";

export const metadata: Metadata = {
    title: 'Produtos',
}

export default async function Page() {
    return (
        <DivSection>
            <h1 className="text-xl">Produtos</h1>
        </DivSection>
    )
}