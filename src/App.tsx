import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SocketProvider } from './context/SocketContext';
import useAuthStore from './stores/authStore';
import { useMemo } from 'react';
import PerformanceMonitor from './components/generalComponents/PerformanceMonitor';

function App() {
  const {token} = useAuthStore(); // Assuming you have a useAuthStore hook to get the token
  
  // Memoize the router to prevent unnecessary re-renders
  const memoizedRouter = useMemo(() => router, []);
  
  return (
    // retrive token from store or context 
    <SocketProvider token={token}>
      <RouterProvider router={memoizedRouter} />
      <PerformanceMonitor />
    </SocketProvider>
  );
}

export default App
