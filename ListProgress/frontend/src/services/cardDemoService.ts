import { TaskDemoService, TASKS_KEY } from "./taskDemoService";
import { v4 as uuidv4 } from "uuid";

const CARDS_KEY = "demo_cards";
const DEMO_START_KEY = "demo_start_time";
const DEMO_EXPIRATION_TIME = 5 * 1000;

const getStored = () => JSON.parse(localStorage.getItem(CARDS_KEY) || "[]");
const saveStored = (cards: any[]) =>
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));

const getDemoStartTime = () => Number(localStorage.getItem(DEMO_START_KEY));
const setDemoStartTime = () =>
  localStorage.setItem(DEMO_START_KEY, Date.now().toString());

const isExpired = () => {
  const startTime = getDemoStartTime();
  if (!startTime) return false;
  return Date.now() - startTime > DEMO_EXPIRATION_TIME;
};

class DemoExpiredError extends Error {
  constructor() {
    super("DEMO_EXPIRED");
  }
}

const checkExpiration = () => {
  if (!isExpired()) return;
  localStorage.removeItem(CARDS_KEY);
  localStorage.removeItem(TASKS_KEY);
  throw new DemoExpiredError();
};

export const CardDemoService = {
  mode: "demo" as const,

  startDemo: () => {
    if (!getDemoStartTime()) {
      setDemoStartTime();
    }
  },

  list: async () => {
    checkExpiration();
    return getStored();
  },

  create: async (card: any) => {
    checkExpiration();

    const cards = getStored();
    if (cards.length === 0) {
      CardDemoService.startDemo();
    }

    const newCard = { ...card, id: uuidv4() };
    saveStored([...cards, newCard]);
    return newCard;
  },

  update: async (id: string, card: any) => {
    checkExpiration();

    const cards = getStored().map((c: any) =>
      c.id === id ? { ...c, ...card } : c
    );
    saveStored(cards);
    return card;
  },

  delete: async (id: string) => {
    checkExpiration();

    const cards = getStored().filter((c: any) => c.id !== id);
    saveStored(cards);

    const tasks = await TaskDemoService.listByCard(id);
    tasks.forEach((task: any) => TaskDemoService.delete(task.id));
  },

  findById: async (id: string) => {
    checkExpiration();
    return getStored().find((c: any) => c.id === id);
  },

  listTasks: async (cardId: string) => {
    checkExpiration();
    const cards = getStored();
    return cards.find((c: any) => c.id === cardId)?.tasks || [];
  },
};

export { DemoExpiredError };
