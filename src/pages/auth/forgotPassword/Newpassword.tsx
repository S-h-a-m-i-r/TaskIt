import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import tickMark from "../../../assets/icons/tickmark.svg";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";

interface FormData {
	password: string;
	confirmPassword: string;
}

const Newpassword: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState(false);
	const [buttonText, setButtonText] = useState("Update");
	const navigate = useNavigate();
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = (data: FormData) => {
		console.log("New Password:", data.password);
		setButtonText("Sign In");
		if (buttonText === "Sign In") {
			navigate("/login");
		}
	};

	const handleClick = () => {
		navigate("/");
	};

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<h1 className="text-black font-bold text-2xl  w-full text-center">Forgot password</h1>
			<p className="text-gray-100 text-xl font-normal text-center w-full">Please enter your new password below</p>
			<form onSubmit={handleSubmit(onSubmit)} className=" w-full mt-5 gap-5">
				<div className="flex w-full gap-5">
					<div className="space-y-2 relative w-full">
						<InputField
							id="password"
							label="Password"
							register={register}
							onChange={clearErrors}
							errors={errors}
							placeHolder="Password"
							type="text"
						/>
						<div
							className="absolute top-8 right-0 pr-3 flex items-center cursor-pointer"
							onClick={togglePasswordVisibility}
						>
							{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
						</div>
						{errors.password?.message && typeof errors.password.message === "string" && (
							<span className="text-red-500 text-sm">{errors.password.message}</span>
						)}
					</div>

					<div className="space-y-2 relative w-full">
						<InputField
							id="confirmPassword"
							label="Confirm Password"
							register={register}
							onChange={clearErrors}
							errors={errors}
							placeHolder="Confirm Password"
							type="text"
						/>
					</div>
				</div>

				<button
					// type="submit"
					className="w-full bg-primary-50 text-white py-2 px-4 mt-5 rounded-full hover:bg-primary-200"
					onClick={handleClick}
				>
					{buttonText}
				</button>
				{buttonText === "Sign In" && (
					<div className="flex w-full items-center gap-2 text-left">
						{" "}
						<img src={tickMark} />
						<span className="text-gray-100 font-light">Password Update successfully</span>
					</div>
				)}
			</form>
		</div>
	);
};

export default Newpassword;
