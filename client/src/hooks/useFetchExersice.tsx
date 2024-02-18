import { ExerciseType, fetchExersiceType } from "@/types/ExercisType";
import axiosClient from "@/utils/AxiosClient";
import React, { useEffect } from "react";

export const useFetchExersice = (page: number, search: string) => {
  const [data, setData] = React.useState<fetchExersiceType>({
    exercises: [],
    totalExercisesCount: 0,
    currentPage: 1,
    pageSize: 1,
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  useEffect(() => {
    const fetchExersice = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/exercises/getExercises?page=${page}&search=${search}`
        );
        const data = await response.data;
        setData(data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchExersice();
  }, [page, search]);
  return { data, loading, error };
};
