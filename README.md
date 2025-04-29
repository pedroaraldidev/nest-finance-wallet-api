
# Finance Wallet API

Este é um projeto da API de gerenciamento de carteiras financeiras desenvolvido com **NestJS**. Ele oferece funcionalidades de autenticação, criação de transações e integração com **Redis**.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter o Docker e o Docker Compose instalados no seu sistema. Se você ainda não tem o Docker instalado, siga as instruções da documentação oficial:

- [Docker Installation](https://docs.docker.com/get-docker/)
- [Docker Compose Installation](https://docs.docker.com/compose/install/)

## Rodando a Aplicação com Docker

### Passo 1: Clone o repositório

Clone o repositório da aplicação para sua máquina local:

```bash
git clone https://github.com/pedroaraldidev/nest-finance-wallet-api.git
cd nest-finance-wallet-api
```

### Passo 2: Instalar as dependências

Antes de construir a imagem Docker, instale as dependências do projeto:

```bash
npm install
```

### Passo 3: Criar a imagem Docker

Agora, para criar a imagem da aplicação e levantar o ambiente completo, rode o comando:

```bash
docker-compose up --build
```

Esse comando vai:

1. Construir as imagens Docker necessárias.
2. Rodar os containers do Redis e da aplicação NestJS.

### Passo 4: Acessando a aplicação

Após o Docker Compose ter subido os containers, a aplicação estará acessível na porta `3000` (ou qualquer outra configurada). Você pode acessar a API via:

- **Local**: [http://localhost:3000](http://localhost:3000)
- **Swagger UI**: [http://localhost:3000/api](http://localhost:3000/api)

### Passo 5: Parando os containers

Quando você terminar, pode parar os containers com o seguinte comando:

```bash
docker-compose down
```

Isso irá parar todos os containers e limpar os volumes.

---

## Estrutura do Projeto

- **src/**: Código-fonte da aplicação NestJS.
- **docker/**: Arquivos de configuração do Docker e Docker Compose.
