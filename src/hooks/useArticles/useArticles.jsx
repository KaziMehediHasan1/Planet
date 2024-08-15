import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";

const useArticles = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: articles,
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const data = await axiosPublic.get(
        `${import.meta.env.VITE_SERVER_URL}/articles`
      );
      return data.data;
    },
  });
  

  return [articles, refetch, isLoading, error];
};

export default useArticles;
