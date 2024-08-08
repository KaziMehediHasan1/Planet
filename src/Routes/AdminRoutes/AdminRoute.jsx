import { useContext } from "react";
import useAdmin from "../../hooks/useAdmin";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading || isAdminLoading) {
    <div>
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login" replace></Navigate>;
};

export default AdminRoute;
