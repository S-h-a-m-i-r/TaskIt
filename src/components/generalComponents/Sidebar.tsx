import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DashboardSvgIcon, CreditsSvgIcon, ProfileSvgIcon } from "../../assets/svg";
import taskit from "../../assets/Task_it_logo.svg";
import addon from "../../assets/addon.png";
import bigCloud from "../../assets/icons/big_cloud.svg";
import smallCloud from "../../assets/icons/small_cloud.svg";
import logout from "../../assets/icons/Logout_icon.svg";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { useWindowSize } from "../../hooks/useWindowSize";
import { message, Modal } from "antd";
// import Model from "../../components/Model";
// import { BsCurrencyDollar } from "react-icons/bs";

const Sidebar = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { width } = useWindowSize();

	const handleLogoutClick = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		message.success('logged out successfully!');
		navigate('/login')
	};

	const handleNavigation = () => {
		navigate("/credits");
	};
	const toggleSidebar = () => {
		if (width >= 1024) return;
		setIsSidebarOpen(!isSidebarOpen);
	};
	useEffect(() => {}, [isModalOpen]);
	return (
		<>
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<button className="text-black text-2xl p-2 rounded-md bg-gray-200 hover:bg-gray-300" onClick={toggleSidebar}>
					{isSidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
				</button>
			</div>

			<aside
				className={` w-60 bg-white py-4 lg:flex flex-col relative transition-transform transform  ${
					isSidebarOpen ? "translate-x-0 max-md:fixed max-md:z-10 max-md:h-screen " : "-translate-x-full hidden"
				} lg:translate-x-0  `}
			>
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
											? "flex py-4 px-4 w-full bg-primary-50 text-white"
											: "flex py-4 px-4 hover:bg-gray-200 text-black"
									}
									onClick={toggleSidebar}
								>
									{({ isActive }) => (
										<div className="flex items-center gap-2 ">
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
											? "flex py-4 px-4 w-full bg-primary-50 text-white"
											: "flex py-4 px-4 hover:bg-gray-200 text-black"
									}
									onClick={toggleSidebar}
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
											? "flex py-4 px-4 w-full bg-primary-50 text-white"
											: "flex py-4 px-4 hover:bg-gray-200 text-black"
									}
									onClick={toggleSidebar}
								>
									{({ isActive }) => (
										<div className="flex items-center gap-2">
											<ProfileSvgIcon stroke={isActive ? "white" : "black"} />
											Profile
										</div>
									)}
								</NavLink>
							</li>
							<li className={`${isSidebarOpen ? "block" : "hidden"}`}>
								<NavLink
									to="/createTask"
									className={({ isActive }) =>
										isActive
											? "flex py-4 px-4 w-full bg-primary-50 text-white"
											: "flex py-4 px-4 hover:bg-gray-200 text-black"
									}
									onClick={toggleSidebar}
								>
									{({ isActive }) => (
										<div className="flex items-center gap-2">
											<ProfileSvgIcon stroke={isActive ? "white" : "black"} />
											Create Task
										</div>
									)}
								</NavLink>
							</li>
							<li className={`${isSidebarOpen ? "block" : "hidden"}`}>
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive
											? "flex py-4 px-4 w-full bg-primary-50 text-white"
											: "flex py-4 px-4 hover:bg-gray-200 text-black"
									}
									onClick={toggleSidebar}
								>
									{({ isActive }) => (
										<div className="flex items-center gap-2">
											<ProfileSvgIcon stroke={isActive ? "white" : "black"} />
											login
										</div>
									)}
								</NavLink>
							</li>
							<div className="my-5 w-full border"></div>
							<li
								className="flex gap-2 items-center px-4 py-4 cursor-pointer hover:bg-slate-50"
								onClick={() => {setIsModalOpen(true)}}
							>
								{" "}
								<img src={logout} /> <span> Logout </span>
							</li>

							<div className="hidden lg:block">
								<div className=" mt-10 max-lg:max-w-[150px] w-[216px] justify-self-center flex flex-col justify-end p-3 rounded-lg h-[187px] bg-[#F3F4F6] relative overflow-hidden">
									<img src={bigCloud} className="absolute top-0 left-0 z-0" />
									<img src={smallCloud} className="absolute top-10 right-0 z-0" />
									<div className="z-10">
										<p className="text-[48px] text-primary-50">
											10
											{/* <span className="text-sm bg-primary-50"><BsCurrencyDollar/></span> */}
										</p>
										<p>per credit</p>
										<button
											className="w-full rounded-full bg-primary-50 text-white flex justify-center gap-2 items-center py-1"
											onClick={handleNavigation}
										>
											Buy Now <img src={addon} width={20} />
										</button>
									</div>
								</div>
							</div>
						</ul>
					</nav>
				</div>

				<Modal
					open={isModalOpen}
					closable={true}
					cancelText="Cancel"
					okText="Logout"
					onCancel={() => {setIsModalOpen(false)}}
					onOk={handleLogoutClick}
					centered={true}
					style={{ height: "250px" }}
					okButtonProps={{
						style: {
							backgroundColor: "#EF4444", // Red-500
							borderColor: "#EF4444",
							color: "#fff",
						},
					}}
				>
					<p className="text-lg font-semibold text-gray-600 text-center py-10">Are you sure you want to logout?</p>
				</Modal>
			</aside>
		</>
	);
};

export default Sidebar;
