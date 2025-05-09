import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;