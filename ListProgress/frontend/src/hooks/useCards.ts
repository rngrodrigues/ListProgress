import { useEffect, useState } from "react";
import { toast } from "../components/Utils/Toasts/Toasts";
import { useCardService } from "./useCardServices";
import { DemoExpiredError } from "../services/cardDemoService";
import { useNavigate } from "react-router-dom";

export function useCards() {
  const cardsService = useCardService();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoError = (err: any) => {
    if (err instanceof DemoExpiredError) {
      toast.info("Modo Demo expirado!");
         navigate("/login");
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);

      try {
        const data = await cardsService.list();
        setCards(data);
      } catch (err) {
        if (!handleDemoError(err)) {
          console.error(err);
          toast.error("Erro ao carregar seus cards.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [cardsService]);

  async function addCard(newCard: any) {
    try {
      const payload = { ...newCard, position: cards.length };
      const created = await cardsService.create(payload);

      setCards((prev) => [...prev, created]);
      toast.success("Card criado com sucesso!");
      return created;
    } catch (err) {
      if (!handleDemoError(err)) {
        console.error(err);
        toast.error("Erro ao criar card!");
      }
    }
  }

  async function updateCard(id: string, updatedCard: any) {
    try {
      const data = await cardsService.update(id, updatedCard);

      setCards((prev) =>
  prev.map((c) => (c.id === id ? { ...c, ...data } : c))
);
      toast.info("Card atualizado!");
    } catch (err) {
      if (!handleDemoError(err)) {
        console.error(err);
        toast.error("Erro ao atualizar a lista");
      }
    }
  }

  async function deleteCard(id: string) {
    try {
      await cardsService.delete(id);

      setCards((prev) =>
        prev
          .filter((c) => c.id !== id)
          .map((c, index) => ({ ...c, position: index }))
      );
      toast.successDelete("Card removido!");
    } catch (err) {
      if (!handleDemoError(err)) {
        console.error(err);
        toast.error("Erro ao remover a lista");
      }
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
