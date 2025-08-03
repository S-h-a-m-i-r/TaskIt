import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import InputField from '../../../components/generalComponents/InputField';
import { forgotPassword } from '../../../services/authService';

interface FormData {
	email: string;
}

const ForgotPasswordIndex: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		setMessage(null);

		try {
			const response = await forgotPassword({ email: data.email });

			if (response.success) {
				setMessage({
					type: 'success',
					text: response.message || 'Password reset link sent to your email!',
				});
				reset();
			} else {
				setMessage({
					type: 'error',
					text:
						response.message || 'Failed to send reset link. Please try again.',
				});
			}
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An error occurred. Please try again.';
			setMessage({
				type: 'error',
				text: errorMessage,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div>
				<h1 className="text-base text-center md:text-2xl font-bold text-black w-full">
					Forgot password
				</h1>
				<p className="text-sm md:text-base text-center text-[#4B5563] font-normal w-full mb-3">
					Please enter your Email below to update password
				</p>
			</div>
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

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-2">
					<InputField<FormData>
						id="email"
						label="Email"
						register={register}
						errors={errors}
						placeHolder="Email"
						type="text"
						validation={{
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address',
							},
						}}
						className="border border-gray-300 rounded-md p-2 text-black focus:text-black"
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-primary-50 text-white py-3 px-4 mt-5 rounded-full hover:bg-primary-200 max-md:absolute max-md:bottom-10 max-md:right-5 max-md:max-w-[328px] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? 'Sending...' : 'Submit'}
				</button>
			</form>
		</>
	);
};

export default ForgotPasswordIndex;
