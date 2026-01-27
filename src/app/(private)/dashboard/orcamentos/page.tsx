import { Metadata } from "next";
import { DivSection } from "@/components/templates/sections/div-section";

export const metadata: Metadata = {
    title: 'Orçamentos',
}

export default async function Page() {
    return (
        <DivSection>
            <h1 className="text-xl">Orçamentos</h1>
        </DivSection>
    )
}