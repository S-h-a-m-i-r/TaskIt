import Sidebar from '../SideBar';
import AdminDashboard from '..';
const Layout = () => {
  return (
<div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 px-4">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default Layout;