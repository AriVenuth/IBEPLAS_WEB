import ButtonRedirect from "@/components/templates/buttons/button-redirect";

export default function AccessDenied() {



    return (
        <div className="flex min-h-screen flex-col gap-4 items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Acesso Negado</h1>
                <p className="text-lg">Você não tem permissão para acessar esta página.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <ButtonRedirect toPage="/login" textButton="Ir para a Página de Login" />
                <ButtonRedirect toPage="/" textButton="Voltar para a Página Inicial" />
            </div>
        </div>
    );
}