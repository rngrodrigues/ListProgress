export const usePagination = (
  items: any[],
  ITEMS_PER_PAGE: number,
  page: number
) => {
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const currentTasks = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );
  return {
    totalPages,
    currentTasks
  };
};

