import { useEffect, useMemo, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList";
import { HistoricoTopContainer } from "./Historico.styles";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { SearchInput } from "../../components/Utils/Inputs";
import { useCards } from "../../hooks/useCards";

const ITEMS_PER_PAGE = 6;

const Historico = () => {
  const { cards, setCards, updateCard, deleteCard, loading } = useCards();
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Filtra apenas cards concluídos e que correspondam ao termo de busca
  const filteredCompletedCards = useMemo(() => {
    return cards.filter((card) => {
      if (!card.completed) return false;
      if (!search.trim()) return true;

      const term = search.toLowerCase();
      return (
        card.title?.toLowerCase().includes(term) ||
        card.category?.toLowerCase().includes(term)
      );
    });
  }, [cards, search]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredCompletedCards.length / ITEMS_PER_PAGE));
  }, [filteredCompletedCards.length]);

  useEffect(() => {
    setPage((prevPage) => {
      const nextPage = Math.min(prevPage, totalPages - 1);
      if (nextPage < prevPage) setDirection(-1);
      return nextPage;
    });
  }, [totalPages]);

  function handleChangePage(step: number) {
    setDirection(step);
    setPage((prev) => prev + step);
  }

  if (loading) return null;

  return (
    <>
      <MainContainer>
        {!selectedTask && (
          <HistoricoTopContainer>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </HistoricoTopContainer>
        )}

        {selectedTask && (
          <motion.div
            key="tasklist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            style={{ width: "100%" }}
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
              onCardUpdate={(updatedCard) => {
                setCards((prev) =>
                  prev.map((c) =>
                    c.id === updatedCard.id ? { ...c, ...updatedCard } : c
                  )
                );
              }}
            />
          </motion.div>
        )}

        {!selectedTask && (
          <TaskBoard
            cards={filteredCompletedCards}
            page={page}
            direction={direction}
            onChangePage={handleChangePage}
            onEdit={updateCard}
            onDelete={deleteCard}
            onSelect={setSelectedTask}
            emptyMessage="Todas as suas tarefas concluídas aparecerão aqui."
            key={refreshKey}
          />
        )}
      </MainContainer>

      <Footer />
    </>
  );
};

export default Historico;
