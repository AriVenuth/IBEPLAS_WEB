# 📖 Documentação de Endpoints - API IBEPLAS

A API utiliza o prefixo base `/api/v1` para todas as rotas. Respostas seguem o padrão JSON.

**Base URL:** `http://localhost:3333/api/v1`  
**Autenticação:** JWT (Roles: `ADMIN` ou `MANAGER`)

---

## 1. 👤 Usuários (`usuario-router.ts`)

### Login de Usuário
- **Endpoint:** `POST /session`
- **Autenticação:** Nenhuma
- **Body (JSON):** `{"email": "string", "senha": "string"}`
- **Exemplo:** `curl -X POST http://localhost:3333/api/v1/session -H "Content-Type: application/json" -d '{"email": "admin@ibeplas.com", "senha": "123456"}'`
- **Resposta:** `{"token": "jwt_token", "usuario": {...}}`

### Cadastrar Usuário
- **Endpoint:** `POST /usuario`
- **Autenticação:** `ADMIN`
- **Body (form-data):** `nome`, `email`, `senha`, `role`, `file` (imagem opcional)
- **Exemplo:** `curl -X POST http://localhost:3333/api/v1/usuario -H "Authorization: Bearer <token>" -F "nome=João Silva" -F "email=joao@ibeplas.com" -F "senha=123456" -F "role=MANAGER" -F "file=@imagem.jpg"`
- **Resposta:** `{"id": 1, "nome": "João Silva", ...}`

### Atualizar Usuário
- **Endpoint:** `PUT /usuario/:id`
- **Autenticação:** Qualquer logado
- **Body (form-data):** Campos opcionais (`nome`, `email`, `senha`, `file`)
- **Exemplo:** `curl -X PUT http://localhost:3333/api/v1/usuario/1 -H "Authorization: Bearer <token>" -F "nome=João Atualizado"`

### Atualizar Imagem do Usuário
- **Endpoint:** `PUT /usuario/imagem`
- **Autenticação:** Qualquer logado
- **Body (form-data):** `file` (imagem)
- **Exemplo:** `curl -X PUT http://localhost:3333/api/v1/usuario/imagem -H "Authorization: Bearer <token>" -F "file=@nova_imagem.jpg"`

### Deletar Usuário
- **Endpoint:** `DELETE /usuario/:id`
- **Autenticação:** `ADMIN`
- **Exemplo:** `curl -X DELETE http://localhost:3333/api/v1/usuario/1 -H "Authorization: Bearer <token>"`

### Detalhes do Usuário Logado
- **Endpoint:** `GET /me`
- **Autenticação:** Qualquer logado
- **Exemplo:** `curl -X GET http://localhost:3333/api/v1/me -H "Authorization: Bearer <token>"`

---

## 2. 📁 Segmentos (`segmento-routes.ts`)

### Listar Segmentos
- **GET** `/segmentos` (Público)

### Cadastrar Segmento
- **POST** `/segmentos` (`MANAGER`)
- **Body (form-data):** `nome`, `descricao`, `file` (imagem)
- **Exemplo:** `curl -X POST http://localhost:3333/api/v1/segmentos -H "Authorization: Bearer <token>" -F "nome=Alimentício" -F "file=@segmento.jpg"`

### Atualizar/Deletar Segmento
- **PUT** `/segmentos/:id` (`MANAGER`)
- **DELETE** `/segmentos/:id` (`MANAGER`)

---

## 3. 📦 Produtos (`produto-routes.ts`)

### Listar Produtos
- **GET** `/produtos` (Público)

### Cadastrar Produto
- **POST** `/produtos` (`MANAGER`)
- **Body (form-data):** `nome`, `descricao`, `linha_id`, `segmento_id`, `opcionais` (array), `file` (imagem)
- **Exemplo:** `curl -X POST http://localhost:3333/api/v1/produtos -H "Authorization: Bearer <token>" -F "nome=Produto X" -F "linha_id=1" -F "segmento_id=1" -F "file=@produto.jpg"`

### Atualizar/Deletar Produto
- **PUT** `/produtos/:id` (`MANAGER`)
- **DELETE** `/produtos/:id` (`MANAGER`) -> **Exclusão Lógica** via `excluirLogico`.

---

## 4. 🛒 Orçamentos (`orcamento-routes.ts`)

### Criar Orçamento (Público)
- **POST** `/orcamentos` (Rate Limit aplicado)
- **Body (JSON):** `{"nome": "string", "email": "string", "produtos": [1,2], ...}`
- **Exemplo:** `curl -X POST http://localhost:3333/api/v1/orcamentos -H "Content-Type: application/json" -d '{"nome": "Cliente", "email": "cliente@email.com", "produtos": [1,2]}'`

### Gestão Administrativa
- **GET** `/orcamentos` (`MANAGER`) -> Listar com filtros globais.
- **GET** `/orcamentos/:id` (`MANAGER`) -> Detalhar orçamento.
- **DELETE** `/orcamentos/:id` (`MANAGER`) -> **Exclusão Física**.

---

## 5. 📏 Linhas (`linha-routes.ts`)

- **GET** `/linhas` (Público)
- **POST** `/linhas` (`MANAGER`) -> Body: `nome`, `descricao`, `file` (imagem).
- **PUT/DELETE** `/linhas/:id` (`MANAGER`)

---

## 6. 📄 Currículos (`curriculo-routes.ts`)

- **POST** `/curriculos` (Público) -> Body: `nome`, `email`, `file` (PDF/DOCX).
- **GET** `/curriculos` (`MANAGER`) -> Listar recebidos.
- **DELETE** `/curriculos/:id` (`MANAGER`) -> Remove registro e arquivo.

---

## 🖼️ Banners (`banners-routes.ts`)

- **GET** `/banners` (Público)
- **POST** `/banners` (`MANAGER`) -> Body: `titulo`, `link`, `imagem_desktop`, `imagem_mobile`.
- **DELETE** `/banners/:id` (`MANAGER`) -> **Hard Delete** com limpeza de arquivos.

---

## 🛠️ Outros (`server.ts`)

- **GET** `/hello` -> Health check.
- **Resposta:** `{"message": "Hello, a API está funcionando corretamente!"}`