import { v4 as uuidv4 } from "uuid";

export const TASKS_KEY = "demo_tasks"; // Chave usada para armazenar tarefas no localStorage

// Recupera todas as tarefas salvas no localStorage
const getStored = () =>
  JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");

// Salva a lista de tarefas no localStorage
const saveStored = (tasks: any[]) =>
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

// Serviço de tarefas em modo demo, simulando um backend
export const TaskDemoService = {

  // Cria uma nova tarefa e adiciona à lista do localStorage
  create: async (task: any) => {
    const tasks = getStored();

    // Define ID único e marca a tarefa como não concluída
    const newTask = {
      ...task,
      id: uuidv4(),
      completed: false,
    };

    saveStored([...tasks, newTask]); // Adiciona a nova tarefa à lista
    return newTask; // Retorna a tarefa criada
  },

  // Retorna todas as tarefas do demo
  list: async () => getStored(),

  // Remove uma tarefa pelo ID
  delete: async (id: string) => {
    const tasks = getStored().filter((t: any) => t.id !== id); // Remove tarefa
    saveStored(tasks); // Salva lista atualizada
  },

  // Atualiza os dados de uma tarefa específica
  update: async (id: string, task: any) => {
    const tasks = getStored().map((t: any) =>
      t.id === id ? { ...t, ...task } : t
    );

    saveStored(tasks); // Salva alterações
    return task; // Retorna a tarefa atualizada
  },

  // Busca uma tarefa pelo ID
  findById: async (id: string) =>
    getStored().find((t: any) => t.id === id),

  // Lista todas as tarefas associadas a um card específico
  listByCard: async (cardId: string) =>
    getStored().filter((t: any) => t.card_id === cardId),
};
