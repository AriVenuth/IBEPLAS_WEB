"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Trash, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createLinhaAction } from "@/actions/linhas";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { validateImage } from "@/lib/validate-image";

export function LinhasForm() {

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handdleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!imageFile) {
            toast.error("Por favor, selecione uma imagem.");
            setIsLoading(false);
            return;
        }

        const imageIsValid = await validateImage(imageFile, {
            minW: 800, minH: 450, maxW: 1200, maxH: 720, maxMB: 5
        });

        if (!imageIsValid.valid) {
            toast.error(imageIsValid.error || "Erro na validação da imagem.");
            setIsLoading(false);
            return;
        }

        const formeElement = e.currentTarget;
        const nome = (formeElement.elements.namedItem("name") as HTMLInputElement)?.value;

        const formData = new FormData();
        formData.append("name", nome);
        formData.append("image", imageFile);

        const result = await createLinhaAction(formData);

        setIsLoading(false);

        if (result.success) {
            toast.success(result.message || "Linha criada com sucesso!");
            setOpen(false);
            router.refresh();
            return;
        } else {
            toast.error(result.error || "Erro ao criar linha.");
            return;
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (file) {

            if (file.size > 5 * 1024 * 1024) {
                toast.error("A imagem deve ser menor que 5MB.");
                setImageFile(null);
                setImagePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
                    <Plus className="h-5 w-5" />
                    Nova Linha
                </Button>
            </DialogTrigger>

            <DialogContent className="md:max-w-lg bg-card text-card-foreground p-6">

                <DialogHeader>
                    <DialogTitle>Nova Linha</DialogTitle>
                    <DialogDescription>Adicione uma nova linha ao catalogo.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handdleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Nome da linha"
                            className="bg-background text-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file">Imagem</Label>
                        {imagePreview ? (
                            <div className="relative w-full h-48 border border-card-foreground rounded-lg overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Preview da imagem"
                                    fill
                                    className="object-cover"
                                />

                                <Button
                                    type="button" className="absolute top-2 right-2 z-20 bg-primary text-primary-foreground hover:bg-primary/80 duration-300 rounded-full py-5"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                    }}
                                >
                                    <Trash className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <Label htmlFor="file" className="border-2 border-dashed border-muted-foreground rounded-md h-48 flex flex-col items-center justify-center">

                                <Upload className="h-8 w-8 mx-auto text-primary mb-2" />
                                Clique para selecionar uma imagem

                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/jpeg,image/jpg/image/png"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    required
                                    className="hidden"
                                />

                            </Label>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
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
