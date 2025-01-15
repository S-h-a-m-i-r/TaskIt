import { useNavigate, useLocation } from "react-router-dom";
import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import background from '../../assets/background.png';
import profile from '../../assets/profile.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = location.pathname.split("/").pop() || 'Tasks';
  const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  const handleGoBack = () => {
    navigate(-1); 
  };
  return (
    <div className='p-9 w-full flex flex-col gap-10 dark:text-black'>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
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
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-0">
          <input type="password" id="password" className=" bg-transparent flex-grow outline-none" defaultValue="**********" />
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
          Confirm password
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-0">
          <input
            type="password"
            id="confirmPassword"
            className=" bg-transparent flex-grow outline-none"
            defaultValue="**********"
          />
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
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
