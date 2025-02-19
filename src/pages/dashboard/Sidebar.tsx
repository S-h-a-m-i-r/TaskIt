import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DashboardSvgIcon, CreditsSvgIcon, ProfileSvgIcon } from "../../components/svg";
import taskit from "../../assets/Task_it_logo.svg";
import addon from "../../assets/addon.png";
import bigCloud from "../../assets/icons/big_cloud.svg";
import smallCloud from "../../assets/icons/small_cloud.svg";
import logout from "../../assets/icons/Logout_icon.svg";
import Model from "../../components/Model";

const Sidebar = () => {
  const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleLogoutClick = () => {
		setIsModalOpen(true);
	};

	useEffect(() => {
		console.log("state updated");
	}, [isModalOpen]);
const handleNavigation = () => {
  navigate('/credits')
}
	return (
		<aside className="w-60 bg-white py-4 flex flex-col relative ">
			<div className="sticky top-10">
				<div className="flex pb-9 mb-12 items-center gap-4 mx-2">
					<img src={taskit} alt="taskit logo" />
				</div>
				<nav className="relative">
					<ul>
						<li className="text-black">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive
										? "flex py-4 px-4 w-full bg-primary-100 text-white"
										: "flex py-4 px-4 hover:bg-gray-200 text-black"
								}
							>
								{({ isActive }) => (
									<div className="flex items-center gap-2">
										<DashboardSvgIcon stroke={isActive ? "white" : "black"} />
										Dashboard
									</div>
								)}
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/credits"
								className={({ isActive }) =>
									isActive
										? "flex py-4 px-4 w-full bg-primary-100 text-white"
										: "flex py-4 px-4 hover:bg-gray-200 text-black"
								}
							>
								{({ isActive }) => (
									<div className="flex items-center gap-2">
										<CreditsSvgIcon stroke={isActive ? "white" : "black"} />
										Credits
									</div>
								)}
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									isActive
										? "flex py-4 px-4 w-full bg-primary-100 text-white"
										: "flex py-4 px-4 hover:bg-gray-200 text-black"
								}
							>
								{({ isActive }) => (
									<div className="flex items-center gap-2">
										<ProfileSvgIcon stroke={isActive ? "white" : "black"} />
										Profile
									</div>
								)}
							</NavLink>
						</li>
						<div className="my-5 w-full border"></div>
						<li
							className="flex gap-2 items-center px-4 py-4 cursor-pointer hover:bg-slate-50"
							onClick={handleLogoutClick}
						>
							{" "}
							<img src={logout} /> <span> Logout </span>
						</li>
					</ul>
				</nav>
			</div>
			<div className="absolute bottom-10 left-3">
				<div className=" mt-20 max-w-[216px] max-lg:max-w-[150px] w-full justify-self-center flex flex-col justify-end p-3 rounded-lg h-[187px] bg-[#F3F4F6] relative overflow-hidden">
					<img src={bigCloud} className="absolute top-0 left-0 z-0" />
					<img src={smallCloud} className="absolute top-10 right-0 z-0" />
					<div className="z-10">
						<p className="text-[48px] text-primary-100">
							10<span className="text-lg">.99</span>
						</p>
						<p>Get 3 tasks credits for only</p>
						<button
							className="w-full rounded-full bg-primary-100 text-white flex justify-center gap-2 items-center py-1"
							onClick={handleNavigation}
						>
							Buy Now <img src={addon} width={20} />
						</button>
					</div>
				</div>
			</div>
			{isModalOpen && <Model setIsModalOpen={setIsModalOpen} isModal={isModalOpen} />}
		</aside>
	);
};

export default Sidebar;
