import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SocketProvider } from './context/SocketContext';
import useAuthStore from './stores/authStore';

function App() {
  const {token} = useAuthStore(); // Assuming you have a useAuthStore hook to get the token
  return (
    // retrive token from store or context 
  
    <SocketProvider token={token}>
      <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default App
