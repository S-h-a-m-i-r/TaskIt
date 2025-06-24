import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { notification } from "antd";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

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
