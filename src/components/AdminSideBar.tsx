import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import React from "react";
import TaskItLogo from "../assets/Task_it_logo.svg"
interface SidebarItem {
	label: string;
	Icon: React.ElementType;
	route: string;
}

interface SidebarProps {
	items: SidebarItem[];
	onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, onLogout }) => {
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeItem, setActiveItem] = useState<string>("");

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleItemClick = (route: string) => {
		setActiveItem(route);
		navigate(route);
		toggleSidebar();
	};

    useEffect(() => {
        setActiveItem(location.pathname); // Set the active item to the current route
    }, [location.pathname]);
	return (
		<>
			{/* Hamburger Menu Button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<button className="text-black text-2xl p-2 rounded-md bg-gray-200 hover:bg-gray-300" onClick={toggleSidebar}>
					{isSidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
				</button>
			</div>

			{/* Sidebar */}
			<aside
				className={`w-60 bg-white py-4 lg:flex flex-col relative transition-transform transform ${
					isSidebarOpen ? "translate-x-0 max-md:fixed max-md:z-10 max-md:h-screen" : "-translate-x-full hidden"
				} lg:translate-x-0`}
			>
				<div className="sticky top-10">
					<div className="flex pb-9 mb-12 items-center gap-4 mx-2">
						<img src={TaskItLogo} alt="Logo" />
					</div>
					<nav className="relative">
						<ul>
							{items.map((item) => (
								<li key={item.route}>
									<button
										className={`flex py-4 px-4 w-full ${
											activeItem === item.route ? "bg-primary-50 text-white" : "hover:bg-gray-200 text-black"
										}`}
										onClick={() => handleItemClick(item.route)}
									>
										<div className="flex items-center gap-2">
                                            {<item.Icon stroke={activeItem === item.route ? '#FFFFFF': '#000000'} />}
											<span>{item.label}</span>
										</div>
									</button>
								</li>
							))}
							<div className="my-5 w-full border"></div>
							{onLogout && (
								<li className="flex gap-2 items-center px-4 py-4 cursor-pointer hover:bg-slate-50" onClick={onLogout}>
									<img src="/path/to/logout-icon.svg" alt="Logout" />
									<span>Logout</span>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
