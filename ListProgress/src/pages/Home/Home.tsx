import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import TaskCard from "../../components/TaskCard";
import Footer from "../../components/Footer";
import { ModalAddList } from "../../components/Modals";
import { AddBtn } from "../../components/Utils/Buttons";
import { SearchInput } from "../../components/Utils/Inputs";
import { GridContainer, PaginationContainer, TopContainer } from "./Home.styles.ts";
import { AnimatePresence } from "framer-motion";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState<number>(0);
  const totalPages = Math.max(1, Math.ceil(tasks.length / ITEMS_PER_PAGE));

  const currentTasks = tasks.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  function changePage(step: number) {
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
        <TopContainer>
          <AddBtn onClick={() => setOpen(true)} />
          <SearchInput />
        </TopContainer>

        <GridContainer>
          {currentTasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </GridContainer>

        <PaginationContainer>
          <button onClick={() => changePage(-1)}>◀</button>
          <span>{page + 1} / {totalPages}</span>
          <button onClick={() => changePage(1)}>▶</button>
        </PaginationContainer>
      </MainContainer>

      <Footer />
    </>
  );
};

export default Home;
