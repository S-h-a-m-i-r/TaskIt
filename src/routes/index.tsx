import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { MainPage, CreditsPage, ProfilePage } from "../pages/dashboard";

import DashboardLayout from "../pages/dashboard/Layout";

import Login from "../pages/auth/AuthDesign";

import Signup from "../pages/auth/AuthDesign";

import ForgotPassword from "../pages/auth/forgotPassword";

import Newpassword from "../pages/auth/forgotPassword/Newpassword";

import TasklistPage from "../pages/dashboard/TasklistPage";

import InprogressTasklist from "../pages/dashboard/InprogressTasks";

import SubmittedTasklist from "../pages/dashboard/SubmittedTasks";

import ClosedTasklist from "../pages/dashboard/ClosedTasks";

import RecurringTasklist from "../pages/dashboard/RecurringTasks";

import TaskDetailsPage from "../pages/dashboard/TaskDetailsPage";

import NotificationPage from "../pages/dashboard/NotificationPage";

import CreateTask from "../pages/dashboard/CreateTask";

import AdminDashboardLayout from "../admin/layout";

import Plan from "../pages/auth/PricingPlan";

import CreditCardDetails from "../pages/auth/CreditCardDetails";
import CreatePassword from "../pages/auth/CreatePassword";

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
			{
				path: "admin",
				element: <AdminDashboardLayout />,
			},
		],
	},
]);
