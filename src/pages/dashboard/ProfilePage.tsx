import { useNavigate, useLocation } from "react-router-dom";
import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import background from '../../assets/background.png';
import profile from '../../assets/profile.png';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const pageTitle = location.pathname.split("/").pop() || 'Tasks';
  const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  const handleGoBack = () => {
    navigate(-1); 
  };

  const togglePassword = () => {
    setShowPassword((prev) => ({ ...prev, password: !prev.password }));
  };
  const toggleConfirmPassword = () => {
    setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }));
  };

  return (
    <div className='p-9 w-full flex flex-col gap-10'>
      <div className='flex items-center gap-2'>
        <div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
          <img src = {backIcon} alt='back'/>
        </div> 
        <span className='font-semibold text-2xl'> {capitalizedPageTitle}</span>
      </div>
      <div className="w-full relative">
        <img src={background} className="w-full h-auto" alt="background" />
        <div className="p-1 bg-white rounded-full absolute top-[100%] left-[10%] transform -translate-x-1/2 -translate-y-1/2">
          <img src={profile} className="w-40 max-lg:w-24 max-xl:w-28 rounded-full object-cover" alt="profile" />
        </div>
      </div>
      {/* Container */}
      <div className="max-w-96 w-full mx-auto mt-10"> 
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-0-0">
          <input
            type="text"
            id="name"
            className="bg-transparent flex-grow focus:outline-none focus:ring-0 focus:border-none"
            defaultValue="Zain"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-0">
          <input
            type="email"
            id="email"
            className=" bg-transparent flex-grow outline-none"
            defaultValue="Zainworkspace@xyz.com"
          />

        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-0">
        <input
            type={showPassword.password ? 'text' : 'password'}
            id="confirmPassword"
            className=" bg-transparent flex-grow outline-none"
          />
          <div onClick={togglePassword}> {showPassword.password ? <IoEyeOffOutline/> : <IoEyeOutline/>}</div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
          Confirm password
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-0">
        <input
            type={showPassword.confirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className=" bg-transparent flex-grow outline-none"
          />
          <div onClick={toggleConfirmPassword}> {showPassword.confirmPassword ? <IoEyeOffOutline/> : <IoEyeOutline/>}</div>
        </div>
      </div>

      <button className="w-full bg-primary-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Update
      </button>
    </div>
    </div>
  )
}

export default ProfilePage
