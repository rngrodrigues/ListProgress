import { useEffect, useMemo, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Footer from "../../components/Footer";
import { ModalAddCard } from "../../components/Modals";
import { AddBtn } from "../../components/Utils/Buttons";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList";
import { TopContainer } from "./Home.styles";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { SearchInput } from "../../components/Utils/Inputs";
import { useAuth } from "../../contexts/authContext";
import { toast } from "../../components/Utils/Toasts/Toasts";
import { useCards } from "../../hooks/useCards";
import type { Card } from "../../types/Card";

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const {
    cards,
    setCards,
    addCard,
    updateCard,
    deleteCard,
    loading: cardsLoading,
  } = useCards();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Card | null>(null);
  const [page, setPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);




  const filteredCards = useMemo<Card[]>(() => {
    if (!search.trim()) return cards;

    const term = search.toLowerCase();

    return cards.filter(
      (card) =>
        card.title.toLowerCase().includes(term) ||
        card.category?.toLowerCase().includes(term)
    );
  }, [cards, search]);

  const visibleCards = useMemo<Card[]>(() => {
    return filteredCards.filter((c) => !c.completed);
  }, [filteredCards]);

  const totalPages = useMemo<number>(() => {
    return Math.max(1, Math.ceil(visibleCards.length / ITEMS_PER_PAGE));
  }, [visibleCards.length]);

  useEffect(() => {
    setPage((prevPage) => {
      const nextPage = Math.min(prevPage, totalPages - 1);

      if (nextPage < prevPage) {
        setDirection(-1);
      }

      return nextPage;
    });
  }, [totalPages]);

  function handleChangePage(step: number) {
    setDirection(step);
    setPage((prev) => prev + step);
  }

  async function handleEditCard(id: string, updatedCard: Partial<Card>) {
  try {
    await updateCard(id, updatedCard);
  } catch (err) {
    console.error(err);
    toast.error("Erro ao atualizar a lista");
  }
}


if (authLoading || cardsLoading) return null;

  async function handleAddCard(newCard: Partial<Card>) {
    try {
      await addCard(newCard);

      const newIndex = cards.length;
      const newPage = Math.floor(newIndex / ITEMS_PER_PAGE);

      setDirection(newPage > page ? 1 : -1);
      setPage(newPage);

      toast.success("Lista criada com sucesso!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar a lista");
    }
  }

 async function handleDeleteCard(id: string) {
  return deleteCard(id);
}

  return (
    <>
      <AnimatePresence>
        {open && (
          <ModalAddCard
            isOpen={open}
            onClose={() => setOpen(false)}
            onAddCard={handleAddCard}
          />
        )}
      </AnimatePresence>

      <MainContainer>
        {!selectedTask && (
          <TopContainer>
            <AddBtn onClick={() => setOpen(true)}>
              Adicionar lista
            </AddBtn>

            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </TopContainer>
        )}

        <AnimatePresence mode="wait">
          {selectedTask ? (
            <motion.div
              key="task"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskList
                
                id={selectedTask.id}
                title={selectedTask.title}
                category={selectedTask.category}
                description={selectedTask.description}
                onBack={() => {
                  setSelectedTask(null);
                  setRefreshKey((prev) => prev + 1);
                }}
                onCardUpdate={(updatedCard: Card) => {
                  setCards((prev) =>
                    prev.map((c) =>
                      c.id === updatedCard.id
                        ? { ...c, ...updatedCard }
                        : c
                    )
                  );
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TaskBoard
  key={refreshKey}
  cards={visibleCards}
  page={page}
  direction={direction}
  onChangePage={handleChangePage}
  onEdit={handleEditCard}
  onDelete={handleDeleteCard}
  onSelect={setSelectedTask}
  emptyMessage="Clique em “Adicionar lista” para criar a sua primeira meta."
/>

            </motion.div>
          )}
        </AnimatePresence>
      </MainContainer>

      <Footer />
    </>
  );
};

export default Home;
