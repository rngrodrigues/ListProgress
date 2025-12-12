import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Footer from "../../components/Footer";
import { ModalAddCard } from "../../components/Modals";
import { AddBtn } from "../../components/Utils/Buttons";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList";
import { TopContainer } from "./Home.styles";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { SearchInput } from "../../components/Utils/Inputs";
import { apiFetch } from "../../services/apiFetch";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    apiFetch("/cards")
      .then((data) => {
        const ordered = data.sort((a: any, b: any) => {
          if (a.position == null) return 1;
          if (b.position == null) return -1;
          return a.position - b.position;
        });

        setCards(ordered);
      })
      .catch((err) => console.error("Erro ao carregar cards:", err));
  }, []);

  async function handleAddCard(newCard: any) {
    try {
      const nextPosition = cards.length;
      const payload = { ...newCard, position: nextPosition };

      const createdCard = await apiFetch("/cards", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setCards((prev) => {
        const list = [...prev, { ...createdCard, tasks: [] }];
        return list.sort((a, b) => a.position - b.position);
      });
    } catch (err) {
      console.error(err);
    }

    setOpen(false);
  }

  async function handleDeleteCard(id: string) {
    try {
      await apiFetch(`/cards/${id}`, { method: "DELETE" });

      setCards((prevCards) => {
        const next = prevCards
          .filter((c) => c.id !== id)
          .map((c, index) => ({ ...c, position: index }));

        const newTotalPages = Math.max(
          1,
          Math.ceil(next.length / ITEMS_PER_PAGE)
        );

        setPage((prevPage) => {
          const lastValidPage = newTotalPages - 1;
          return Math.min(prevPage, lastValidPage);
        });

        return next;
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleChangePage(step: number) {
    setDirection(step);
    setPage((prev) => prev + step);
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
            <AddBtn onClick={() => setOpen(true)}>Adicionar lista</AddBtn>
            <SearchInput />
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
                className="task-card"
                id={selectedTask.id}
                title={selectedTask.title}
                category={selectedTask.category}
                tasks={selectedTask.tasks}
                description={selectedTask.description}
                onBack={() => setSelectedTask(null)}
                onCardUpdate={(updatedCard) => {
                  setCards((prev) =>
                    prev.map((c) =>
                      c.id === updatedCard.id ? { ...c, ...updatedCard } : c
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
                cards={cards.filter((c) => !c.completed)}
                page={page}
                direction={direction}
                onChangePage={handleChangePage}
                onEdit={(updated) =>
                  setCards((prev) =>
                    prev.map((c) =>
                      c.id === updated.id ? { ...c, ...updated } : c
                    )
                  )
                }
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
