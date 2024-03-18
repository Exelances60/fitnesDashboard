"use server";
import { cookies } from "next/headers";

export const fetchExersice = async (): Promise<ExerciseType[] | []> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(
      `http://localhost:8080/exercises/getExercises`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { exercises } = await response.json();
    return exercises;
  } catch (error) {
    console.error(error);
    return [];
  }
};
