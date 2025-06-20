import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icons/ArrowLeft_icon.svg";
import profile from "../../assets/person.webp";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";

interface FormData {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
}

const ProfilePage = () => {
		const {
			register,
			// handleSubmit,
			formState: { errors },
		} = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const [showPasswords, setShowPasswords] = useState({
		password: false,
		confirm_password: false,
	  });
	const pageTitle = location.pathname.split("/").pop() || "Tasks";
	const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
	const handleGoBack = () => {
		navigate(-1);
	};

	const togglePasswordVisibility = (field: 'password' | 'confirm_password') => {
		setShowPasswords((prev) => ({
		  ...prev,
		  [field]: !prev[field],
		}));
	  };

	return (
		<div className="p-9 w-full flex flex-col gap-10">
			<div className="flex items-center gap-2">
				<div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
					<img src={backIcon} alt="back" />
				</div>
				<span className="font-semibold text-2xl"> {capitalizedPageTitle}</span>
			</div>
			<div className="flex items-start gap-12">
			<div className=" relative max-md:hidden">
				<div className="p-1 w-full">
					<img src={profile} className="max-w-[300px] w-full max-lg:w-24 max-xl:w-28 object-cover" alt="profile" />
				</div>
			</div>
			{/* Container */}
			<div className="max-w-96 w-full">
				<div className="mb-4">
				<InputField<FormData>
							id="name"
							label="Name"
							className="border border-gray-300 bg-[#f6f6f9] rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="Zain"
							type='text'
						/>
				</div>

				<div className="mb-4">
				<InputField<FormData>
						id="email"
						label="Email"
						register={register}
						errors={errors}
						placeHolder="Zainworkspace@xyz.com"
						type="text"
						validation={{
							required: "Email is required",
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Invalid email address"
							}
						}}
						className="border border-gray-300 bg-[#f6f6f9]  rounded-md p-2 text-black focus:text-black"
					/>
				</div>

				<div className="mb-4 relative">
				<InputField<FormData>
						id="password"
						label="Password"
						className="border border-gray-300 bg-[#f6f6f9]  rounded-md p-2 !text-black active:border-primary-200"
						register={register}
						errors={errors}
						placeHolder="***********"
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
				
				<div className="mb-6 relative">
				<InputField<FormData>
					id="confirm_password"
					label="Confirm Password"
					className="border border-gray-300 bg-[#f6f6f9] rounded-md p-2 !text-black focus:text-black active:border-primary-200"
					register={register}
					errors={errors}
					placeHolder="***********"
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

				<button className="w-full bg-primary-50 hover:bg-primary-200 text-white font-thin py-2 px-4 rounded-full">
					Update
				</button>
			</div>
			</div>
		</div>
	);
};

export default ProfilePage;
