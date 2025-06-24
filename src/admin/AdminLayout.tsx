import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/generalComponents/AdminManagerSideBar';
import { SuperAdminRoutes } from '../routes/routes';
// import DashboardHeader from './DashboardHeader';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full relative">
      <AdminSidebar items={SuperAdminRoutes} />
      <main className="flex-1 p-4">        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;