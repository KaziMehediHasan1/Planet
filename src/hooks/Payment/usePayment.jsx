import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";

const usePayment = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: payment,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/payment");
      return res.data;
    },
  });
  return [payment, refetch, isLoading, error];
};

export default usePayment;
