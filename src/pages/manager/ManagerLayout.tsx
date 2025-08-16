import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/generalComponents/AdminManagerSideBar';
import { ManagerAdminRoutes } from '../../routes/routes';
import { BasicAdminRoutes } from '../../routes/routes';
import useAuthStore from '../../stores/authStore';
// import DashboardHeader from './DashboardHeader';

const getSidebarRoutes = (role?: string) => {
  if (role === 'BASIC') {
    return BasicAdminRoutes;
  }
  if (role === 'MANAGER') {
    return ManagerAdminRoutes;
  }
  return [];
};
const ManagerLayout = () => {
  const { user } = useAuthStore();
  return (
    <div className="flex min-h-screen w-full relative">
      <AdminSidebar items={getSidebarRoutes(user?.role)} />
      <main className="flex-1 p-4">        
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;