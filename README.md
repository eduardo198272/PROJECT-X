# Project-X Backend

Este é o backend do projeto Project-X, um sistema de e-commerce desenvolvido em Node.js utilizando Express e Prisma para gerenciamento de banco de dados. O objetivo deste backend é fornecer uma API RESTful para gerenciar categorias e produtos, além de autenticação de usuários.

## Tecnologias Usadas

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT (JSON Web Token) para autenticação
- dotenv para gerenciamento de variáveis de ambiente

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/eduardo198272/PROJECT-X.git
   ```

2. **Instale as dependências**: Após clonar o repositório, navegue até o diretório do projeto e execute o comando `npm install` no terminal para instalar todas as dependências necessárias para o funcionamento do backend.

3. **Crie um arquivo `.env` no backend**: É essencial que você crie um arquivo chamado `.env` na raiz. Dentro desse arquivo, adicione as seguintes variáveis de ambiente:

   ```plaintext
   DATABASE_URL="postgresql://postgres:senha@localhost:5432/postgres"
   JWT_SECRET="token"
   ```

   Certifique-se de substituir `senha` pela senha que você utiliza no seu banco de dados PostgreSQL.

4. **Verifique o README do frontend**: Para garantir que seu ambiente esteja configurado corretamente, é importante que você também consulte o README do frontend. Ele contém informações relevantes, especialmente sobre como configurar o arquivo `.env` para que a comunicação entre o frontend e o backend funcione corretamente.


