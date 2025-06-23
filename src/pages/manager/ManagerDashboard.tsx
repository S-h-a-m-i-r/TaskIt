import ButtonComponent from "../../components/ButtonComponent";
import DashboardCard from "../../components/DashboardCard";
import { adminTaskList, CardsData, customerHeader, tasksHeader, teamHeader, teamTasksdetails } from "../../datadump";
import TaskTable from "../admin/TaskTable";
import { adminTaskList as customerManagement } from "../../datadump";

const ManagerDashboard = () => {
	return (
		<>
		      <div className='mt-5'>
          <h1 className='font-bold text-[32px] text-primary-100 text-left'> Dashboard </h1>
      </div>
			<div>
				<div className="mt-14 grid grid-cols-1 max-sm:justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{CardsData.map((element, index) => (
						<DashboardCard
							key={index}
							title={element.title}
							percent={element.percent}
							count={element.count}
							icon={element.icon}
							path={element.path}
							color={element.color}
						/>
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
							<h2 className="text-[22px] font-bold text-primary-100 text-left">
								Customer Management
							</h2>
							<ButtonComponent
								title={"View"}
								className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
							/>
							</div>
						<TaskTable tasks={customerManagement} tasksHeader={customerHeader} />
						</div>
						<div>
							<div className="flex items-center justify-between my-5">
							<h2 className="text-[22px] font-bold text-primary-100 text-left">
								Team Management
							</h2>
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
		</>
	);
};

export default ManagerDashboard;
