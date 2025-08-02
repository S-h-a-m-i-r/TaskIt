import { useState } from "react";
import InputField from "../../components/generalComponents/InputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import useRegistrationStore from '../../stores/registrationStore';
import useAuthStore from '../../stores/authStore';
import { message } from 'antd';
import {
	getErrorMessage,
	getUsernameErrorMessage,
	logError,
} from '../../utils/errorHandler';

interface FormData {
	password: string;
	confirm_password: string;
}

const CreatePassword = () => {
	const navigate = useNavigate();
	const {
		userDetails,
		selectedPlan,
		paymentMethod,
		resetRegistration,
		prevStep,
	} = useRegistrationStore();
	const { completeRegistration } = useAuthStore();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [showPasswords, setShowPasswords] = useState({
		password: false,
		confirm_password: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const togglePasswordVisibility = (field: 'password' | 'confirm_password') => {
		setShowPasswords((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const handleBack = () => {
		prevStep();
		navigate('/signup/creditCardDetails');
	};

	const onSubmit = async (data: FormData) => {
		if (!userDetails || !selectedPlan || !paymentMethod) {
			message.error('Please complete all previous steps');
			return;
		}

		if (data.password !== data.confirm_password) {
			message.error('Passwords do not match');
			return;
		}

		setIsSubmitting(true);

		try {
			const registrationData = {
				userDetails,
				planDetails: selectedPlan,
				paymentMethod,
				password: data.password,
			};

			const result = await completeRegistration(registrationData);
			console.log(result);
			if (result.success) {
				message.success(
					'Registration successful! Please check your email to confirm your account.'
				);
				resetRegistration();
				navigate('/login');
			} else {
				const errorMessage = getUsernameErrorMessage(result);
				message.error(errorMessage);
			}
		} catch (error) {
			logError(error, 'Registration Error');
			const errorMessage = getErrorMessage(error);
			message.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
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
				<p>Create a strong password to secure your account</p>
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
						type={showPasswords.password ? 'text' : 'password'}
						validation={{
							required: 'Password is required',
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
								message:
									'Password must be at least 8 characters with letters and numbers',
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
						type={showPasswords.confirm_password ? 'text' : 'password'}
						validation={{
							required: 'Please confirm your password',
						}}
					/>
					<div
						className="absolute top-9 right-0 pr-3 flex items-center cursor-pointer"
						onClick={() => togglePasswordVisibility('confirm_password')}
					>
						{showPasswords.confirm_password ? (
							<IoEyeOutline />
						) : (
							<IoEyeOffOutline />
						)}
					</div>
				</div>
			</div>
			<div className="flex gap-4">
				<button
					type="button"
					onClick={handleBack}
					className="flex-1 py-4 text-[12px] border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
				>
					Back
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className={`flex-1 py-4 text-[12px] px-4 rounded-full ${
						isSubmitting
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-primary-50 hover:bg-primary-200 text-white'
					}`}
				>
					{isSubmitting ? 'Creating Account...' : 'Create Account'}
				</button>
			</div>
		</form>
	);
};

export default CreatePassword;
