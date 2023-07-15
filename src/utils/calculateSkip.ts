import { PaginationOptions } from "../types/PaginationOptions";

export const calculateSkip = (
  paginationOptions: Pick<PaginationOptions, "limit" | "page">,
) => {
  const { page, limit } = paginationOptions;
  const numberedPage = Number(page) || 1;
  const numberedPageLimit = Number(limit) || 10;
  const skip = (numberedPage - 1) * numberedPageLimit;
  return { page: numberedPage, skip, limit: numberedPageLimit };
};
