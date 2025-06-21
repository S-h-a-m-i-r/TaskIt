import { useState } from "react";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const CreatePassword = () => {
	const navigate = useNavigate();
	const [showPasswords, setShowPasswords] = useState({
		password: false,
		confirm_password: false,
	  });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	interface FormData {
		email: string;
		password: string;
		confirm_password: string;
	}
	const togglePasswordVisibility = (field: 'password' | 'confirm_password') => {
		setShowPasswords((prev) => ({
		  ...prev,
		  [field]: !prev[field],
		}));
	  };

	const onSubmit = (data: FormData) => {
		console.log(data);
		navigate("/signup/createPassoword");
	};
	const handleClick = () => {
		navigate("/");
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className=" max-w-[886px] text-black py-5 flex flex-col gap-5 justify-center rounded-lg w-full font-sans"
		>
			<div className=" text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
				<h2>Create Password</h2>
			</div>
			<div className=" text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
				<p>Unlock the full potential of TaskAway!</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
				onClick={handleClick}
				className="w-full bg-primary-50 text-white py-4 text-[12px] px-4 mt rounded-full hover:bg-primary-200"
			>
				Create Account
			</button>
		</form>
	);
};

export default CreatePassword;
