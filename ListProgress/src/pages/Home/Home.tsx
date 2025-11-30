import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import Footer from "../../components/Footer";
import { ModalAddCard } from "../../components/Modals";
import { AddBtn } from "../../components/Utils/Buttons";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList";
import { TopContainer } from "./Home.styles";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { SearchInput } from "../../components/Utils/Inputs";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  return (
    <>
      <AnimatePresence>
        {open && (
         <ModalAddCard
     isOpen={open}
    onClose={() => setOpen(false)}
     onAddCard={(newCard: any) => {
    setCards(prev => [...prev, { ...newCard, tasks: [] }]);
    setOpen(false);
     }}
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
              tasks={selectedTask.tasks}
              description={selectedTask.description}
              onBack={() => setSelectedTask(null)}
            />
          </motion.div>
        )}

        {!selectedTask && (
          <TaskBoard
            cards={cards}
            onEdit={(updated) =>
              setCards(prev => prev.map(c =>
                c.id === updated.id ? updated : c
              ))
            }
            onDelete={(id) =>
              setCards(prev => prev.filter(c => c.id !== id))
            }
            onSelect={setSelectedTask}
            emptyMessage="Clique em “Adicionar lista” para criar a primeira."
            showSearch={true}
          />
        )}
      </MainContainer>

      <Footer />
    </>
  );
};

export default Home;
