<h1 align="center">ListProgress</h1>

<p align="center">
  ↓ Acesse o projeto
</p>

<p align="center">
  <a href="https://listprogress.vercel.app">
    <img src="https://img.shields.io/badge/deploy-online-green?style=for-the-badge&logo=vercel" />
  </a>
</p>

## Preview

### Desktop
![Home Desktop](https://github.com/rngrodrigues/ListProgress/blob/main/ListProgress/frontend/src/assets/icons/img/mobile-home.png)

### Mobile
![Home Mobile](https://github.com/rngrodrigues/ListProgress/blob/main/ListProgress/frontend/src/assets/icons/img/desktop-home.png)


## O que é esse projeto?

Aplicação web de produtividade para criação e gerenciamento de cards e tarefas, com cálculo automático de progresso, autenticação de usuários e isolamento total de dados por usuário.

## Motivação

Este projeto foi desenvolvido com o objetivo de aplicar, na prática, conceitos de arquitetura frontend e backend, autenticação segura, separação de responsabilidades e regras de negócio comuns em aplicações reais de mercado.

---

## O que este projeto demonstra

- Consumo de API REST real;
- Autenticação e autorização de usuários;
- CRUD completo com persistência em banco;
- Arquitetura em camadas (Controller → Service → Repository);
- Separação clara entre UI, lógica e dados;
- Uso consistente de TypeScript no frontend e backend;
- Boas práticas de organização e escalabilidade;

---

## Funcionalidades

- Autenticação de usuários com JWT;
- Token JWT com expiração automática (1h);
- Proteção de rotas autenticadas;
- CRUD completo de Cards;
- CRUD completo de Tarefas;
- Cálculo automático de progresso por Card;
- Histórico de cards concluídos;
- Dark Mode;
- Paginação de cards (6 por página);
- Persistência de dados no banco;
- Isolamento de dados por usuário;
- Modo demo para navegação sem login;

---

## Estrutura de pastas;

```
backend/
├── node_modules/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── app/
│
├── package.json
└── tsconfig.json
```

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Loading/
│   │   ├── Modals/
│   │   ├── TaskBoard/
│   │   ├── TaskCard/
│   │   ├── TaskList/
│   │   ├── TaskProgress/
│   │   └── Utils/
│   │       ├── Buttons/
│   │       ├── Inputs/
│   │       └── Toasts/
│   │
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Historico/
│   │   ├── ComoUsar/
│   │   └── SobreNos/
│   │
│   ├── services/
│   ├── types/
│   └── styles/
│
├── index.html
└── package.json
```
---

## Tecnologias

A aplicação é dividida em **Frontend** e **Backend**, seguindo princípios de separação de responsabilidades, reutilização de código e facilidade de manutenção.

### Frontend
- **React 18.3.1**;
- **TypeScript 5.9.3**;
- **Vite 7.1.7**;
- **Styled Components 6.1.19**;
- **React Router DOM 7.9.5**;
- **Framer Motion 12.23.24**;
- **SweetAlert2 11.26.10**;
- **UUID 13.0.0**;
- **JWT-decode 3.1.2**;
- **Fetch API**;
- **LocalStorage**;

### Backend
- **Express 5.2.1**;
- **Node.js 24.10.0**;
- **TypeScript 5.9.3**;
- **bcrypt 6.0.0**;
- **JWT (JSON Web Token) 9.0.3**;
- **dotenv 17.2.3**;
- **CORS 2.8.5**;
- **Supabase (PostgreSQL) 2.87.1**;

---

## Arquitetura do Projeto

O projeto segue arquitetura em camadas, separando claramente interface, lógica de negócio e persistência de dados.

### Frontend
- **Components**: Componentes reutilizáveis de UI (Footer, Header, Layout, TaskCard, TaskProgress, etc);
- **Pages**: Páginas da aplicação (Home, Historico, Como usar?, Sobre nós);
- **Hooks**: Lógica de negócios desacopladas da interface (useCards, useLogin, useTask, usePagination);
- **Contexts**: Estado global (authContext e themeContext);
- **Services**: Requisições da aplicação (apiFetch, cardDemoService, cardServiceClient, taskDemoService, taskServiceClient);

### Backend
- **Controllers**: Camada responsável por receber as requisições (cardController, taskController);
- **Services**: Regras de negócio da aplicação (authService, cardService, taskService);
- **Repositories**: Acesso e persistência de dados (cardRepository, taskRepository e userRepository);
- **Routes**: Definição das rotas da API (authRoutes, cardRoutes e taskRoutes);
- **Middleware de autenticação**: Proteção de rotas (authMiddleware);

---

## Como rodar o projeto?

Siga estes passos para testar o **ListProgress** na sua máquina:

### Pré-requisitos

- Node.js >= 20.x
- npm ou yarn
- Conta no Supabase

### 1️⃣ Clonar o repositório

git clone https://github.com/rngrodrigues/ListProgress.git

### 2️⃣ Configurar Supabase

Crie um projeto no Supabase;
Copie o Project URL e a Anon public key;
Crie um arquivo .env na pasta **backend** e preencha:

SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key

### 3️⃣ Rodar o backend 

> Abra o terminal;
> ⚠️ Certifique-se de estar na pasta correta (onde está o `.env`).  
> Por **exemplo**, no terminal:  
> `cd seu-usuario/listprogress/backend`
>  Rode os seguintes comandos:

```bash
npm install
npm run dev
```

Servidor ficará em: http://localhost:3001

### 4️⃣ Rodar o frontend:

> Abra outro terminal;
> ⚠️ Certifique-se de estar na pasta correta
> Por **exemplo**, no terminal:  
> `cd seu-usuario/listprogress/frontend`

```bash
npm install
npm run dev
```

Aplicação ficará disponível em: http://localhost:5173
