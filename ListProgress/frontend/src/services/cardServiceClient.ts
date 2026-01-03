import { apiFetch } from "./apiFetch";

// Serviço de cards que comunica diretamente com a API real
export const CardServiceClient = {
  // Retorna todos os cards do usuário
  list: () => apiFetch("/cards"),

  // Cria um novo card enviando os dados para a API
  create: (card: any) => 
    apiFetch("/cards", { method: "POST", body: JSON.stringify(card) }),

  // Atualiza um card existente pelo ID
  update: (id: string, card: any) => 
    apiFetch(`/cards/${id}`, { method: "PUT", body: JSON.stringify(card) }),

  // Remove um card pelo ID
  delete: (id: string) => 
    apiFetch(`/cards/${id}`, { method: "DELETE" }),

  // Busca um card específico pelo ID
  findById: (id: string) => apiFetch(`/cards/${id}`),

  // Lista as tarefas associadas a um card específico
  listTasks: (cardId: string) => apiFetch(`/cards/${cardId}/tasks`)
};
