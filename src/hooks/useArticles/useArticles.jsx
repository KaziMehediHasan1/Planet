import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";

const useArticles = (search) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: articles = [],
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles", search],
    queryFn: async () => {
      const data = await axiosPublic.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/articles?search=${search}`
      );
      return data.data;
    },
  });

  return [articles, refetch, isLoading, error];
};

export default useArticles;
