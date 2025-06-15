import { useLocation } from "react-router-dom";
import authDesign from "../../../assets/authImage.webp";
import AuthFormSidebar from "../AuthFormSidebar";
import PasswordForgot from "./PasswordForgot";
import Newpassword from "./Newpassword";

const ForgotPassword = () => {
	const location = useLocation();
	return (
		<div className="w-full p-8 font-sans">
			<AuthFormSidebar image={authDesign} />
			<div className="text-center items-center justify-center text-black md:px-10 py-5 flex gap-5">
				<div className="w-full max-w-[886px] mt-4">
					{location.pathname === "/forgot-password" && <PasswordForgot />}
					{location.pathname === "/forgot-password/new-password" && <Newpassword />}
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
