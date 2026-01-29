"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "react-toastify"
import { apiClient } from "@/lib/api"
import { Spinner } from "@/components/ui/spinner"

interface LinhaDeleteButtonProps {
    id: number
    nome: string
    token?: string // Recebido via prop do Server Component
}

export function LinhaDeleteButton({ id, nome, token }: LinhaDeleteButtonProps) {

    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {

        setIsDeleting(true)

        try {

            await apiClient(`/linhas/${id}`, {
                method: "DELETE",
                token: token,
            })

            toast.success(`Linha "${nome}" removida com sucesso.`)
            router.refresh()

        } catch (error: any) {
            toast.error(error.message || "Erro ao tentar excluir o registro.")

        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    title="Excluir esse registro"
                    className="rounded-full h-7 w-7 p-0"
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <Spinner className="size-4" />
                    ) : (
                        <Trash className="w-4 h-4" />
                    )}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Linha</AlertDialogTitle>
                    <p className="text-sm">Deseja realmente excluir a linha <strong>{nome}</strong>?</p>
                    <p className="text-sm text-destructive">Esta ação é irreversível e removerá os dados do servidor.</p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                        Confirmar Exclusão
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}