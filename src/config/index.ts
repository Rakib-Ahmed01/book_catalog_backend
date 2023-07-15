import dotenv from "dotenv";

dotenv.config();

const withProcessEnv = (variableName: string) =>
  process.env[variableName] as string;

const env = {
  port: withProcessEnv("PORT"),
  mongoUri: withProcessEnv("MONGO_URI"),
  accessTokenSecret: withProcessEnv("ACCESS_TOKEN_SECRET"),
  refreshTokenSecret: withProcessEnv("REFRESH_TOKEN_SECRET"),
};

export default env;
