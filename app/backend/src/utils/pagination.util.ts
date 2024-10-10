// utils/pagination.ts
export function parsePagination(options: {
  pageSize: number | string;
  page: number | string;
}) {
  let pageSize =
    typeof options.pageSize === "string"
      ? parseInt(options.pageSize, 10)
      : options.pageSize;
  let page =
    typeof options.page === "string"
      ? parseInt(options.page, 10)
      : options.page;

  // Ensure page and pageSize are positive numbers
  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(pageSize) || pageSize <= 0) pageSize = 10; // Default pageSize if invalid

  return { page, pageSize };
}
