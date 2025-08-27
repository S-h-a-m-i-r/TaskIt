import { Navigate, Outlet } from "react-router-dom";
import { notification } from "antd";
import useAuthStore from "../stores/authStore";
import LandingPage from "../pages/LandingPage";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { token, user } = useAuthStore();
  const role = user?.role || null;

  
  if (!token) {
    return <LandingPage />;;
  }

  
  if (!allowedRoles.includes(role || "")) {
    notification.error({
      message: "Unauthorized",
      description: "You are unauthorized to access this page",
    });
    return <Navigate to="/login" replace />;
  }

  
  return <Outlet />;
};

export default RoleProtectedRoute;
