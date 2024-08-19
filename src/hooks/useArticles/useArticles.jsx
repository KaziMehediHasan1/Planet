import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";

const useArticles = ({ search, filter }) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: articles = [],
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles", search, filter],
    queryFn: async () => {
      const data = await axiosPublic.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/articles?search=${search}&filter=${filter}`
      );
      return data.data;
    },
  });

  return [articles, refetch, isLoading, error];
};

export default useArticles;
