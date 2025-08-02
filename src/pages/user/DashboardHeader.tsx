import { useState } from "react";
import notifucation from "../../assets/icons/Notification_icon.svg";
import search from "../../assets/icons/Search_icon.svg";
import { To, useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../components/generalComponents/ProfileButton";
import authStore from '../../stores/authStore';

const DashboardHeader = () => {
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const location = useLocation();
	const handleButtonClick = () => {
		setIsExpanded(true);
	};
	const { user } = authStore();

	interface InputChangeEvent {
		target: {
			value: string;
		};
	}

	const handleInputChange = (event: InputChangeEvent) => {
		setSearchQuery(event.target.value);
	};

	const handleBlur = () => {
		if (searchQuery === '') {
			setIsExpanded(false);
		}
	};
	const redirection = (path: To) => {
		navigate(path);
	};
	const showButtonRoutes = [
		'/',
		'/tasks',
		'/credits',
		'/profile',
		'/inProgress',
		'/submitted',
		'/closed',
		'/recurring',
	];
	const shouldShowButton = showButtonRoutes.includes(
		location.pathname.toLowerCase()
	);
	return (
		<div className="absolute flex top-10 right-12 min-4xl:hidden items-center gap-2">
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
				<>
					{!location.pathname.includes('/aboutUs') && (
						<button
							onClick={handleButtonClick}
							className="bg-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
						>
							<img src={search} alt="search" />
						</button>
					)}
				</>
			)}

			<button
				className="bg-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
				onClick={() => redirection('/notification')}
			>
				<img src={notifucation} />
			</button>
			{shouldShowButton && (
				<button
					className="bg-primary-50 hover:bg-primary-200 text-white border border-gray-300 rounded-full p-3 transition-all duration-200"
					onClick={() => redirection('/createTask')}
				>
					Create new task
				</button>
			)}

			{user ? (
				<ProfileDropdown userName={user.userName} />
			) : (
				<button
					className="bg-primary-50 hover:bg-primary-200 w-[150px] text-white border border-gray-300 rounded-full p-3 transition-all duration-200"
					onClick={() => redirection('/login')}
				>
					Login
				</button>
			)}
		</div>
	);
};

export default DashboardHeader;
