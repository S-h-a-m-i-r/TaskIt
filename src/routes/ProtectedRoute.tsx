import { Navigate, Outlet, useLocation } from "react-router-dom";
import { notification } from "antd";
import useAuthStore from "../stores/authStore";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { token, user } = useAuthStore();
  const location = useLocation();
  const role = user?.role || null;

  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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
