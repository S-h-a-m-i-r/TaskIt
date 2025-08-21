import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/layout/Layout";
import RoleProtectedRoute from './ProtectedRoute';
import LoadingDots from '../components/generalComponents/LoadingDots';

// Lazy load all pages
const MainPage = lazy(() => import("../pages/user").then(module => ({ default: module.MainPage })));
const CreditsPage = lazy(() => import("../pages/user").then(module => ({ default: module.CreditsPage })));
const ProfilePage = lazy(() => import("../pages/user").then(module => ({ default: module.ProfilePage })));
const DashboardLayout = lazy(() => import("../pages/user/Layout"));
const Login = lazy(() => import("../pages/auth/AuthDesign"));
const Signup = lazy(() => import("../pages/auth/AuthDesign"));
const ForgotPassword = lazy(() => import("../pages/auth/forgotPassword"));
const Newpassword = lazy(() => import("../pages/auth/forgotPassword/Newpassword"));
const TasklistPage = lazy(() => import("../pages/user/TasklistPage"));
const InprogressTasklist = lazy(() => import("../pages/user/InprogressTasks"));
const SubmittedTasklist = lazy(() => import("../pages/user/SubmittedTasks"));
const ClosedTasklist = lazy(() => import("../pages/user/ClosedTasks"));
const RecurringTasklist = lazy(() => import("../pages/user/RecurringTasks"));
const TaskDetailsPage = lazy(() => import("../pages/user/TaskDetailsPage"));
const NotificationPage = lazy(() => import("../pages/user/NotificationPage"));
const CreateTask = lazy(() => import("../pages/user/CreateTask"));
const Plan = lazy(() => import("../pages/auth/PricingPlan"));
const CreditCardDetails = lazy(() => import("../pages/auth/CreditCardDetails"));
const CreatePassword = lazy(() => import("../pages/auth/CreatePassword"));
const AdminLayout = lazy(() => import("../admin/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const Tasks = lazy(() => import("../pages/admin/Tasks"));
const AdminTaskDetails = lazy(() => import('../pages/admin/AdminTaskDetails'));
const Settings = lazy(() => import('../pages/admin/Settings'));
const Teammanagement = lazy(() => import('../pages/admin/Teammanagement'));
const Customers = lazy(() => import('../pages/admin/Customers'));
const Invoices = lazy(() => import('../pages/admin/Invoices'));
const Credits = lazy(() => import('../pages/admin/Credits'));
const ManagerCredits = lazy(() => import('../pages/manager/Credits'));
const ManagerTasks = lazy(() => import('../pages/manager/Tasks'));
const ManagerInvoices = lazy(() => import('../pages/manager/Invoices'));
const AddCreditsToUsers = lazy(() => import('../components/generalComponents/addRemoveCreditsToUsers').then(module => ({ default: module.AddCreditsToUsers })));
const RemoveCreditsToUsers = lazy(() => import('../components/generalComponents/addRemoveCreditsToUsers').then(module => ({ default: module.RemoveCreditsToUsers })));
const AddTeamPage = lazy(() => import('../pages/AddTeam'));
const ManagerLayout = lazy(() => import('../pages/manager/ManagerLayout'));
const ManagerDashboard = lazy(() => import('../pages/manager/ManagerDashboard'));
const AboutUsPage = lazy(() => import('../pages/user/aboutUs'));
const ContactUsPage = lazy(() => import('../pages/user/contactUs'));
const ConditionAndPrivacyPolicyPage = lazy(() => import('../pages/ConditionAndPrivacyPage'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingDots />
  </div>
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ 
				path: 'login', 
				element: (
					<Suspense fallback={<PageLoader />}>
						<Login />
					</Suspense>
				) 
			},
			{
				path: 'signup',
				element: (
					<Suspense fallback={<PageLoader />}>
						<Signup />
					</Suspense>
				),
				children: [
					{ 
						path: 'plan', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Plan />
							</Suspense>
						) 
					},
					{ 
						path: 'creditCardDetails', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<CreditCardDetails />
							</Suspense>
						) 
					},
					{ 
						path: 'createPassword', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<CreatePassword />
							</Suspense>
						) 
					},
				],
			},
			{
				path: 'forgot-password',
				element: (
					<Suspense fallback={<PageLoader />}>
						<ForgotPassword />
					</Suspense>
				),
				children: [{ 
					path: 'new-password', 
					element: (
						<Suspense fallback={<PageLoader />}>
							<Newpassword />
						</Suspense>
					) 
				}],
			},
			{
				path: '',
				element: (
					<RoleProtectedRoute
						allowedRoles={['BASIC', 'CUSTOMER', 'MANAGER', 'ADMIN']}
					/>
				),
				children: [
					{
						path: '',
						element: (
							<Suspense fallback={<PageLoader />}>
								<DashboardLayout />
							</Suspense>
						),
						children: [
							{ 
								index: true, 
								element: (
									<Suspense fallback={<PageLoader />}>
										<MainPage />
									</Suspense>
								) 
							},
							{ 
								path: 'credits', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<CreditsPage />
									</Suspense>
								) 
							},
							{ 
								path: 'profile', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<ProfilePage />
									</Suspense>
								) 
							},
							{ 
								path: 'tasks', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<TasklistPage />
									</Suspense>
								) 
							},
							{ 
								path: 'inProgress', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<InprogressTasklist />
									</Suspense>
								) 
							},
							{ 
								path: 'submitted', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<SubmittedTasklist />
									</Suspense>
								) 
							},
							{ 
								path: 'closed', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<ClosedTasklist />
									</Suspense>
								) 
							},
							{ 
								path: 'recurring', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<RecurringTasklist />
									</Suspense>
								) 
							},
							{ 
								path: 'task/:id', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<TaskDetailsPage />
									</Suspense>
								) 
							},
							{ 
								path: 'admin-task/:id', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<AdminTaskDetails />
									</Suspense>
								) 
							},
							{ 
								path: 'notification', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<NotificationPage />
									</Suspense>
								) 
							},
							{ 
								path: 'createTask', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<CreateTask />
									</Suspense>
								) 
							},
							{ 
								path: 'AboutUs', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<AboutUsPage />
									</Suspense>
								) 
							},
							{ 
								path: 'ContactUs', 
								element: (
									<Suspense fallback={<PageLoader />}>
										<ContactUsPage />
									</Suspense>
								) 
							},
							{
								path: 'terms',
								element: (
									<Suspense fallback={<PageLoader />}>
										<ConditionAndPrivacyPolicyPage />
									</Suspense>
								),
							},
							{
								path: 'privacy',
								element: (
									<Suspense fallback={<PageLoader />}>
										<ConditionAndPrivacyPolicyPage />
									</Suspense>
								),
							},
							{
								path: 'termsAndConditions',
								element: (
									<Suspense fallback={<PageLoader />}>
										<ConditionAndPrivacyPolicyPage />
									</Suspense>
								),
							},
						],
					},
				],
			},
		],
	},
	{
		path: 'admin',
		element: <RoleProtectedRoute allowedRoles={['ADMIN']} />,
		children: [
			{
				path: '',
				element: (
					<Suspense fallback={<PageLoader />}>
						<AdminLayout />
					</Suspense>
				),
				children: [
					{ 
						index: true, 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AdminDashboard />
							</Suspense>
						) 
					},
					{ 
						path: 'credits', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Credits />
							</Suspense>
						) 
					},
					{ 
						path: 'tasks', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Tasks />
							</Suspense>
						) 
					},
					{ 
						path: 'task/:id', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AdminTaskDetails />
							</Suspense>
						) 
					},
					{ 
						path: 'settings', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Settings />
							</Suspense>
						) 
					},
					{ 
						path: 'teamManagement', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Teammanagement />
							</Suspense>
						) 
					},
					{ 
						path: 'customers', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Customers />
							</Suspense>
						) 
					},
					{ 
						path: 'invoices', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<Invoices />
							</Suspense>
						) 
					},
					{ 
						path: 'addCredits', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AddCreditsToUsers />
							</Suspense>
						) 
					},
					{ 
						path: 'removeCredits', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<RemoveCreditsToUsers />
							</Suspense>
						) 
					},
					{ 
						path: 'addTeam', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AddTeamPage />
							</Suspense>
						) 
					},
					{ 
						path: 'addTeam/:id', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AddTeamPage />
							</Suspense>
						) 
					},
				],
			},
		],
	},
	{
		path: 'manager',
		element: <RoleProtectedRoute allowedRoles={['MANAGER', 'ADMIN']} />,
		children: [
			{
				path: '',
				element: (
					<Suspense fallback={<PageLoader />}>
						<ManagerLayout />
					</Suspense>
				),
				children: [
					{ 
						index: true, 
						element: (
							<Suspense fallback={<PageLoader />}>
								<ManagerDashboard />
							</Suspense>
						) 
					},
					{ 
						path: 'credits', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<ManagerCredits />
							</Suspense>
						) 
					},
					{ 
						path: 'tasks', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<ManagerTasks />
							</Suspense>
						) 
					},
					{ 
						path: 'task/:id', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AdminTaskDetails />
							</Suspense>
						) 
					},
					{ 
						path: 'invoices', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<ManagerInvoices />
							</Suspense>
						) 
					},
					{ 
						path: 'addCredits', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<AddCreditsToUsers />
							</Suspense>
						) 
					},
					{ 
						path: 'removeCredits', 
						element: (
							<Suspense fallback={<PageLoader />}>
								<RemoveCreditsToUsers />
							</Suspense>
						) 
					},
				],
			},
		],
	},
	{
		path: 'basic',
		element: <RoleProtectedRoute allowedRoles={['MANAGER', 'ADMIN', 'BASIC']} />,
		children: [
			{
				path: '',
				element: <ManagerLayout />,
				children: [
					{ index: true, element: <ManagerDashboard /> },
					{ path: 'tasks', element: <ManagerTasks /> },
					{ path: 'task/:id', element: <AdminTaskDetails /> },
				],
			},
		],
	},
]);
