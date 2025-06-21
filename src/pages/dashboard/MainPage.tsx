import { useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import { CardsData } from "../../datadump";
import AllTasksList from "./AllUsersTasksList";
import extend from "../../assets/icons/extends_icon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar_desgin.css";
import CircularChart from "./chart/Chart";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const navigate = useNavigate();
	const handleRedirect = () => {
		navigate("/Tasks");
	};

	return (
		<div className="flex flex-col gap-5 p-9 ">
			{/* dynamic name based on user */}
			<div className="flex  gap-2 max-sm:gap-5h items-center">
				<h1 className="text-2xl font-semibold"> Good Morning {`Zain`}!</h1>
			</div>
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
			<div className="flex flex-col md:flex-row gap-4 justify-between">
				{/* Tasks - Fills remaining space */}
				<div className="w-full md:flex-1 bg-white p-5 rounded-md">
					<div className="w-full flex items-center justify-between">
						<h2 className="font-semibold text-2xl text-left">Tasks</h2>
						<img src={extend} alt="extend" className="cursor-pointer" onClick={handleRedirect} />
					</div>
					<AllTasksList />
				</div>

				{/* DatePicker + Credits - Fixed width, right aligned */}
				<div className="flex flex-col items-end gap-4 md:max-w-[330px] w-full">
					<div className="w-full max-md:hidden flex justify-end">
						<DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date || new Date())} inline />
					</div>
					<div className="bg-white rounded-md w-full p-6 flex flex-col gap-5">
						<h2 className="text-2xl">Credits</h2>
						<CircularChart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
