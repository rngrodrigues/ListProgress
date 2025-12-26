import { TaskDemoService, TASKS_KEY } from './taskDemoService.ts';
import { v4 as uuidv4 } from "uuid";

const CARDS_KEY = "demo_cards";
const DEMO_START_KEY = "demo_start_time";
const DEMO_EXPIRATION_TIME = 60 * 60 * 1000; 

const getStored = () => JSON.parse(localStorage.getItem(CARDS_KEY) || "[]");
const saveStored = (cards: any[]) => localStorage.setItem(CARDS_KEY, JSON.stringify(cards));

const getDemoStartTime = () => Number(localStorage.getItem(DEMO_START_KEY));
const setDemoStartTime = () => localStorage.setItem(DEMO_START_KEY, Date.now().toString());

export const isDemoExpired = () => {
  const startTime = getDemoStartTime();
  if (!startTime) return false; 

  const currentTime = Date.now();
  return currentTime - startTime > DEMO_EXPIRATION_TIME;
};


export const clearDemoData = () => {
   localStorage.removeItem(CARDS_KEY);
   localStorage.removeItem(TASKS_KEY);
};

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

  startDemo: () => {

    if (!getDemoStartTime()) {
      setDemoStartTime();
    }
  },

  create: async (card: any) => {
    
    const cards = getStored();
    if (cards.length === 0) {
  
      CardDemoService.startDemo(); 
    }

    const newCard = { ...card, id: uuidv4() }; 
    saveStored([...cards, newCard]);
    return newCard;
  },

list: async () => {
  const demoExpired = isDemoExpired();

  if (demoExpired) {

    clearDemoData();
    window.location.href = "/login"; 
    return;
  }

  const storedCards = getStored();
  return storedCards;
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

  findById: async (id: string) => {

    return getStored().find((c: any) => c.id === id);
  },

  listTasks: async (cardId: string) => {
  
    const cards = getStored();
    return cards.find((c: any) => c.id === cardId)?.tasks || [];
  }
};
