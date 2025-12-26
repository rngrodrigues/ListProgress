import { v4 as uuidv4 } from "uuid";

export const TASKS_KEY = "demo_tasks";

const getStored = () =>
  JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");

const saveStored = (tasks: any[]) =>
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const TaskDemoService = {
  create: async (task: any) => {
    const tasks = getStored();
    const newTask = {
      ...task,
      id: uuidv4(),
      completed: false,
    };

    saveStored([...tasks, newTask]);
    return newTask;
  },

  list: async () => getStored(),

  delete: async (id: string) => {
    const tasks = getStored().filter(
      (t: any) => t.id !== id
    );
    saveStored(tasks);
  },

  update: async (id: string, task: any) => {
    const tasks = getStored().map((t: any) =>
      t.id === id ? { ...t, ...task } : t
    );

    saveStored(tasks);
    return task;
  },

  findById: async (id: string) =>
    getStored().find((t: any) => t.id === id),

  listByCard: async (cardId: string) =>
    getStored().filter((t: any) => t.card_id === cardId),
};
