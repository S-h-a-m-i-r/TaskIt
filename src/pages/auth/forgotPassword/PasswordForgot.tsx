import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";

const ForgotPasswordIndex: React.FC = () => {
	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = () => {
		navigate("/forgot-password/new-password");
	};

	const handleClick = () => {
		navigate("/forgot-password/new-password");
	};

	return (
		<>
			<div>
				<h1 className="text-base text-center md:text-2xl font-bold text-black w-full">Forgot password</h1>
				<p className="text-sm md:text-base text-center text-[#4B5563] font-normal w-full mb-3">
					Please enter your Email below to update password
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-2">
					<InputField
						id="email"
						label="Email"
						register={register}
						onChange={clearErrors}
						errors={errors}
						placeHolder="Email"
						type="text"
					/>
				</div>
				<button
					// type="submit"
					className="w-full bg-primary-50 text-white py-3 px-4 mt-5 rounded-full hover:bg-primary-200 max-md:absolute max-md:bottom-10 max-md:right-5 max-md:max-w-[328px]"
					onClick={handleClick}
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default ForgotPasswordIndex;
