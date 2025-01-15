import React from 'react';
import {useLocation } from 'react-router-dom';
import authDesign from '../../assets/auth_image.svg'
import Login from './Login';
import AuthFooter from '../AuthFooter';
import Signup from './Signup';
import AuthFormSidebar from './AuthFormSidebar';

const AuthDesign: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const initialTab = path.includes('signup') ? 'Signup' : 'Login';
  return (
  <div className='w-full flex max-2xl:flex-col justify-between items-center font-sans p-8'>
    <div className="text-left text-black md:px-10 py-5 flex flex-col items-center gap-10 md:gap-10 rounded-lg w-full ">
      {initialTab == 'Signup' ? <Signup/> : <Login />}
      <AuthFooter tab = {initialTab} />
    </div>
    <div className='max-h-[924px]'>
    <AuthFormSidebar image={authDesign} width = '50' />
    </div>
  </div>
  );
};

export default AuthDesign;
