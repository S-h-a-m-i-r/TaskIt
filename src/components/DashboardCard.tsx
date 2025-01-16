import trendingUp from '../assets/icons/trendingUp_icon.svg'
import { To, useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  percent: number;
  count: number;
  icon: string | undefined;
  path: string;

}

const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = (path: To) => {
    navigate(path);
  }

  return (
    <div 
      className='max-w-[262px] flex-1 w-64 bg-white dark:text-black rounded-md p-4 shadow-md cursor-pointer transform transition-transform hover:translate-y-[-5px]'
      onClick={() => handleClick(props.path)}
    >
      <div className='w-full flex justify-between items-start'> 
        <div className='text-left flex flex-col gap-3'>
          <p className='font-normal text-lg'> {props.title}</p>
          <p className='font-bold text-3xl'> {props.count} </p>
        </div>
        <div className='bg-gray-200 p-3 rounded-full'>
          <img src={props.icon} alt = 'icon'/>

        </div>
      </div>
      <div className='flex items- justify-start mt-7 gap-2'>
          <img src={trendingUp} alt='trending up/down icon'/>
          <span className='text-primary-300'>{`${props.percent}%`}</span>
          <span>Up</span>
        </div>
    </div>
  )
}

export default DashboardCard
