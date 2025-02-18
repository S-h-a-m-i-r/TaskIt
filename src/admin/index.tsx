import AdminTaskList from "./AdminTaskList"

const AdminDashboard = () => {
  return (
    <div className='py-18 px-7 w-full'>
      <div className='flex items-center gap-2'> 
        <span className='font-semibold text-2xl'> Dashboard Admin </span>
      </div>
      <div className='w-full rounded-xl mt-8'>
        <AdminTaskList/>
      </div>
    </div>
  )
}

export default AdminDashboard
