import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";

const usePublisher = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: publisher,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const data = await axiosPublic.get(
        `${import.meta.env.VITE_SERVER_URL}/publisher`
      );
      return data.data;
    },
  });

  return [publisher, refetch, isLoading, error];
};

export default usePublisher;
