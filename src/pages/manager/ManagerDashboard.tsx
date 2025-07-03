import ButtonComponent from "../../components/generalComponents/ButtonComponent";
import {
	adminTaskList,
	customerHeader,
	dashboardCards,
	tasksHeader,
	teamHeader,
	teamTasksdetails,
} from "../../datadump";
import TaskTable from "../admin/TaskTable";
import { adminTaskList as customerManagement } from "../../datadump";
import ProfileDropdown from "../../components/generalComponents/ProfileButton";

const ManagerDashboard = () => {
	const name = localStorage.getItem("role") ?? "man";
	return (
		<div className="w-full p-10">
			<div className="flex w-full justify-between">
				<h1 className="font-bold text-[32px] text-primary-100 text-left"> Dashboard </h1>
				<ProfileDropdown userName={name} />
			</div>
			<div>
				<h2 className="font-bold text-[22px] text-primary-100 text-left mt-8"> Overview</h2>
				<div className="mt-6 grid grid-cols-1 max-sm:justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{dashboardCards.map((card, index) => (
						<div
							key={index}
							className="bg-transparent border border-slate-300 rounded-xl p-6 min-h-[136px] hover:shadow-sm transition-shadow"
						>
							<div className="space-y-2 flex flex-col justify-center h-full">
								<h3 className="text-[16px] text-left font-medium text-gray-600 leading-tight">{card.title}</h3>
								<p className="text-[24px] text-left font-bold text-gray-900">{card.value}</p>
							</div>
						</div>
					))}
				</div>
				<div>
					<div className="flex items-center justify-between mt-10 mb-5 pl-3">
						<h2 className="text-[22px] text-primary-100 font-bold ">Task Management</h2>
						<ButtonComponent
							title={"View"}
							className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
						/>
					</div>
					<TaskTable tasks={adminTaskList} tasksHeader={tasksHeader} />
					<div>
						<div>
							<div className="flex items-center justify-between my-5">
								<h2 className="text-[22px] font-bold text-primary-100 text-left">Customer Management</h2>
								<ButtonComponent
									title={"View"}
									className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
								/>
							</div>
							<TaskTable tasks={customerManagement} tasksHeader={customerHeader} />
						</div>
						<div>
							<div className="flex items-center justify-between my-5">
								<h2 className="text-[22px] font-bold text-primary-100 text-left">Team Management</h2>
								<ButtonComponent
									title={"View"}
									className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
								/>
							</div>
							<TaskTable tasks={teamTasksdetails} tasksHeader={teamHeader} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManagerDashboard;
