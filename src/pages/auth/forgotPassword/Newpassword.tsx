import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import tickMark from '../../../assets/icons/tickmark.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputField from '../../../components/generalComponents/InputField';
import { resetPassword } from '../../../services/authService';

interface FormData {
	password: string;
	confirm_password: string;
}

const Newpassword: React.FC = () => {
	const [showPasswords, setShowPasswords] = useState({
		password: false,
		confirm_password: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			setMessage({
				type: 'error',
				text: 'Invalid reset link. Please request a new password reset.',
			});
		}
	}, [token]);

	const onSubmit = async (data: FormData) => {
		if (!token) {
			setMessage({
				type: 'error',
				text: 'Invalid reset link. Please request a new password reset.',
			});
			return;
		}

		if (data.password !== data.confirm_password) {
			setMessage({ type: 'error', text: 'Passwords do not match.' });
			return;
		}

		setIsLoading(true);
		setMessage(null);

		try {
			const response = await resetPassword(
				{
					password: data.password,
					confirmPassword: data.confirm_password,
				},
				token
			);

			if (response.success) {
				setMessage({
					type: 'success',
					text: response.message || 'Password updated successfully!',
				});
				setIsSuccess(true);
			} else {
				setMessage({
					type: 'error',
					text:
						response.message || 'Failed to update password. Please try again.',
				});
			}
		} catch (error: unknown) {
			console.error('Reset password error:', error);
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An error occurred. Please try again.';
			setMessage({ type: 'error', text: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignIn = () => {
		navigate('/login');
	};

	const togglePasswordVisibility = (field: 'password' | 'confirm_password') => {
		setShowPasswords((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<h1 className="text-black font-bold text-2xl  w-full text-center">
				Forgot password
			</h1>
			<p className="text-gray-100 text-xl font-normal text-center w-full">
				Please enter your new password below
			</p>
			{message && (
				<div
					className={`p-3 rounded-md mb-4 ${
						message.type === 'success'
							? 'bg-green-100 text-green-700 border border-green-300'
							: 'bg-red-100 text-red-700 border border-red-300'
					}`}
				>
					{message.text}
				</div>
			)}
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
								required: 'Confirm password is required',
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

				{!isSuccess && <button
					type="submit"
					disabled={isLoading}
					className="w-full bg-primary-50 text-white py-2 px-4 mt-5 rounded-full hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? 'Updating...' : 'Update Password'}
				</button>}
				{isSuccess && (
					<div className="flex w-full items-center gap-2 text-left">
						<img src={tickMark} alt="Success" />
						<span className="text-gray-100 font-light">
							Password updated successfully
						</span>
					</div>
				)}
				{isSuccess && (
					<button
						type="button"
						onClick={handleSignIn}
						className="w-full bg-primary-50 text-white py-2 px-4 mt-3 rounded-full hover:bg-primary-50/90"
					>
						Sign In
					</button>
				)}
			</form>
		</div>
	);
};

export default Newpassword;
