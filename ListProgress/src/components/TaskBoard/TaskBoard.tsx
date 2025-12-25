import { AnimatePresence, motion } from "framer-motion";
import {
  GridContainer,
  MainParagrafo,
  PaginationContainer
} from "./TaskBoard.styles";
import { TaskCard } from "../TaskCard";
import { usePagination } from "../../hooks/usePagination";
import type { Card } from "../../types/Card";

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

type TaskBoardProps = {
  cards: Card[];
  onEdit?: (id: string, updatedCard: Partial<Card>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSelect: (card: Card) => void;
  emptyMessage: string;
  page: number;
  direction: number;
  onChangePage: (direction: number) => void;
};

export const TaskBoard = ({
  cards,
  onEdit,
  onDelete,
  onSelect,
  emptyMessage,
  page,
  direction,
  onChangePage,
}: TaskBoardProps) => {

  const {
    totalPages,
    currentTasks,
  } = usePagination(cards, 6, page);

  return (
    <>
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
          <GridContainer $isSingle={currentTasks.length === 1}>
            {cards.length === 0 && (
              <MainParagrafo>{emptyMessage}</MainParagrafo>
            )}

            {currentTasks.map(card => (
              <TaskCard
                key={card.id}
                className="task-card"
                {...card}
                onClick={() => onSelect(card)}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </GridContainer>
        </motion.div>
      </AnimatePresence>

      <PaginationContainer>
        <button
          disabled={page === 0}
          onClick={() => onChangePage(-1)}
        >
          ◀
        </button>

        <span>{page + 1} / {totalPages}</span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => onChangePage(1)}
        >
          ▶
        </button>
      </PaginationContainer>
    </>
  );
};
