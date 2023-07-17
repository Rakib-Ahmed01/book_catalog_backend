export const validateEmail = (value: string) => {
  const emailRegex = /^\S+@\S+$/;
  return emailRegex.test(value);
};
