import { FilterOptions } from "../types/FilterOptions";

export const handleFilters = (filters: FilterOptions) => {
  const filterObj: Record<string, unknown> = {};

  if (filters.genre) {
    filterObj.genre = {
      $regex: filters.genre,
      $options: "i",
    };
  }

  if (filters.publicationDate) {
    filterObj.publicationDate = {
      $regex: filters.publicationDate,
      $options: "i",
    };
  }

  return filterObj;
};
