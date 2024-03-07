import axiosClient from "@/utils/AxiosClient";
import React, { useEffect, useState } from "react";

export const useFetchExersice = (
  page: number,
  search: string,
  pageSize?: number
) => {
  const [data, setData] = useState<fetchExersiceType>({
    exercises: [],
    totalExercisesCount: 0,
    currentPage: 1,
    pageSize: 1,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchExersice = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/exercises/getExercises?page=${page}&search=${search}&pageSize=${pageSize}`
        );
        const data = await response.data;
        setData(data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchExersice();
  }, [page, search, pageSize]);
  return { data, loading, error };
};
