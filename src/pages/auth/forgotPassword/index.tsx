import { useLocation } from 'react-router-dom';
import authDesign from '../../../assets/auth_image.svg'; 
import AuthFormSidebar from '../AuthFormSidebar';
import PasswordForgot from './PasswordForgot';
import Newpassword from './Newpassword';

const ForgotPassword = () => {
  const location = useLocation();
  return (
    <div className='w-full p-8 flex items-center max-2xl:flex-col justify-between max-2xl:items-center font-sans'>
      <div className="text-left flex-1 items-center justify-center text-black md:px-10 py-5 flex flex-col gap-5 md:gap-10 rounded-lg w-full h-screen">
        <div className='max-w-[400px] w-full'>
          {location.pathname === '/forgot-password' && <PasswordForgot />}
          {location.pathname === '/forgot-password/new-password' &&  <Newpassword /> }
        </div>
      </div>
      <div>
      <AuthFormSidebar image={authDesign} width='50' />
    </div>
    </div>
  );
};

export default ForgotPassword;