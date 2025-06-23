import { creditsPagetaskDetails, creditsPagetaskHeaders } from "../../datadump";
import TaskTable from "../../pages/admin/TaskTable";
import CreditTaskHeader from "./creditTaskHeader";

const index = () => {
    
	return (
		<>
			<h2 className="mt-10 text-[32px] text-left font-bold text-gray-900 mb-2">Credits Dashboard</h2>
			<p className="text-[#5C788A] text-left text-[14px] font-normal mb-4">Manage and view customer credits</p>
			<div className="mb-8">
				<h1 className="text-2xl text-left font-semibold text-gray-900">Current Credit Overview</h1>
			</div>
			<CreditTaskHeader />
			<h2 className="mt-4 mb-2 text-2xl text-left font-semibold text-gray-900">Customer Credit Table</h2>
			<TaskTable tasks={creditsPagetaskDetails} tasksHeader={creditsPagetaskHeaders} />
		</>
	);
};

export default index;
