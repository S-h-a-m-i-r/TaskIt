import { useState } from "react";
import notifucation from "../../assets/icons/Notification_icon.svg";
import search from "../../assets/icons/Search_icon.svg";
import { To, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleButtonClick = () => {
		setIsExpanded(true);
	};

	interface InputChangeEvent {
		target: {
			value: string;
		};
	}

	const handleInputChange = (event: InputChangeEvent) => {
		setSearchQuery(event.target.value);
	};

	const handleBlur = () => {
		if (searchQuery === "") {
			setIsExpanded(false);
		}
	};
	const redirection = (path: To) => {
		navigate(path);
	};

	return (
		<div className="absolute hidden top-10 right-12 md:flex items-center gap-2">
			{isExpanded ? (
				<div className="border bg-white flex gap-2 items-center  border-gray-300 rounded-md px-3 py-3 w-64 transition-all duration-1000">
					<input
						type="text"
						value={searchQuery}
						onChange={handleInputChange}
						onBlur={handleBlur}
						className="border-none w-full outline-none"
						placeholder="Search..."
						autoFocus
					/>
					<img src={search} alt="search" />
				</div>
			) : (
				<button
					onClick={handleButtonClick}
					className="bg-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
				>
					<img src={search} alt="search" />
				</button>
			)}

			<button
				className="bg-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
				onClick={() => redirection("/notification")}
			>
				<img src={notifucation} />
			</button>
			<button
				className="bg-primary-50 text-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
				onClick={() => redirection("/createTask")}
			>
				Create new task
			</button>
			<button
				className="bg-primary-50 w-[150px] text-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
				onClick={() => redirection("/login")}
			>
				Login
			</button>
		</div>
	);
};

export default DashboardHeader;
