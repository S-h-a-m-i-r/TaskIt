import { adminTasksBodyData, adminTasksHeadersData } from "../datadump/index"
import FilterIcon from '../assets/icons/FilterIcon'
import { useState } from "react"
const AdminTaskList = () => {
  return (
    <div className="bg-gray-50 p-5 rounded-sm">
      <div className="flex justify-between my-5">
          <h2 className="font-semibold text-xl">
            Customer Information
        </h2>
        <div className="bg-gray-300 cursor-pointer h-12 w-12 rounded-full flex items-center justify-center">
          < FilterIcon />
        </div>
        </div>
      <table className="w-full mt-10">
          <thead>
            <tr>
              {adminTasksHeadersData.map((header,index) => 
                <th key={index} className="py-3 text-left text-lg font-semibold">{header}</th>
              )}
              </tr>
          </thead>
          <tbody>
            {adminTasksBodyData.map((task, index) => (
              <tr key={index}
              
              className="hover:bg-gray-200 cursor-pointer"
              >
                <td className=" text-left py-5 text-[#4880FF] font-normal text-sm border-b border-custom-border">{task.name}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border text-green-600">{task.date_joined}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.task_made}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.total_credits}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.remaining_credits}</td>
                <td className="text-left py-5 font-normal text-sm border-b border-custom-border">{task.amount}</td>

                <td className="text-left py-5 font-normal text-sm border-b  border-custom-border">
                  <div className="relative inline-block w-full">
                    <CustomDropdown />
                    <div className="absolute inset-y-0 right-6 flex items-center pr-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#4880FF]"
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default AdminTaskList



const CustomDropdown = () => {
  const [selected, setSelected] = useState("Select");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "Report", label: "Report", color: "text-red-600" },
    { value: "View", label: "View", color: "text-green-600" },
    { value: "Download", label: "Download", color: "text-[#4880FF]" },

  ];

  return (
    <div className="relative inline-block w-full">
      <div
        className="bg-transparent w-full text-[#4880FF] font-medium text-base border border-none rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 py-3 bg-white border border-gray-300 rounded-md shadow-lg w-[161px]">
          {options.map((option, index) => (
            <div>
            <div
              key={index}
              className={`py-2 cursor-pointer hover:bg-gray-200 ${option.color}`}
              onClick={() => {
                setSelected(option.label);
                setIsOpen(false);
              }}
              >
                <div className="px-4 flex gap-3 items-center justify-between relative">
                  {option.label}
                  <div className="flex items-center pr-2 pointer-events-none">
                  <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-4 w-4 text-gray-100"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fillRule="evenodd"
    d="M7.293 14.707a1 1 0 010-1.414L11.586 10 7.293 5.707a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
    clipRule="evenodd"
  />
</svg>

                    </div>
            </div>
              </div>
              <div className="px-4">
              <div className="bg-gray-200 h-[1px] w-full"></div>
              </div>
              
              </div>
          ))}
        </div>
      )}
    </div>
  );
};
