import jwt from "jsonwebtoken";
import env from "../config";

export const generateJwtTokens = (payload: Record<string, unknown>) => {
  const accessToken = jwt.sign(payload, env.accessTokenSecret, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(payload, env.refreshTokenSecret, {
    expiresIn: "365d",
  });

  return { accessToken, refreshToken };
};
