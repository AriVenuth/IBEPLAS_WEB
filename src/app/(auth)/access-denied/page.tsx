import { Metadata } from 'next'
import DeniedSection from "@/components/templates/sections/denied-section";

export const metadata: Metadata = {
    title: 'Acesso Negado',
}
export default function AccessDenied() {

    return (
        <DeniedSection />
    );
}