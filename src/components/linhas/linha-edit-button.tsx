"use client";

import { useState } from "react";
import { FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinhasForm } from "./linhas-form"; // Ajuste o caminho conforme sua estrutura
import { Linha } from "@/models/linhas-types";

export function LinhaEditButton({ item }: { item: Linha }) {
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

            {/* Renderizamos o formulário passando a entidade 'linha' */}
            {/* O modal só monta/renderiza o conteúdo quando necessário */}
            <LinhasForm
                linha={item}
                open={isEditOpen}
                setOpen={setIsEditOpen}
            />
        </>
    );
}