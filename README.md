# CRUD Fullstack 

Projeto: Aplicação simples de cadastro de usuários (CRUD) com frontend em React e backend em Node.js + MongoDB.

## Stack usada

- Frontend: React.js (Vite)
- Backend: Node.js + Express
- Banco de dados: MongoDB (via Mongoose)
- Comunicação: Axios (no frontend)
- Outras libs: CORS, dotenv


## Estrutura do projeto

```
CRUD_fullstack/
├─ back-end/         # API Express + Mongoose
│  ├─ app.js
│  ├─ Users.js
│  └─ package.json
├─ front-end/        # App React (Vite)
│  ├─ src/
│  └─ package.json
└─ README.md
```

## Requisitos

- Node.js (v16+ recomendado)
- npm
- MongoDB (pode ser local ou Atlas)

## Variáveis de ambiente (backend)

Crie um arquivo `.env` dentro da pasta `back-end/` com a variável abaixo:

```
MONGO_URI=<sua_string_de_conexao_com_mongodb>
```

Exemplo (MongoDB Atlas):
MONGO_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/meubanco?retryWrites=true&w=majority

OBS: a aplicação já lê `process.env.MONGO_URI` em `back-end/app.js`.

## Como rodar

1. Clonar o repositório

2. Backend

Abra um terminal na pasta `back-end` e rode:

```powershell
cd back-end
npm install
# Em desenvolvimento
node app.js
```

O servidor roda por padrão na porta `8081`. Você verá mensagens como "Conectado ao MongoDB" e "servidor ON.." no terminal.


3. Frontend

Abra um terminal na pasta `front-end` e rode:

```powershell
cd front-end
npm install
npm run dev
```

O Vite iniciará o servidor de desenvolvimento (normalmente em `http://localhost:5173`). A aplicação frontend espera que a API esteja disponível para listar/criar/editar/excluir usuários.

## Rotas da API

Base URL (padrão): http://localhost:8081

- GET /users → listar todos os usuários
- GET /users/:id → buscar um usuário por id
- POST /users → criar um novo usuário
- PUT /users/:id → atualizar usuário
- DELETE /users/:id → excluir usuário

Exemplo de corpo para POST/PUT (JSON):

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "occupation": "Desenvolvedor"
}
```

Observações de validação e respostas

- Os campos `name`, `email` e `occupation` são obrigatórios (definidos no schema `Users.js`).
- `email` é único; se tentar cadastrar um email já existente, a API retorna status `409` com `{ message: "E-mail já cadastrado." }`.
- As respostas de erro incluem mensagens úteis (404 para não encontrado, 500 para erro de servidor).

## Problemas comuns 

- "Erro ao conectar no MongoDB": verifique a variável `MONGO_URI`, sua rede, credenciais e se o banco aceita conexões externas (no Atlas habilite IPs ou use uma whitelist temporária).
- Porta em uso: se `8081` já estiver ocupada, altere `PORT` em `back-end/app.js` e reinicie.
- Erros na criação de usuário com status 409: verifique se o email já não existe.
- Se o frontend não encontra a API, verifique a URL usada pelo cliente (arquivo `front-end/src/services/api.js`) e ajuste para `http://localhost:8081` se necessário.

## Observações de implementação

- O schema de usuário (`back-end/Users.js`) contém os campos:
  - `name` (String, required)
  - `email` (String, required, unique)
  - `occupation` (String, required)
  - `dataCriacao` (Date, default: Date.now)
- No backend, o código usa Mongoose para operações CRUD e trata duplicidade de email via `error.code === 11000`.


## Contato

Projeto por Matheus A. Farias Cioca — https://github.com/matheusafc
