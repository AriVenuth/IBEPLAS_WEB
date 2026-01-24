"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonRedirectProps {
    toPage: string;
    textButton: string;
    className?: string;
}
export default function ButtonRedirect({ toPage, textButton, className }: ButtonRedirectProps) {

    const handleRedirect = () => {
        redirect(toPage);
    }

    return (
        <Button variant={"default"} onClick={handleRedirect} className={cn(className)}>
            {textButton}
        </Button>
    );
}