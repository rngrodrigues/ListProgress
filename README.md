# 🧑‍💻 ListProgress

Aplicação web de produtividade para criação e gerenciamento de cards e tarefas, com cálculo automático de progresso, autenticação de usuários e isolamento total de dados por usuário.

## 💡 Motivação

Este projeto foi desenvolvido com o objetivo de aplicar, na prática, conceitos de arquitetura frontend e backend, autenticação segura, separação de responsabilidades e regras de negócio comuns em aplicações reais de mercado.

---

## 🌐 Deploy

Foi utilizado Vercel para hospedagem do frontend e Railway para hospedagem da API.

[Clique aqui para acessar o ListProgress.](https://listprogress.vercel.app/login)

---

## 🎯 O que este projeto demonstra

- Consumo de API REST real;
- Autenticação e autorização de usuários;
- CRUD completo com persistência em banco;
- Arquitetura em camadas (Controller → Service → Repository);
- Separação clara entre UI, lógica e dados;
- Uso consistente de TypeScript no frontend e backend;
- Boas práticas de organização e escalabilidade;

---

## 📌 Funcionalidades

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

## 📸 Preview

### Desktop
![Home Desktop](https://github.com/rngrodrigues/ListProgress/blob/main/ListProgress/frontend/src/assets/icons/img/mobile-home.png)

### Mobile
![Home Mobile](https://github.com/rngrodrigues/ListProgress/blob/main/ListProgress/frontend/src/assets/icons/img/desktop-home.png)

---

## 🚀 Tecnologias

A aplicação é dividida em **Frontend** e **Backend**, seguindo princípios de separação de responsabilidades, reutilização de código e facilidade de manutenção.

### Frontend
- **React 18.3.1**: Interface baseada em componentes reutilizáveis.
- **TypeScript 5.9.3**: Tipagem estática para maior confiabilidade e manutenibilidade.
- **Vite 7.1.7**: Build tool rápida e otimizada para desenvolvimento moderno.
- **Styled Components 6.1.19**: Estilização com CSS-in-JS, temas e suporte a dark mode.
- **React Router DOM 7.9.5**: Navegação entre páginas.
- **Framer Motion 12.23.24**: Animações e transições.
- **SweetAlert2 11.26.10**: Alertas interativos.
- **UUID 13.0.0**: Geração de IDs únicos para cards e tarefas.
- **JWT-decode 3.1.2**: Decodificação de tokens JWT.
- **Fetch API**: Comunicação entre o frontend e a API.
- **LocalStorage**: Persistência de dados no modo demo (sem necessidade de login).

### Backend
- **Express 5.2.1**: Framework para criação da API, gerenciamento de rotas e requisições.
- **Node.js 24.10.0**: API REST para gerenciamento de cards, tarefas e usuários.
- **TypeScript 5.9.3**: Padronização e segurança na lógica de negócio.
- **bcrypt 6.0.0**: Hash de senhas para autenticação segura.
- **JWT (JSON Web Token) 9.0.3**: Controle de autenticação e autorização via tokens seguros.
- **dotenv 17.2.3**: Gerenciamento de variáveis de ambiente.
- **CORS 2.8.5**: Middleware responsável por permitir a comunicação entre o frontend e a API.
- **Supabase (PostgreSQL) 2.87.1**: Persistência de dados.

---

## 🧠 Arquitetura do Projeto

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

## ⚙️ Rodando o projeto localmente

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
