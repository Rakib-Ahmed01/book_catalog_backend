export const pickOptions = <
  T extends Record<string, unknown>,
  K extends string[],
>(
  queryObject: T,
  keys: K,
) => {
  const options: Record<string, unknown> = {};

  for (const key of keys) {
    if (queryObject[key]) {
      options[key] = queryObject[key];
    }
  }
  return options;
};
