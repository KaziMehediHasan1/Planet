import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const usePayment = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: payment,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });
  return [payment, refetch, isLoading, error];
};

export default usePayment;
