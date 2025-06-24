import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/generalComponents/AdminManagerSideBar';
import { ManagerAdminRoutes } from '../../routes/routes';
// import DashboardHeader from './DashboardHeader';

const ManagerLayout = () => {
  return (
    <div className="flex min-h-screen w-full relative">
      <AdminSidebar items={ManagerAdminRoutes} />
      <main className="flex-1 p-4">        
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;