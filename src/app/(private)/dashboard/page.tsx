import { DivSection } from "@/components/templates/sections/div-section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Dashboard',
}
export default async function Dashboard() {

    return (
        <DivSection>
            <h1 className="text-2xl font-bold">Dashboard</h1>
        </DivSection>
    );
}