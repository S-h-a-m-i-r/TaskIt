import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SocketProvider } from './context/SocketContext';
import useAuthStore from './stores/authStore';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GlobalNotificationListener } from "./components/generalComponents";

function App() {
  const { token } = useAuthStore();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <SocketProvider token={token}>
        <GlobalNotificationListener />
        <RouterProvider router={router} />
      </SocketProvider>
    </GoogleOAuthProvider>
  );
}

export default App
