# Checklist do Projeto IBEPLAS Web

## Visão Geral do Projeto
- **Framework:** Next.js 16 com TypeScript
- **UI Library:** shadcn/ui com Radix UI components
- **Styling:** Tailwind CSS v4
- **Theming:** next-themes para modo claro/escuro
- **Estado:** React 19 com hooks nativos
- **Scripts:** dev, build, start

## Estrutura do Projeto
- **src/app:** Páginas Next.js com App Router
  - Página inicial (/)
  - Grupo (auth): login, reset-password, access-denied
  - Grupo (private): dashboard
- **src/components:** Componentes reutilizáveis
  - templates/forms: Formulários específicos
  - templates/sections: Seções de layout
  - ui: Componentes base shadcn
  - themes: Provedor e toggle de tema
- **src/actions:** Server Actions (auth.ts)
- **src/lib:** Utilitários (api.ts, utils.ts)

## Páginas Implementadas
- ✅ **Página Inicial:** Título da empresa IBEPLAS
- ✅ **Login:** Formulário de login com forgot password
- ✅ **Reset Password:** Formulário para redefinir senha via token
- ✅ **Access Denied:** Página de acesso negado
- ✅ **Dashboard:** Página privada básica

## Forms Configurados
- ✅ **LoginForm:** Campos email/senha, integração com server action, forgot password dialog
- ✅ **ForgotPasswordDialog:** Dialog modal para solicitar reset de senha, chama API /forgot-password
- ✅ **ResetPasswordForm:** Formulário para nova senha com confirmação, valida token via URL params, chama API /reset-password

## Serviços e API
- ✅ **apiClient:** Função genérica para requests HTTP
  - Base URL: http://localhost:3333/api/v1 (configurável via env)
  - Suporte a JWT token
  - Tratamento de erros padronizado
  - Cache e revalidação Next.js
- ✅ **Endpoints Documentados:** Ver ENDPOINTS.md
  - Autenticação: POST /session (login)
  - Usuários: CRUD completo
  - Segmentos, Produtos, etc. (documentados mas não implementados no front)

## Autenticação
- ✅ **Server Action:** loginAction (placeholder com alert)
- ✅ **Proteção de Rotas:** Grupos (auth) e (private) no App Router
- ❌ **Middleware:** Não implementado (roteamento baseado em grupos)

## Componentes UI
- ✅ **Base Components:** Button, Card, Input, Label, Dialog, etc.
- ✅ **Templates:** CardForm (form genérico), DivSection, DeniedSection
- ✅ **Themes:** ThemeProvider e ThemeToggle
- ✅ **Loading:** Spinner component

## Configurações
- ✅ **TypeScript:** Configurado com tsconfig.json
- ✅ **Tailwind:** PostCSS e config
- ✅ **Next.js:** next.config.ts básico
- ✅ **Manifest:** PWA básico

## Próximos Passos Sugeridos
- Implementar lógica real no loginAction (chamar API /session)
- Adicionar middleware para proteção de rotas privadas
- Implementar páginas para usuários, segmentos, produtos
- Adicionar tabelas e CRUD no dashboard
- Melhorar UX com loading states e validações
- Implementar logout e gerenciamento de sessão
- Adicionar testes unitários e E2E

## Dependências Principais
- Next.js 16.1.4
- React 19.2.3
- Radix UI components
- Tailwind CSS v4
- next-themes
- lucide-react (ícones)
- sonner (toasts)

## Imagens - medidas 
- O tamanho ideal para imagens é 800X450
- Exportar imagens no formato WebP com 80% de qualidade