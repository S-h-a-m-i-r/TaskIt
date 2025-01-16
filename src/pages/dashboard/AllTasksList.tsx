import { useNavigate } from "react-router-dom"
import { tasksBodyData, TasksHeadersData } from "../../components/dummnyData/DummyData"

const AllTasksList = () => {

  const navigate = useNavigate()
  const redirection = (id: unknown) => {
    navigate(`/task/${id}`)
  }
  return (
    <div className="bg-white dark:text-black">
        <table className="w-full">
          <thead>
            <tr>
              {TasksHeadersData.map((header,index) => 
                <th key={index} className="py-3 text-left text-[14px] font-normal">{header}</th>
              )}
              </tr>
          </thead>
          <tbody>
            {tasksBodyData.map((task, index) => (
              <tr key={index}
              className="hover:bg-gray-200 cursor-pointer"
              onClick={() => redirection(task.task_id)}
              >
                <td className=" text-left py-5 text-primary-400 font-normal text-sm border-b border-custom-border">{task.name}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.task_id}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.Date}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.status}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.action}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.Recurring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default AllTasksList
