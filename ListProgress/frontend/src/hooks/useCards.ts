import { useEffect, useState } from "react";
import { toast } from "../components/Utils/Toasts/Toasts";
import { useCardService } from "./useCardServices";
import { isDemoExpired, clearDemoData } from "../services/cardDemoService"; 
import jwt_decode from "jwt-decode";  

// Verifica se o token JWT (Modo Demo) armazenado está expirado, após login/cadastro o token é excluido.
const isTokenExpired = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Sem token não há expiração a validar
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
// Hook de gerenciamento de cards com CRUD, validação de sessão e modo demo. <<--
export function useCards() {
  const cardsService = useCardService();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Valida token e força login se estiver expirado
  const checkTokenExpiration = () => {

    if (isTokenExpired()) {
      toast.error("Sessão expirada!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); 

      return true; 
    }
    return false; 
  };

  useEffect(() => {
    const fetchCards = async () => {
      
      // Bloqueia uso se o modo demo tiver expirado
      const demoExpired = isDemoExpired();
      if (demoExpired) {
        toast.info("Modo Demo expirado!");
        clearDemoData();

        setTimeout(() => {
          window.location.href = "/login"; 
        }, 1000);
        return; 
      }
  
      // Evita chamadas à API com token inválido
      if (checkTokenExpiration()) return; 

      try {
        const data = await cardsService.list();

        // Ordena cards pela posição para manter consistência visual
       const ordered = [...data].sort((a: any, b: any) => {
  if (a.position == null) return 1;
  if (b.position == null) return -1;
  return a.position - b.position;
});
 
        setCards(ordered);
      } catch (err) {
        console.error("Erro ao carregar cards:", err);
        toast.error("Erro ao carregar seus cards.");
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
      // Define posição inicial do card
      const payload = { ...newCard, position: cards.length };
      const created = await cardsService.create(payload);

      setCards((prev) => [...prev, created]);
      toast.success("Card criado com sucesso!");
      return created;
    } catch (err) {
      console.error("Erro ao criar card:", err);
      toast.error("Erro ao criar card!");
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

      // Atualiza apenas o card modificado
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

      // Reorganiza posições após remoção
      setCards((prev) =>
        prev
          .filter((c) => c.id !== id)
          .map((c, index) => ({ ...c, position: index }))
      );

      toast.successDelete("Card removido!");
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
