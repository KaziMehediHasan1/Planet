import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const useAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const data = await axiosSecure.get(
        `${import.meta.env.VITE_SERVER_URL}/users`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data.data;
    },
  });

  return [users, refetch, isLoading, error];
};

export default useAllUsers;
