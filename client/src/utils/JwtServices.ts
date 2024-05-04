import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined");
  }
  return new TextEncoder().encode(secretKey);
};

export const verifyToken = async (token?: string) => {
  try {
    if (!token) {
      return null;
    }
    const data = await jwtVerify(token, getJwtSecretKey());
    return data;
  } catch (error) {
    return null;
  }
};
