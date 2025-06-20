import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("googleAccessToken");

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
