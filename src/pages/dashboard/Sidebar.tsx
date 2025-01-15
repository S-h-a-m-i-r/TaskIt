import { NavLink } from 'react-router-dom';
import { DashboardSvgIcon, CreditsSvgIcon, ProfileSvgIcon } from '../../components/svg';
import taskit from '../../assets/Task_it_logo.svg'
import addon from '../../assets/addon.png'
import bigCloud from '../../assets/icons/big_cloud.svg'
import smallCloud from '../../assets/icons/small_cloud.svg'

const Sidebar = () => {
  return (
    <aside className="w-60 bg-white dark:bg-black py-4 flex flex-col ">
      <div>
      <div className='flex py-9 items-center gap-4 mx-2'>
        <img src = {taskit} alt='taskit logo'/>
        <h1 className='font-semibold text-2xl'>TaskIt</h1>
      </div>
      <nav>
        <ul>
        <li className='text-black dark:text-[#FFFFFF]'>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'flex py-4 px-4 w-full bg-primary-100 text-white' : 'flex py-4 px-4 hover:bg-gray-200 dark:hover:bg-gray-300 dark:hover:text-black text-black dark:text-white'
              }
            >
              {({ isActive }) => (
                <div className='flex items-center gap-2'>
                  <DashboardSvgIcon stroke={isActive ? 'white' : 'black'} />
                  Dashboard
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/credits"
              className={({ isActive }) =>
                isActive ? 'flex py-4 px-4 w-full bg-primary-100 text-white' : 'flex py-4 px-4 hover:bg-gray-200 dark:hover:bg-gray-300 dark:hover:text-black text-black dark:text-white'
              }
            >
              {({ isActive }) => (
                <div className='flex items-center gap-2'>
                  <CreditsSvgIcon stroke={isActive ? 'white' : 'black'} />
                  Credits
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'flex py-4 px-4 w-full bg-primary-100 text-white' : 'flex py-4 px-4 hover:bg-gray-200 dark:hover:bg-gray-300 dark:hover:text-black text-black dark:text-white'
              }
            >
              {({ isActive }) => (
                <div className='flex items-center gap-2'>
                  <ProfileSvgIcon stroke={isActive ? 'white' : 'black'} />
                  Profile
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
      <div className=' mt-20 max-w-[216px] w-full justify-self-center flex flex-col justify-end p-3 rounded-lg h-[187px] bg-[#F3F4F6] dark:bg-[#282828] dark:border dark:border-[#4B5563] relative overflow-hidden'>
        <img src={bigCloud}  className='absolute top-0 left-0'/>
        <img src={smallCloud} className='absolute top-10 right-0'/>
        <div>
          <p className='text-[48px] text-primary-100'> 10 <span className='text-lg dark:text-white'>.99</span></p>
          <p>Get 3 tasks credits for only</p>
          <button className='w-full rounded-full bg-primary-100 text-white flex justify-center gap-2 items-center py-1'>Buy Now <img src={addon} width={20}/></button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;