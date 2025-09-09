import notifucation from "../../assets/icons/Notification_icon.svg";
import { To, useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../components/generalComponents/ProfileButton";
import authStore from '../../stores/authStore';

const DashboardHeader = () => {
	const navigate = useNavigate();

	const location = useLocation();
	
	const { user } = authStore();


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
