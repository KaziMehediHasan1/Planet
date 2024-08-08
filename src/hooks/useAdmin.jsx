import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import useAxiosSecure from "./AxiosSecure/useAxiosSecure";

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data:isAdmin, isPending:isAdminLoading} = useQuery({
        queryKey:[!!user?.email, 'isAdmin'],
        enabled:!!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            
            return res.data?.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;
