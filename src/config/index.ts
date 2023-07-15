import dotenv from "dotenv";

dotenv.config();

const withProcessEnv = (variableName: string) =>
  process.env[variableName] as string;

const env = {
  port: withProcessEnv("PORT"),
  mongoUri: withProcessEnv("MONGO_URI"),
};

export default env;
