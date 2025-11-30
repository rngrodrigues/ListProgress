import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import { TaskCard } from "../../components/TaskCard";
import Footer from "../../components/Footer";
import { ModalAddCard } from "../../components/Modals";
import { AddBtn } from "../../components/Utils/Buttons";
import { SearchInput } from "../../components/Utils/Inputs";
import { GridContainer, MainParagrafo, PaginationContainer, TopContainer } from "./Home.styles.ts";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList.tsx";
import { usePagination } from "../../hooks/usePagination";

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100vw" : "-100vw",
    opacity: 0,
    position: "absolute"
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative"
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100vw" : "100vw",
    opacity: 0,
    position: "absolute"
  })
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const {
    page, direction, 
    totalPages, currentTasks, changePage
  } = usePagination(cards, 6);

  return (
    <>
      <AnimatePresence>
        {open && (
          <ModalAddCard
            isOpen={open}
            onClose={() => setOpen(false)}
            onAddCard={(newCard: any) => {
              setCards(prev => [...prev, newCard]);
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <MainContainer>

        {!selectedTask && (
          <TopContainer>
            <AddBtn onClick={() => setOpen(true)}> Adicionar lista </AddBtn>
            <SearchInput />
          </TopContainer>
        )}

        <AnimatePresence>
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
                description={selectedTask.Description}
                progress={selectedTask.progress}
                onBack={() => setSelectedTask(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedTask && (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              variants={pageVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ width: "100%" }}
            >
              <GridContainer>
  {cards.length === 0 && (
    <MainParagrafo>
      Clique em “Adicionar lista” para criar a primeira.
    </MainParagrafo>
  )}
  {currentTasks.map((card) => (
    <TaskCard
      key={card.id}
      {...card}
      onClick={() => setSelectedTask(card)}
      onEdit={(updatedCard) => {
        setCards(prev =>
          prev.map(c => (c.id === updatedCard.id ? updatedCard : c))
        );
      }}
      onDelete={(id) => {
        setCards(prev => prev.filter(c => c.id !== id));
      }}
    />
  ))}
</GridContainer>

            </motion.div>
          </AnimatePresence>
        )}

        {!selectedTask && (
          <PaginationContainer>
            <button onClick={() => changePage(-1)}>◀</button>
            <span>{page + 1} / {totalPages}</span>
            <button onClick={() => changePage(1)}>▶</button>
          </PaginationContainer>
        )}
      </MainContainer>

      <Footer />
    </>
  );
};

export default Home;
