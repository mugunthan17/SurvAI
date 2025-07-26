import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const linkedInId = localStorage.getItem("survai_linkedin_id");

  if (!linkedInId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;