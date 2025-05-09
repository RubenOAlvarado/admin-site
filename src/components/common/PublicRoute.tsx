import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;