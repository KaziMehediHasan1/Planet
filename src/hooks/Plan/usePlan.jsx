import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";

const usePlan = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: plan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const data = await axiosPublic.get(
        `${import.meta.env.VITE_SERVER_URL}/plan`
      );
      return data.data;
    },
  });

  return [plan, refetch, isLoading, error];
};

export default usePlan;
