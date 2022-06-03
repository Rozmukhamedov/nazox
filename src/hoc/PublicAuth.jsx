import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicAuth = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const fromPage = location.state?.from?.pathname || "/";

  if (isLoggedIn) {
    return <Navigate to={fromPage} state={{ from: location }} />;
  }

  return children;
};

export default PublicAuth;
