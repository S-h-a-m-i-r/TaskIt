import { CreditSvgIcon, CustomerSvgIcon, DashboardSvgIcon, SettingsSvgIcon, TasksSvgIcon, TeamManagementSvgIcon } from "../assets/svg";
import { FaInstagram } from "react-icons/fa6";
import { RiFacebookCircleLine } from "react-icons/ri";
import { LiaLinkedin } from "react-icons/lia";

export const SuperAdminRoutes = [
	{
		label: "Dashboard",
		Icon: DashboardSvgIcon,
		route: "/admin",
	},
	{
		label: "Tasks",
		Icon: TasksSvgIcon ,
		route: "/admin/tasks",
	},
	{
		label: "Credits",
		Icon: CreditSvgIcon  ,
		route: "/admin/credits",
	},
	{
		label: "Customer",
		Icon: CustomerSvgIcon  ,
		route: "/admin/customers",
	},
	{
		label: "Invoices",
		Icon: CustomerSvgIcon  ,
		route: "/admin/invoices",
	},
	{
		label: "Team Management",
		Icon: TeamManagementSvgIcon  ,
		route: "/admin/teamManagement",
	},
    {
		label: "Settings",
		Icon: SettingsSvgIcon  ,
		route: "/admin/settings",
	},
];

export const socialIcons = [
	{
		label: "",
		Icon: FaInstagram,
		path: "https://www.instagram.com",
	},
	{
		label: "",
		Icon: RiFacebookCircleLine,
		path: "https://www.facebook.com",
	},
	{
		label: "",
		Icon: LiaLinkedin,
		path: "https://www.linkedin.com"
	},
];

export const ManagerAdminRoutes = [
	{
		label: "Dashboard",
		Icon: DashboardSvgIcon  ,
		route: "/manager",
	},
	{
		label: "Tasks",
		Icon: TasksSvgIcon ,
		route: "/manager/tasks",
	},
	{
		label: "Credits",
		Icon: CreditSvgIcon ,
		route: "/manager/credits",
	},

	{
		label: "Invoices",
		Icon: CustomerSvgIcon ,
		route: "/manager/invoices",
	},
];
