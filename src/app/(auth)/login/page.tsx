import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/templates/forms/login-form";
import { DivSection } from "@/components/templates/sections/div-section";
import { getUserFromToken } from "@/lib/auth";


export const metadata: Metadata = {
    title: 'Login',
}

export default async function LoginPage() {

    const temLogin = await getUserFromToken()

    if (temLogin) {
        redirect('/dashboard');
    }

    return (
        <DivSection>
            <LoginForm />
        </DivSection>
    );
}