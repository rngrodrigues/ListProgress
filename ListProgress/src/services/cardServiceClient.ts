import { apiFetch } from "./apiFetch";

export const CardServiceClient = {
  list: () => apiFetch("/cards"),
  create: (card: any) => apiFetch("/cards", { method: "POST", body: JSON.stringify(card) }),
  update: (id: string, card: any) => apiFetch(`/cards/${id}`, { method: "PUT", body: JSON.stringify(card) }),
  delete: (id: string) => apiFetch(`/cards/${id}`, { method: "DELETE" }),
  findById: (id: string) => apiFetch(`/cards/${id}`),
  listTasks: (cardId: string) => apiFetch(`/cards/${cardId}/tasks`)
};

