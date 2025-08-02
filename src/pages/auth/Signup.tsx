import { useForm } from "react-hook-form";
import InputField from "../../components/generalComponents/InputField";
import { useNavigate } from "react-router-dom";
import useRegistrationStore from '../../stores/registrationStore';
import { message } from 'antd';
import InputMask from 'react-input-mask';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	userName: string;
}

const Signup = () => {
	const navigate = useNavigate();
	const { userDetails, setUserDetails, nextStep } = useRegistrationStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<FormData>({
		defaultValues: userDetails,
	});

	const onSubmit = async (data: FormData) => {
		try {
			const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
			if (!phoneRegex.test(data.phone)) {
				message.error('Please enter a valid US phone number: (555) 123-4567');
				return;
			}
			setUserDetails(data);
			nextStep();
			navigate('/signup/plan');
		} catch (error) {
			const err = error as Error;
			message.error(err.message || 'Failed to save user details');
		}
	};

	// Function to handle phone input changes
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue('phone', value);
		setUserDetails({ ...userDetails, phone: value });

		// Trigger validation when phone number is complete
		if (value.replace(/\D/g, '').length === 10) {
			trigger('phone');
		}
	};

	const fieldError = errors?.phone;
	const errorMessage = fieldError?.message as string;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className=" text-black py-5 flex flex-col gap-5 justify-center rounded-lg w-full font-sans"
		>
			<div className=" text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
				<h2>Sign Up Now</h2>
			</div>
			<div className=" text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
				<p>Sign up today and unlock the full potential of TaskAway!</p>
			</div>
			<div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
				<InputField<FormData>
					id="firstName"
					label="First Name"
					className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
					register={register}
					errors={errors}
					placeHolder="Enter First Name"
					type="text"
					validation={{
						required: 'First name is required',
					}}
				/>
				<InputField<FormData>
					id="lastName"
					label="Last Name"
					className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
					register={register}
					errors={errors}
					placeHolder="Enter Last Name"
					type="text"
					validation={{
						required: 'Last name is required',
					}}
				/>
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

				{/* Phone Input with React Input Mask */}
				<div className="w-full flex flex-col gap-2">
					<label
						htmlFor="phone"
						className="block text-sm font-semibold mb-2 text-left"
					>
						Phone Number
					</label>
					<InputMask
						mask="(999) 999-9999"
						maskChar="_"
						value={userDetails.phone || ''}
						onChange={handlePhoneChange}
					>
						{(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
							<input
								{...inputProps}
								id="phone"
								type="tel"
								className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 border-gray-200 ${
									fieldError
										? 'text-red-500 focus:text-red-500 border-red-500'
										: 'text-black focus:text-black focus:border-transparent'
								} border border-gray-300 rounded-md p-2 text-black focus:text-black`}
								placeholder="(555) 123-4567"
							/>
						)}
					</InputMask>
					{errorMessage && (
						<p className="text-red-500 text-sm mt-1">{errorMessage}</p>
					)}
				</div>

				{/* This one spans 1 columns to appear in a row by itself */}
				<div className="col-span-1">
					<InputField<FormData>
						id="userName"
						label="User Name"
						register={register}
						errors={errors}
						placeHolder="Enter Username"
						type="text"
						validation={{
							required: 'Username is required',
						}}
						className="border border-gray-300 rounded-md p-2 text-black focus:text-black"
					/>
				</div>
			</div>
			<button
				type="submit"
				className="w-full bg-primary-50 text-white py-3 px-4 mt rounded-full text-[12px] hover:bg-primary-200"
			>
				Continue
			</button>
		</form>
	);
};

export default Signup;
