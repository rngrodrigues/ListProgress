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

const API_URL = "http://192.168.1.9:3001";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);


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

  async function handleAddCard(newCard: any) {
    try {
      const nextPosition = cards.length;
      const payload = { ...newCard, position: nextPosition };

    console.log("Enviando JSON para o backend (CREATE):", payload);

      const res = await fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newCard, position: nextPosition }),
      });

      const createdCard = await res.json();

      setCards(prev => {
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
      await fetch(`${API_URL}/cards/${id}`, { method: "DELETE" });

      setCards(prev =>
        prev
          .filter(c => c.id !== id)
          .map((c, index) => ({ ...c, position: index }))
      );
    } catch (err) {
      console.error(err);
    }
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
              setCards(prev =>
                prev.map(c =>
                  c.id === updated.id
                    ? { ...c, ...updated, position: c.position } 
                    : c
                )
              )
            }
            onDelete={handleDeleteCard}
            onSelect={setSelectedTask}
            emptyMessage="Clique em “Adicionar lista” para criar a sua primeira meta."
            showSearch={true}
          />
        )}

      </MainContainer>

      <Footer />
    </>
  );
};

export default Home;
