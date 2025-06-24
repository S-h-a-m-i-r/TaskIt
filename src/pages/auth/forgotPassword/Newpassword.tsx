import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import tickMark from "../../../assets/icons/tickmark.svg";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/generalComponents/InputField";

interface FormData {
	password: string;
	confirmPassword: string;
	confirm_password: string
}

const Newpassword: React.FC = () => {
	const [showPasswords, setShowPasswords] = useState({
		password: false,
		confirm_password: false,
	  });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [buttonText, setButtonText] = useState("Update");
	const navigate = useNavigate();
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

	const togglePasswordVisibility = (field: 'password' | 'confirm_password') => {
		setShowPasswords((prev) => ({
		  ...prev,
		  [field]: !prev[field],
		}));
	  };

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<h1 className="text-black font-bold text-2xl  w-full text-center">Forgot password</h1>
			<p className="text-gray-100 text-xl font-normal text-center w-full">Please enter your new password below</p>
			<form onSubmit={handleSubmit(onSubmit)} className=" w-full mt-5 gap-5">
				<div className="flex w-full gap-5">
				<div className="w-full relative">
					<InputField<FormData>
						id="password"
						label="Password"
						className="border border-gray-300 rounded-md p-2 !text-black active:border-primary-200"
						register={register}
						errors={errors}
						placeHolder="Please enter password"
						type={showPasswords.password ? "text" : "password"}
						validation={{
							required: "Password is required",
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
								message: "Password must be at least 8 characters with letters and numbers",
							},
						}}
					/>
					<div
						className="absolute top-9 right-0 pr-3 flex items-center cursor-pointer"
						onClick={() => togglePasswordVisibility('password')}
					>
						 {showPasswords.password ? <IoEyeOutline /> : <IoEyeOffOutline />}
					</div>
				</div>

				<div className="w-full relative">
				<InputField<FormData>
					id="confirm_password"
					label="Confirm Password"
					className="border border-gray-300 rounded-md p-2 !text-black focus:text-black active:border-primary-200"
					register={register}
					errors={errors}
					placeHolder="Please confirm password"
					type={showPasswords.confirm_password ? "text" : "password"}
					validation={{}}
				/>
				<div
					className="absolute top-9 right-0 pr-3 flex items-center cursor-pointer"
					onClick={() => togglePasswordVisibility('confirm_password')}
				>
					{showPasswords.confirm_password ? <IoEyeOutline /> : <IoEyeOffOutline />}
				</div>
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
