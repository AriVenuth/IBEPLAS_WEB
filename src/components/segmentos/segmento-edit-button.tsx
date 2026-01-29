"use client";

import { useState } from "react";
import { FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SegmentosForm } from "./segmentos-form"; // Ajuste o caminho conforme sua estrutura
import { Segmento } from "@/models/segmentos-types";

export function SegmentoEditButton({ item }: { item: Segmento }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <Button
                variant="default"
                title="Editar esse registro"
                onClick={() => setIsEditOpen(true)}
                className="rounded-full h-7 w-7 p-0"
            >
                <FilePenLine className="w-4 h-4" />
            </Button>

            <SegmentosForm
                model={item}
                open={isEditOpen}
                setOpen={setIsEditOpen}
            />
        </>
    );
}