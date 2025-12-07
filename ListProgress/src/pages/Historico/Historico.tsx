import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList";
import { HistoricoTopContainer } from "./Historico.styles";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { SearchInput } from "../../components/Utils/Inputs";

const API_URL = "http://192.168.1.9:3001";

const Historico = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  function handleChangePage(step: number) {
    setDirection(step);
    setPage(prev => prev + step);
  }

   useEffect(() => {
      fetch(`${API_URL}/cards`)
      
        .then(res => res.json())
        .then(data => {
          const ordered = data.sort((a: any, b: any) => {
            if (a.position == null) return 1;
            if (b.position == null) return -1;
            return a.position - b.position;
          });
  
          setCards(ordered);
        })
        .catch(err => console.error("Erro ao carregar cards:", err));
    }, []);

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
              className="task-card"
              id={selectedTask.id}
              title={selectedTask.title}
              category={selectedTask.category}
              description={selectedTask.description}
              tasks={selectedTask.tasks}
              onBack={() => setSelectedTask(null)}
              onCardUpdate={(updatedCard) => {
        setCards(prev =>
          prev.map(c => c.id === updatedCard.id ? { ...c, ...updatedCard } : c)
        );
      }}
            />
          </motion.div>
        )}

        {!selectedTask && (
          <TaskBoard
            cards={cards.filter(c => c.completed)} 
           onEdit={(updated) =>
  setCards(prev =>
    prev.map(c =>
      c.id === updated.id
        ? { ...c, ...updated } 
        : c
    )
  )
}
            onDelete={(id) =>
              setCards(prev => prev.filter(c => c.id !== id))
            }
            onSelect={setSelectedTask}
            emptyMessage="Todas as suas tarefas concluídas aparecerão aqui."
            page={page}
            direction={direction}
            onChangePage={handleChangePage}
          />
        )}

      </MainContainer>

      <Footer />
    </>
  );
};

export default Historico;
