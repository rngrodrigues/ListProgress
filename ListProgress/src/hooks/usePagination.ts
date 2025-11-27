import { useState } from "react";

export const usePagination = (items: any[], ITEMS_PER_PAGE = 6) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const currentTasks = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  function changePage(step: number) {
    setDirection(step);
    setPage(prev =>
      Math.min(totalPages - 1, Math.max(0, prev + step))
    );
  }

  return {
    page,
    direction,
    totalPages,
    currentTasks,
    changePage,
  };
};
