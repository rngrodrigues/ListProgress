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
import { useCards } from "../../hooks/useCards";
import type { Card } from "../../../../backend/src/types/Card";
import Loading from "../../components/Loading/Loading";

const ITEMS_PER_PAGE = 6; // Define quantos cards aparecem por página

const Home: React.FC = () => {
  const { loading: authLoading } = useAuth(); // Estado de carregamento do usuário
  const {
    cards,
    addCard,
    updateCard,
    deleteCard,
    ready, // Estado de carregamento dos cards
  } = useCards();

  const [open, setOpen] = useState<boolean>(false); // Modal de criação de card
  const [selectedTask, setSelectedTask] = useState<Card | null>(null); // Card selecionado para exibir tarefas
  const [page, setPage] = useState<number>(0); // Página atual do board
  const [direction, setDirection] = useState<number>(0); // Direção da animação de paginação
  const [search, setSearch] = useState<string>(""); // Termo de busca

  // Filtra cards pelo termo de busca
  const filteredCards = useMemo<Card[]>(() => {
    if (!search.trim()) return cards;

    const term = search.toLowerCase();
    return cards.filter(
      (card) =>
        card.title.toLowerCase().includes(term) ||
        card.category?.toLowerCase().includes(term)
    );
  }, [cards, search]);

  // Retorna apenas cards que não estão concluídos
  const visibleCards = useMemo<Card[]>(() => {
    return filteredCards.filter((c) => !c.completed);
  }, [filteredCards]);

  // Calcula número total de páginas baseado nos cards visíveis
  const totalPages = useMemo<number>(() => {
    return Math.max(1, Math.ceil(visibleCards.length / ITEMS_PER_PAGE));
  }, [visibleCards.length]);

  // Ajusta a página atual se o total de páginas diminuir
  useEffect(() => {
    setPage((prevPage) => {
      const nextPage = Math.min(prevPage, totalPages - 1);

      if (nextPage < prevPage) {
        setDirection(-1); // Animação para página anterior
      }

      return nextPage;
    });
  }, [totalPages]);

  // Função para navegar entre páginas
  function handleChangePage(step: number) {
    setDirection(step);
    setPage((prev) => prev + step);
  }

if (authLoading || !ready) {
  return <Loading />;
}
 // Espera carregamento de dados

  return (
    <>
      {/* Modal de criação de card */}
      <AnimatePresence>
        {open && (
          <ModalAddCard
            isOpen={open}
            onClose={() => setOpen(false)}
            onAddCard={addCard}  
          />
        )}
      </AnimatePresence>

      <MainContainer>
        {/* Barra superior: botão de adicionar card e busca */}
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

        {/* Alterna entre lista de tarefas e board de cards */}
        <AnimatePresence mode="wait">
          {selectedTask ? (
            <motion.div
              key="task"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Exibe tarefas de um card selecionado */}
              <TaskList
                id={selectedTask.id}
                title={selectedTask.title}
                category={selectedTask.category}
                description={selectedTask.description}
                onBack={() => setSelectedTask(null)}
                onCardUpdate={(updatedCard: Card) => updateCard(updatedCard.id, updatedCard)}  
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
              {/* Exibe o board de cards com paginação */}
              <TaskBoard
                cards={visibleCards}
                page={page}
                direction={direction}
                onChangePage={handleChangePage}
                onEdit={updateCard}  
                onDelete={deleteCard}  
                onSelect={setSelectedTask}
                emptyMessage="Clique em “Adicionar lista” para criar a sua primeira meta."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MainContainer>

      <Footer /> {/* Rodapé da página */}
    </>
  );
};

export default Home;
