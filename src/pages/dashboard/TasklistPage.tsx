import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllTasksList from './AllTasksList';

const TasklistPage = () => {
  const navigate = useNavigate();


  const location = useLocation();
  const pageTitle = location.pathname.split("/").pop();
  const handleGoBack = () => {
    navigate(-1); 
  };
  return (
    <div className='p-9 w-full flex flex-col gap-4 dark:text-black'>
      <div className='flex items-center gap-2'>
        <div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
          <img src = {backIcon} alt='back'/>
        </div> 
        <span className='font-semibold text-2xl'> {pageTitle}</span>
      </div>
      <div className='bg-white p-5 rounded-md'>
        <AllTasksList/>
      </div>
    </div>
  )
}

export default TasklistPage
