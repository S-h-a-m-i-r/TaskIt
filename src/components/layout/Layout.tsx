import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className="min-h-screen">
      <main className="flex justify-between relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 