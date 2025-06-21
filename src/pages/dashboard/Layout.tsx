import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full relative">
      <Sidebar />
      <div className='absolute top-0 left-0 right-0 z-10'>
      <DashboardHeader /> 
      </div>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;