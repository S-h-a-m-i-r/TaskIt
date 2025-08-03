import { creditsPagetaskDetails, creditsPagetaskHeaders } from "../../../datadump";
import TaskTable from "../../../pages/admin/TaskTable";
import ProfileDropdown from "../../generalComponents/ProfileButton";
import CreditTaskHeader from "./creditTaskHeader";
import useAuthStore from '../../../stores/authStore';

const ManagerCredits = () => {
	const { user } = useAuthStore();
	return (
		<>
			<div className="flex justify-between items-start mt-10">
				<h2 className=" text-[32px] text-left font-bold text-gray-900 mb-2">
					Credits Dashboard
				</h2>
				<ProfileDropdown userName={user?.userName || ''} />
			</div>
			<p className="text-[#5C788A] text-left text-[14px] font-normal mb-4">
				Manage and view customer credits
			</p>
			<div className="mb-8">
				<h1 className="text-2xl text-left font-semibold text-gray-900">
					Current Credit Overview
				</h1>
			</div>
			<CreditTaskHeader />
			<h2 className="mt-4 mb-2 text-2xl text-left font-semibold text-gray-900">
				Customer Credit Table
			</h2>
			<TaskTable
				tasks={creditsPagetaskDetails}
				tasksHeader={creditsPagetaskHeaders}
			/>
		</>
	);
};

export default ManagerCredits;
