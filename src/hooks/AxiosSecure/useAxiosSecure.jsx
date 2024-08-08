import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status..
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = await error.response.status;
      if (status === 401 || status === 403) {
        await Logout()
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
