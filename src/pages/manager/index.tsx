import { createBrowserRouter } from "react-router-dom";

import Layout from "../../components/layout/Layout";

import { MainPage, CreditsPage, ProfilePage } from "../../pages/dashboard";

import DashboardLayout from "../../pages/dashboard/Layout";

import Login from "../../pages/auth/AuthDesign";

import Signup from "../../pages/auth/AuthDesign";

import ForgotPassword from "../../pages/auth/forgotPassword";

import Newpassword from "../../pages/auth/forgotPassword/Newpassword";

import TasklistPage from "../../pages/dashboard/TasklistPage";

import InprogressTasklist from "../../pages/dashboard/InprogressTasks";

import SubmittedTasklist from "../../pages/dashboard/SubmittedTasks";

import ClosedTasklist from "../../pages/dashboard/ClosedTasks";

import RecurringTasklist from "../../pages/dashboard/RecurringTasks";

import TaskDetailsPage from "../../pages/dashboard/TaskDetailsPage";

import NotificationPage from "../../pages/dashboard/NotificationPage";

import CreateTask from "../../pages/dashboard/CreateTask";


import Plan from "../../pages/auth/PricingPlan";

import CreditCardDetails from "../../pages/auth/CreditCardDetails";
import CreatePassword from "../../pages/auth/CreatePassword";
import AdminLayout from "../../admin/AdminLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import Tasks from "../../pages/admin/Tasks";
import Settings from "../../pages/admin/Settings";
import Teammanagement from "../../pages/admin/Teammanagement";
import Customers from "../../pages/admin/Customers";
import Invoices from "../../pages/admin/Invoices";
import Credits from "../../pages/admin/Credits";
import ManagerCredits from "../../pages/manager/Credits"
import ManagerTasks from "../../pages/manager/Tasks"
import {AddCreditsToUsers, RemoveCreditsToUsers} from "../../components/addRemoveCreditsToUsers";
import AddTeamPage from "../../pages/AddTeam";
import ManagerLayout from "../../pages/manager/ManagerLayout";
import ManagerDashboard from "../../pages/manager/ManagerDashboard";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "login", element: <Login /> },
			{
				path: "signup",
				element: <Signup />,
				children: [
					{ path: "plan", element: <Plan /> },
					{ path: "creditCardDetails", element: <CreditCardDetails /> },
					{ path: "createPassword", element: <CreatePassword /> }
				],
			},
			{
				path: "forgot-password",
				element: <ForgotPassword />,
				children: [{ path: "new-password", element: <Newpassword /> }],
			},
			{
				path: "",
				element: <DashboardLayout />,
				children: [
					{ index: true, element: <MainPage /> },
					{ path: "credits", element: <CreditsPage /> },
					{ path: "profile", element: <ProfilePage /> },
					{ path: "tasks", element: <TasklistPage /> },
					{ path: "inProgress", element: <InprogressTasklist /> },
					{ path: "submitted", element: <SubmittedTasklist /> },
					{ path: "closed", element: <ClosedTasklist /> },
					{ path: "recurring", element: <RecurringTasklist /> },
					{ path: "task/:id", element: <TaskDetailsPage /> },
					{ path: "notification", element: <NotificationPage /> },
					{ path: "createTask", element: <CreateTask /> },
				],
			},
		],
	},
	{
		path: "admin",
		element: <AdminLayout />,
		children: [
			{
				path: "/admin",
				children: [
					{ index: true, element: <AdminDashboard /> },
					{ path: "credits", element: <Credits /> },
					{ path: "tasks", element: <Tasks /> },
					{ path: "settings", element: <Settings /> },
					{ path: "teamManagement", element: <Teammanagement /> },
					{ path: "customers", element: <Customers /> },
					{ path: "invoices", element: <Invoices /> },
					{ path: "addCredits", element: <AddCreditsToUsers /> },
					{path: "removeCredits", element: <RemoveCreditsToUsers /> },
					{ path: "addTeam", element: <AddTeamPage /> },
				],
			},
		]
	},
	{
		path: "manager",
		element: <ManagerLayout />,
		children: [
			{
				path: "/manager",
				children: [
					{ index: true, element: <ManagerDashboard /> },
					{ path: "credits", element: <ManagerCredits /> },
					{ path: "tasks", element: <ManagerTasks /> },
					{ path: "invoices", element: <Invoices /> },
					{ path: "addCredits", element: <AddCreditsToUsers /> },
					{path: "removeCredits", element: <RemoveCreditsToUsers /> },
				],
			},
		]
	}
]);
