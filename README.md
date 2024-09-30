# Frontend para Sistema de Gerenciamento de Usuários

Este repositório contém o código-fonte do front-end da aplicação de gerenciamento de usuários, desenvolvido com **Next.js**, **React** e **TypeScript**. A interface permite criar, editar, visualizar e excluir usuários de forma interativa, além de buscar automaticamente endereços por meio da API ViaCEP.

O Desenho da Arquitetura está na raiz do projeto, no arquivo Desenho de Arquitetura.png

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e navegação otimizada.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework CSS para estilização rápida e personalizada.
- **Axios**: Biblioteca para realizar requisições HTTP.

## Funcionalidades

- CRUD de usuários (criação, consulta, atualização, exclusão).
- Consumo de API externa ViaCEP para preenchimento automático de endereços.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [Git](https://git-scm.com)

## Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/Luciahelenasantos/user-registry-frontend.git
cd user-registry-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Instale as dependências

Execute o projeto

```bash
npm run dev
```

Esse comando iniciará o servidor de desenvolvimento. A aplicação estará disponível em <http://localhost:3000>.

## Testando a Aplicação

### Você pode acessar a aplicação localmente e testar as seguintes funcionalidades

- Listar Usuários: Visualize todos os usuários cadastrados.
- Buscar Usuários: Buscas por CPF e e-mail.
- Adicionar Usuários: Cadastre novos usuários com informações como nome, CPF, e endereço.
- Editar Usuários: Atualize as informações de qualquer usuário.
- Deletar Usuários: Exclua um usuário da base de dados.

## Documentação da API

Certifique-se de que o backend da aplicação esteja rodando corretamente para consumir a API e usar a documentação interativa do Swagger em <http://localhost:8080/swagger-ui.html>.
