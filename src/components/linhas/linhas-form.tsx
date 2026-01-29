"use client";

import { useRef, useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { Trash, Upload, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createLinhaAction, updateLinhaAction } from "@/actions/linhas"; // Importando ambas as ações

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { validateImage } from "@/lib/validate-image";
import { Linha } from "@/models/linhas-types";
import { env } from "@/config/env";

interface LinhasFormProps {
    linha?: Linha; // Se fornecido, entra em modo Edição
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export function LinhasForm({ linha, open: externalOpen, setOpen: setExternalOpen }: LinhasFormProps) {

    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [internalOpen, setInternalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(
        linha?.imagemUrl ? `${env.imagesAPIUrl}${linha.imagemUrl}` : null
    );
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sincronização de estado para Dialog
    const open = externalOpen ?? internalOpen;
    const setOpen = setExternalOpen ?? setInternalOpen;
    const isEditing = !!linha;

    useEffect(() => {
        if (open) {
            setImagePreview(linha?.imagemUrl ? `${env.imagesAPIUrl}${linha.imagemUrl}` : null);
            setImageFile(null);
            setIsLoading(false); // Garante que o loading não venha travado de uma tentativa anterior
        }
    }, [open, linha]);

    const handdleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imagePreview) {
            const mensagemErro = isEditing
                ? "A registro não pode ficar sem imagem. Selecione uma nova imagem ou cancele as alterações."
                : "Para cadastrar um novo registo, é necessário selecionar uma imagem.";

            toast.error(mensagemErro);
            setIsLoading(false);
            return;
        }

        const formElement = e.currentTarget;
        const formDataParaCaptura = new FormData(formElement);
        const nome = formDataParaCaptura.get("nome") as string;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("nome", nome);

            // Só anexamos o arquivo se houver um NOVO arquivo selecionado.
            // Se imageFile for null mas imagePreview existir, o backend manterá a imagem antiga.
            if (imageFile) {
                const imageIsValid = await validateImage(imageFile, {
                    minW: 800, minH: 450, maxW: 1200, maxH: 720, maxMB: 5
                });

                if (!imageIsValid.valid) {
                    toast.error(imageIsValid.error);
                    setIsLoading(false);
                    return;
                }
                formData.append("file", imageFile);
            }

            const result = isEditing
                ? await updateLinhaAction(String(linha.id), formData)
                : await createLinhaAction(formData);

            if (result.success) {

                toast.success(result.message);

                setOpen(false);

                startTransition(() => {
                    router.refresh();
                });

            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Erro ao salvar alterações.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("A imagem deve ser menor que 5MB.");
                setImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isEditing && (
                <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary">
                        <Plus className="h-5 w-5" />
                        Nova Linha
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="md:max-w-lg bg-card text-card-foreground p-6">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar" : "Novo"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Atualize as informações da linha selecionada." : "Adicione uma nova linha ao catalogo."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handdleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            id="nome"
                            name="nome"
                            required
                            defaultValue={linha?.nome}
                            placeholder="Nome da linha"
                            className="bg-background text-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Imagem</Label>
                        {imagePreview ? (
                            <div className="relative aspect-video rounded-lg border border-muted-foreground overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Preview da imagem"
                                    fill
                                    className="object-cover"
                                />
                                <Button
                                    variant="destructive"
                                    type="button"
                                    className="absolute top-2 right-2 z-20 h-7 w-7 rounded-full py-0"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                        if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Label htmlFor="file" className="relative flex flex-col items-center justify-center aspect-video cursor-pointer rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/80 overflow-hidden transition-colors duration-300">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Upload className="h-8 w-8 text-primary" />
                                    <span className="text-sm">Clique para selecionar uma imagem</span>
                                </div>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/jpeg,image/jpg/image/png"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                            </Label>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex gap-2 items-center">
                                <Spinner data-icon="inline-stard" />
                                Salvando...
                            </div>
                        ) : (
                            "Salvar"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}