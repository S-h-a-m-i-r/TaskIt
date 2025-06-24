import { useState } from "react";
import ButtonComponent from "../../generalComponents/ButtonComponent";
import search from "../../assets/icons/Search_icon.svg";
import TaskTable from "../../../pages/admin/TaskTable";
import { tasksPagedetails } from "../../../datadump";
import { Link } from "react-router-dom";

interface InputChangeEvent {
	target: {
		value: string;
	};
}

const taskListheaders = [
    "Id",
    "Type",
    "Status",
    "Date",
]
const AdminTasks = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const handleInputChange = (event: InputChangeEvent) => {
		setSearchQuery(event.target.value);
	};

	return (
		<>
			<div className="mt-10 w-full flex justify-between items-center mb-4">
				<h1 className="text-[32px] font-bold text-primary-100"> Tasks </h1>
				<Link to="/createTask">
                <ButtonComponent
					title="New Task"
					className="bg-primary-50 text-white text-[14px] px-4 py-2 rounded-md hover:bg-primary-200 w-[100px]"
				/>
                </Link>
			</div>
			<div className="border bg-white flex gap-2 items-center  border-gray-300 rounded-md px-3 py-3 w-full transition-all duration-1000">
				<img src={search} alt="search" />
				<input
					type="text"
					value={searchQuery}
					onChange={handleInputChange}
					className="border-none w-full outline-none"
					placeholder="Search..."
					autoFocus
				/>
			</div>
            <FilterSortInterface />
            <div>
                <TaskTable tasks = {tasksPagedetails} tasksHeader={taskListheaders}/>
            </div>
		</>
	);
};

export default AdminTasks;

function FilterSortInterface() {
	const [activeTab, setActiveTab] = useState("All");
	const [activeSort, setActiveSort] = useState<string | null>(null);

	const tabs = ["All", "Active", "Completed"];
	const sortOptions = ["Date", "Status", "Credits Used"];

	return (
		<div className="w-full mx-auto p-6">
			<div className="mb-8">
				<div className="flex space-x-8 border-b border-gray-300">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
								activeTab === tab ? "text-gray-900 border-b-2 border-blue-500 font-bold" : "text-gray-500 hover:text-gray-700"
							}`}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">Sort</h2>
				<div className="flex flex-wrap gap-3">
					{sortOptions.map((option) => (
						<button
							key={option}
							onClick={() => setActiveSort(activeSort === option ? null : option)}
							className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
								activeSort === option
									? "bg-blue-100 text-blue-700 border border-blue-200"
									: "bg-white text-gray-700 hover:bg-gray-200"
							}`}
						>
							{option}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
