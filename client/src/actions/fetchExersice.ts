"use server";
import { cookies } from "next/headers";

interface IPromiseExersice {
  exercises: ExerciseType[];
  errorMessage?: string;
}

export const fetchExersice = async (): Promise<IPromiseExersice> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      exercises: [],
      errorMessage: "No token found",
    };
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
    return {
      exercises: [],
      errorMessage: error.message,
    };
  }
};
