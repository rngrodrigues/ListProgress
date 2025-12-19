import { TaskDemoService } from './taskDemoService.ts';
import { v4 as uuidv4 } from "uuid";

const KEY = "demo_cards";

const getStored = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const saveStored = (cards: any[]) => localStorage.setItem(KEY, JSON.stringify(cards));

const removeCompletedCards = async () => {
  const cards = getStored();
  const remainingCards = cards.filter((card: any) => card.completed !== true);
  saveStored(remainingCards);

  const completedCards = cards.filter((card: any) => card.completed === true);

    for (const card of completedCards) {
      const tasks = await TaskDemoService.listByCard(card.id);
      tasks.forEach((task: any) => TaskDemoService.delete(task.id));
  }
};

export const CardDemoService = {
  create: async (card: any) => {
    const cards = getStored();
    const newCard = { ...card, id: uuidv4() }; 
    saveStored([...cards, newCard]);
    return newCard;
  },

  list: async () => {
    return getStored();
  },

  delete: async (id: string) => {
    const cards = getStored().filter((c: any) => c.id !== id);
    saveStored(cards);
    const tasks = await TaskDemoService.listByCard(id); 
    tasks.forEach((task: any) => TaskDemoService.delete(task.id)); 
  },

  update: async (id: string, card: any) => {
    const cards = getStored().map((c: any) => (c.id === id ? { ...c, ...card } : c));
    saveStored(cards);
    removeCompletedCards(); 
    return card;
  },

  findById: async (id: string) => getStored().find((c: any) => c.id === id),

  listTasks: async (cardId: string) => {
    const cards = getStored();
    return cards.find((c: any) => c.id === cardId)?.tasks || [];
  }
};
