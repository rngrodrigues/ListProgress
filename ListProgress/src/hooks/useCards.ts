import { useEffect, useState } from "react";
import { toast } from "../components/Utils/Toasts/Toasts";
import { useCardService } from "./useCardServices";
import { isDemoExpired, clearDemoData } from "../services/cardDemoService"; 
import jwt_decode from "jwt-decode";  

const isTokenExpired = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return false; 
  }

  try {
    const decodedToken: any = jwt_decode(token);
    const currentTime = Date.now() / 1000; 
    return decodedToken.exp < currentTime; 
  } catch (error) {
    console.error("Erro ao verificar a expiração do token:", error);
    return true; 
  }
};

const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
};

export function useCards() {
  const cardsService = useCardService();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const checkTokenExpiration = () => {

    
    if (isTokenExpired()) {

       toast.error("Sessão expirada!");

      clearAuthData();

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); 

      return true; 
    }
    return false; 
  };

  useEffect(() => {
    const fetchCards = async () => {
      
      const demoExpired = isDemoExpired();
      if (demoExpired) {
        toast.info("Modo Demo expirado!");
        clearDemoData();

        setTimeout(() => {
          window.location.href = "/login"; 
        }, 1000);
        return; 
      }
  
      if (checkTokenExpiration()) return; 

      try {
        const data = await cardsService.list();
        const ordered = data.sort((a: any, b: any) => {
          if (a.position == null) return 1;
          if (b.position == null) return -1;
          return a.position - b.position;
        });
        setCards(ordered);
      } catch (err) {
        console.error("Erro ao carregar cards:", err);
        toast.error("Erro ao carregar suas listas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [cardsService]);

  async function addCard(newCard: any) {

    const demoExpired = isDemoExpired();
    if (demoExpired) {
      toast.info("Modo Demo expirado!");
      clearDemoData();
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 1000);
      return; 
    }

    
    if (checkTokenExpiration()) return;

    try {
      const payload = { ...newCard, position: cards.length };
      const created = await cardsService.create(payload);
      setCards((prev) => [...prev, created]);
      toast.success("Lista criada com sucesso!");
      return created;
    } catch (err) {
      console.error("Erro ao criar card:", err);
      toast.error("Erro ao criar a lista");
    }
  }

  async function updateCard(id: string, updatedCard: any) {

    const demoExpired = isDemoExpired();
    if (demoExpired) {
      toast.info("Modo Demo expirado!");
      clearDemoData();
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 1000);
      return; 
    }

    if (checkTokenExpiration()) return;

    try {
      const data = await cardsService.update(id, updatedCard);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...data } : c))
      );

    } catch (err) {
      console.error("Erro ao atualizar card:", err);
      toast.error("Erro ao atualizar a lista");
    }
  }

  async function deleteCard(id: string) {

    const demoExpired = isDemoExpired();
    if (demoExpired) {
      toast.info("Modo Demo expirado!");
      clearDemoData();
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 1000);
      return; 
    }

    if (checkTokenExpiration()) return;

    try {
      await cardsService.delete(id);
      setCards((prev) =>
        prev
          .filter((c) => c.id !== id)
          .map((c, index) => ({ ...c, position: index })));
      toast.successDelete("Lista removida com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar card:", err);
      toast.error("Erro ao remover a lista");
    }
  }

  return {
    cards,
    setCards,
    addCard,
    updateCard,
    deleteCard,
    loading,
  };
}
