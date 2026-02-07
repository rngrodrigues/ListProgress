export const usePagination = (
  items: any[],
  ITEMS_PER_PAGE: number,
  page: number
) => {
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const safePage =
    page < 0 ? 0 :
    page > totalPages - 1 ? totalPages - 1 :
    page;

  const currentTasks = items.slice(
    safePage * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return {
    totalPages,
    currentTasks,
    safePage,
  };
};
