export const generateSearchCondition = (
  operator: string,
  search: string,
  fields: string[],
) => {
  if (search) {
    const condition = {
      [`$${operator}`]: fields.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    };
    return condition;
  }
  return {};
};
