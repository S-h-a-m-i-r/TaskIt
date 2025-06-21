import { CreditSvgIcon, CustomerSvgIcon, DashboardSvgIcon, SettingsSvgIcon, TasksSvgIcon, TeamManagementSvgIcon } from "../assets/svg";

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

export const ManagerAdminRoutes = [
	{
		label: "Dashboard",
		Icon: DashboardSvgIcon  ,
		route: "/admin",
	},
	{
		label: "Tasks",
		Icon: TasksSvgIcon ,
		route: "/admin/tasks",
	},
	{
		label: "Credits",
		Icon: CreditSvgIcon ,
		route: "/admin/crdits",
	},

	{
		label: "Invoices",
		Icon: CustomerSvgIcon ,
		route: "/admin/invoices",
	},
];
