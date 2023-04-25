import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default PublicRoute;
