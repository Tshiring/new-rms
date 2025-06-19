import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("googleAccessToken");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
