"use server";
import { cookies } from "next/headers";

export const fetchExersice = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/exercises/getExercises`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errorMessage);
    }
    const { exercises } = await response.json();
    return exercises;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
