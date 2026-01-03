import { apiFetch } from "./apiFetch";

// Serviço de tarefas que se comunica diretamente com a API real
export const TaskServiceClient = {
  // Retorna todas as tarefas do usuário
  list: () => apiFetch("/tasks"),

  // Cria uma nova tarefa na API
  create: (task: any) =>
    apiFetch("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  // Atualiza uma tarefa existente pelo ID
  update: (id: string, task: any) =>
    apiFetch(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    }),

  // Remove uma tarefa pelo ID
  delete: (id: string) =>
    apiFetch(`/tasks/${id}`, {
      method: "DELETE",
    }),

  // Busca uma tarefa específica pelo ID
  findById: (id: string) =>
    apiFetch(`/tasks/${id}`),

  // Lista todas as tarefas associadas a um card específico
  listByCard: (cardId: string) =>
    apiFetch(`/cards/${cardId}/tasks`),
};
