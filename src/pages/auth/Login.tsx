import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./custom-font.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/generalComponents/InputField";
import { message } from "antd";

interface FormData {
	email: string;
	password: string;
	rememberMe?: boolean;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

const VITE_USER_EMAIL='taskawayUser@gmail.com'
const VITE_USER_PASSWORD='taskaway2025'

// # manager cresidentials
const VITE_MANAGER_EMAIL='taskawayManager@gmail.com'

// # user cresidentials
const VITE_SUPER_ADMIN_EMAIL='taskawaySuperAdmin111@gmail.com'

	const onSubmit = (data: FormData) => {
		if (data.email === VITE_USER_EMAIL && VITE_USER_PASSWORD) {
		localStorage.setItem("token", '1234567890');
		localStorage.setItem('role', 'user');
			message.success('logged in successfully');
		navigate("/");
		} else if (data.email === VITE_MANAGER_EMAIL && VITE_USER_PASSWORD) {
			localStorage.setItem("token", '1234567890');
			localStorage.setItem('role', 'manager');
				message.success('logged in successfully');
			navigate("/manager");
			} else if (data.email === VITE_SUPER_ADMIN_EMAIL && VITE_USER_PASSWORD) {
			localStorage.setItem("token", '1234567890');
			localStorage.setItem('role', 'admin');
				message.success('logged in successfully');
			navigate("/admin");
			} else {
			message.error('invalid email or password');
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="text-left text-black py-5 flex flex-col gap-5 rounded-lg w-full font-sans"
		>
			<div className="space-y-2 text-[32px] font-bold text-center [tracking:0.01em] text-primary-100">
				<h2>Welcome Back</h2>
			</div>
			<div className="space-y-2 text-[16px] font-normal mb-1 [tracking:0.01em] text-gray-600 text-center">
				<p className="px-4">Today is a new day. It's your day. You shape it. Sign in to start managing your tasks.</p>
			</div>
			<div className="flex w-full justify-center gap-5">
				<div className="space-y-2 w-full max-w-[433px]">
					<InputField<FormData>
						id="email"
						label="Email"
						register={register}
						errors={errors}
						placeHolder="Email"
						type="text"
						validation={{
							required: "Email is required",
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Invalid email address"
							}
						}}
						className="border border-gray-300 rounded-md p-2 !text-black focus:text-black"
					/>
				</div>
				<div className="w-full max-w-[433px]">
					<div className="space-y-2 relative w-full">
						<InputField<FormData>
							id="password"
							label="Password"
							className="border border-gray-300 rounded-md p-2 !text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="Please enter password"
							type={showPassword ? "text" : "password"}
							validation={{
								required: "Password is required",
								pattern: {
									value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
									message: "Password must be at least 8 characters with letters and numbers"
								}
							}}
						/>
						<div
							className="absolute top-8 right-0 pr-3 flex items-center cursor-pointer"
							onClick={togglePasswordVisibility}
						>
							{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
						</div>
					</div>
					<div className="flex justify-end items-center">
						<Link to="/forgot-password" className="text-gray-400 text-sm font-bold no-underline float-right mt-2">
							Forget password?
						</Link>
					</div>
				</div>
			</div>
			<button
				type="submit"
				className="bg-primary-50 w-full max-w-[886px] text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center"
			>
				Sign in
			</button>
		</form>
	);
};

export default Login;