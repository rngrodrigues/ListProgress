import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList";
import { HistoricoTopContainer } from "./Historico.styles";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { SearchInput } from "../../components/Utils/Inputs";

const Historico = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  return (
    <>
      <MainContainer>

        {!selectedTask && (
          <HistoricoTopContainer>
            <SearchInput /> 
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
              tasks={selectedTask.tasks}
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
            emptyMessage="Todas as suas tarefas concluídas aparecerão aqui."
            showSearch={true} 
          />
        )}
      </MainContainer>

      <Footer />
    </>
  );
};

export default Historico;
