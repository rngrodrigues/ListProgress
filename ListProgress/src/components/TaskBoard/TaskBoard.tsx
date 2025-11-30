import { AnimatePresence, motion } from "framer-motion";
import { GridContainer, MainParagrafo, PaginationContainer } from "./TaskBoard.styles";
import { TaskCard } from "../TaskCard";
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

export const TaskBoard = ({
  cards,
  onEdit,
  onDelete,
  onSelect,
  emptyMessage,
  showSearch = true
}: {
  cards: any[];
  onEdit: (card: any) => void;
  onDelete: (id: number | string) => void;
  onSelect: (card: any) => void;
  emptyMessage: string;
  showSearch?: boolean;
}) => {
  
  const {
    page, direction,
    totalPages, currentTasks, changePage
  } = usePagination(cards, 6);

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
          <GridContainer>
            {cards.length === 0 && (
              <MainParagrafo>{emptyMessage}</MainParagrafo>
            )}

            {currentTasks.map(card => (
              <TaskCard
                key={card.id}
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
        <button onClick={() => changePage(-1)}>◀</button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => changePage(1)}>▶</button>
      </PaginationContainer>
    </>
  );
};
