import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import { useNavigate } from "react-router-dom";
import bell from '../../assets/icons/Bell_icon.svg'
import ListItem from '../../components/generalComponents/ListItem';


const NotificationPage = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  };
  return (
    <div className='p-9 w-full flex flex-col gap-10'>
      <div className='flex items-center gap-3'>
        <div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
          <img src = {backIcon} alt='back'/>
        </div> 
        <span className='font-semibold text-2xl'> Notifications </span>
      </div>
      <div className="bg-gray-100 w-full border border-1"></div>
      <div className="flex flex-col gap-6 ">
      {Array.from({ length: 6 }, (_, index) => (
        <ListItem
          key={index} // Important: Add a unique key!
          icon={bell}
          content="Reminder: Check your task management dashboard for updates!"
          item="12:13"
        />
      ))}
      </div>
    </div>
  )
}

export default NotificationPage
