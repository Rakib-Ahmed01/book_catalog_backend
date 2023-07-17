export type LoginResponse = {
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
};
