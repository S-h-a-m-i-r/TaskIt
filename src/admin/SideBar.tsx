import { NavLink } from 'react-router-dom';
import { DashboardSvgIcon } from '../components/svg';
import taskit from '../assets/Task_it_logo.svg';

const Sidebar = () => {
	return (
		<aside className="w-60 bg-white py-2 flex flex-col h-full ">
			<div className="sticky top-10">
				<div className="flex items-center gap-4 mx-2 mt-6">
					<img src={taskit} alt="taskit logo" />
				</div>
				<nav className="relative mt-12">
					<ul>
						<li className="text-black">
							<NavLink
								to="/admin"
								className={({ isActive }) =>
									isActive
										? 'flex py-4 px-4 w-full bg-primary-100 text-white'
										: 'flex py-4 px-4 hover:bg-gray-200 text-black'
								}
							>
								{({ isActive }) => (
									<div className="flex items-center gap-2">
										<DashboardSvgIcon stroke={isActive ? 'white' : 'black'} />
										Dashboard
									</div>
								)}
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
