import { useNavigate, To } from "react-router-dom"
import AdminTaskList from "./AdminTaskList"
import notification from '../assets/icons/Notification_icon.svg';


const AdminDashboard = () => {
  const navigate = useNavigate()

  const redirection = (path: To) => {
    navigate(path)
  }
  return (
    <div className='py-18 px-7 w-full'>
      <div className='flex justify-between gap-2'> 
        <span className='font-semibold text-2xl'> Dashboard Admin </span>
        <button
          className="bg-[#F9FAFB] border border-[#F9FAFB] rounded-full p-3 transition-all duration-1000"
        onClick={()=>redirection('/notification')}
        >
          <img src={notification} />
        </button>
      </div>
      <div className='w-full rounded-xl mt-8'>
        <AdminTaskList/>
      </div>
    </div>
  )
}

export default AdminDashboard
