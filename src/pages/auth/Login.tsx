import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./custom-font.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	interface FormData {
		email: string;
		password: string;
		rememberMe?: boolean;
	}

	const onSubmit = () => {
		navigate("/");
	};

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
					<InputField
						id="username"
						label="User Name"
						register={register}
						onChange={clearErrors}
						errors={errors}
						placeHolder="User Name"
						type="text"
					/>
				</div>
				<div className="w-full max-w-[433px]">
					<div className="space-y-2 relative w-full">
						<InputField
							id="password"
							label="Password"
							register={register}
							onChange={clearErrors}
							errors={errors}
							placeHolder="Please enter password"
							type={showPassword ? "text" : "password"}
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
				className="w-full max-w-[886px] bg-primary-50 text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center"
			>
				Sign in
			</button>
		</form>
	);
};

export default Login;
