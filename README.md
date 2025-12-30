# 🧑‍💻 ListProgress

Sistema web de gestão pessoal focado em produtividade, permitindo criar e organizar cards e tarefas com cálculo automático de progresso.
A aplicação oferece autenticação de usuários, persistência de dados e um design altamente responsivo, garantindo uma experiência consistente em diferentes dispositivos.

Os cards são organizados por paginação (6 por página), permitindo a criação de um número ilimitado de cards e tarefas sem impactar a usabilidade. 
Cada usuário possui acesso exclusivo aos seus dados, assegurando organização, segurança e privacidade.

---

## 🌐 Deploy

[Clique aqui para acessar o projeto](#)

---

## 🎯 Sobre o Projeto

O **ListProgress** foi desenvolvido com o objetivo de praticar e demonstrar conceitos de **arquitetura frontend e backend**, autenticação, regras de negócio e organização de código em aplicações reais.

Cada usuário pode criar seus próprios cards e tarefas, acompanhar o progresso automaticamente e visualizar um histórico de metas concluídas, em uma interface moderna e responsiva.

---

## 📸 Preview

### Desktop
![Home Desktop](https://github.com/rngrodrigues/ListProgress/blob/main/ListProgress/src/assets/icons/img/desktop-home.png)

### Mobile
![Home Mobile](https://github.com/rngrodrigues/ListProgress/blob/main/ListProgress/src/assets/icons/img/mobile-home.png)

---

## 🚀 Tecnologias

### Frontend
- **React** – Interface baseada em componentes reutilizáveis.
- **TypeScript** – Tipagem estática para maior confiabilidade e manutenibilidade.
- **Vite** – Build tool rápida e otimizada para desenvolvimento moderno.
- **Styled Components** – Estilização com CSS-in-JS, temas e suporte a dark mode.

### Backend
- **Node.js** – API REST para gerenciamento de cards, tarefas e usuários.
- **TypeScript** – Padronização e segurança na lógica de negócio.
- **bcrypt** – Hash de senhas para autenticação segura.

### Banco de Dados e Autenticação
- **LocalStorage** - Persistência de dados no modo demo (sem necessidade de login).
- **Supabase** – Persistência de dados e autenticação de usuários.

### Padrões e Boas Práticas
- **Hooks customizados** Centralizam a comunicação com a API, tratamento de erros e validações.
- **Context API** para autenticação e temas globais.
- **Arquitetura em Camadas (Controller → Service → Repository)** no backend.
- **Separação clara de responsabilidades** entre UI, lógica e dados.

---

## 📌 Funcionalidades

- Autenticação e autorização de usuários;
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

## 🧠 Arquitetura

### Frontend
- **Components** – Componentes reutilizáveis de UI;
- **Pages** – Páginas da aplicação (Home, Historico, Como usar?, Sobre nós);
- **Hooks** – Lógica de negócios desacopladas da interface;
- **Contexts** – Estado global (tema e autenticação);
- **Styled Components** – Estilos isolados por componente;

### Backend
- **Controllers** – Camada responsável por receber as requisições
- **Services** – Regras de negócio da aplicação
- **Repositories** – Acesso e persistência de dados
- **Routes** – Definição das rotas da API
- **Middleware de autenticação** – Proteção de rotas

---

## ⚙️ Rodando o projeto localmente

Siga estes passos para testar o **ListProgress** na sua máquina:

### Pré-requisitos

- Node.js >= 20.x
- npm ou yarn
- Conta no Supabase

### 1️⃣ Clonar o repositório

git clone https://github.com/rngrodrigues/ListProgress.git
cd list-progress

### 2️⃣ Configurar Supabase

Crie um projeto no Supabase;
Copie o Project URL e a Anon public key;
Crie um arquivo .env e preencha:

SUPABASE_URL=
SUPABASE_KEY=

### 3️⃣ Rodar o backend e frontend

> ⚠️ Certifique-se de estar na pasta raiz do projeto (onde está o `.env`).  
> Por exemplo, no terminal:  
> `cd caminho/para/ListProgress`
>  Rode os seguintes comandos:

```bash
npm install
```
```bash
npx ts-node src/server.ts
```
```bash
npm run dev -- --host
```

### 4️⃣ Se tudo der certo, você poderá acessar:

Servidor disponível em: http://localhost:3001
Aplicação disponível em: http://localhost:5173



