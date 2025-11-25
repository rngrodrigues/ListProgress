import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import { TaskCard } from "../../components/TaskCard";
import Footer from "../../components/Footer";
import { ModalAddList } from "../../components/Modals";
import { AddBtn } from "../../components/Utils/Buttons";
import { SearchInput } from "../../components/Utils/Inputs";
import { GridContainer, PaginationContainer, TopContainer } from "./Home.styles.ts";
import { AnimatePresence, motion } from "framer-motion";
import { TaskList } from "../../components/TaskList/TaskList.tsx";

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
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState<number>(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.max(1, Math.ceil(tasks.length / ITEMS_PER_PAGE));

  const currentTasks = tasks.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  function changePage(step: number) {
    setDirection(step);
    setPage(prev =>
      Math.min(totalPages - 1, Math.max(0, prev + step))
    );
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <ModalAddList
            isOpen={open}
            onClose={() => setOpen(false)}
            onAddTask={(newTask: any) => {
              setTasks(prev => [...prev, newTask]);
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

        {selectedTask ? (
          <TaskList
            title={selectedTask.title}
            category={selectedTask.category}
            description={selectedTask.Description}
            progress={selectedTask.progress}
            onBack={() => setSelectedTask(null)}
          />
        ) : (
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
                {currentTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onClick={() => setSelectedTask(task)}
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
