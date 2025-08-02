import React from "react";
import { useLocation } from "react-router-dom";
import authDesign from "../../assets/authImage.webp";
import AuthFormSidebar from "./AuthFormSidebar";
import AuthFooter from "../AuthFooter";
import { Outlet } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import StripeProvider from '../../components/StripeProvider';
import RegistrationProgress from '../../components/RegistrationProgress';

const AuthDesign: React.FC = () => {
	const location = useLocation();
	const path = location.pathname;
	const isParentRoute = path === '/signup' || path === '/login';
	const isRegistrationFlow = path.startsWith('/signup');

	return (
		<div className="w-full flex flex-col justify-between items-center font-sans p-8">
			<div className="h-[500px] md:h-[250px] w-full">
				<AuthFormSidebar image={authDesign} />
			</div>

			<div className="text-left text-black md:px-10 py-5 flex flex-col items-center gap-10 md:gap-10 rounded-lg w-full">
				{isRegistrationFlow && <RegistrationProgress />}
				{isRegistrationFlow ? (
					<StripeProvider>
						{isParentRoute ? <Signup /> : <Outlet />}
					</StripeProvider>
				) : (
					<>{isParentRoute ? <Login /> : <Outlet />}</>
				)}
			</div>

			<AuthFooter tab={path === '/login' ? 'Login' : 'Signup'} />
		</div>
	);
};

export default AuthDesign;
