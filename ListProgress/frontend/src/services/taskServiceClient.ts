import { apiFetch } from "./apiFetch";


export const TaskServiceClient = {

  list: () => apiFetch("/tasks"),

  create: (task: any) =>
    apiFetch("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  update: (id: string, task: any) =>
    apiFetch(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    }),

  delete: (id: string) =>
    apiFetch(`/tasks/${id}`, {
      method: "DELETE",
    }),

  findById: (id: string) =>
    apiFetch(`/tasks/${id}`),

  listByCard: (cardId: string) =>
    apiFetch(`/cards/${cardId}/tasks`),
};
