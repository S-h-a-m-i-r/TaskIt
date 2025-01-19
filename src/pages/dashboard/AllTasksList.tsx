import { useNavigate } from "react-router-dom"
import { tasksBodyData, TasksHeadersData } from "../../components/dummnyData/DummyData"

const AllTasksList = () => {
  const navigate = useNavigate()
  const redirection = (id: unknown) => {
    navigate(`/task/${id}`)
  }
  return (
    <div className="bg-white">
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
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">
                  <div className="relative inline-block w-full">
                    <select
                    id={index.toString()}
                      className="appearance-none w-full bg-transparent text-gray-600 font-medium text-base border-none focus:outline-none cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <div className="absolute inset-y-0 right-10 flex items-center pr-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.Recurring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default AllTasksList
