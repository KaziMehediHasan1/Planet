import React from "react";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allArticles = [],
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Allarticles"],
    queryFn: async () => {
      const data = await axiosPublic.get(
        `${import.meta.env.VITE_SERVER_URL}/allArticles`
      );
      return data.data;
    },
  });

  return [allArticles, refetch, isLoading, error];
};

export default useAllArticles;
