import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { notification } from "antd";
import useAuthStore from "../stores/authStore";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
 const {token, user} = useAuthStore()
  const location = useLocation();
const role = user?.role || null; 
  const [redirectTo, setRedirectTo] = useState<null | string>(null);

  useLayoutEffect(() => {
    if (!token || !allowedRoles.includes(role || "")) {
      notification.error({
        message: "Unauthorized",
        description: "You are unathorized to access this page",
      });
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      setRedirectTo("/login");
    } 
  }, [token, role, allowedRoles, location.pathname]);

  if (redirectTo) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default RoleProtectedRoute;
