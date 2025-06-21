import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	interface FormData {
		email: string;
		password: string;
		confirm_password: string;
		first_name: string;
		last_name: string;
		phone_number: string;
		user_name: string;
	}

	const onSubmit = (data: FormData) => {
		console.log(data);
		navigate("/signup/plan");
	};
	const handleClick = () => {
		navigate("/signup/plan");
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className=" text-black py-5 flex max-w-[886px] flex-col gap-5 justify-center rounded-lg w-full font-sans"
		>
			<div className=" text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
				<h2>Sign Up Now</h2>
			</div>
			<div className=" text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
				<p>Sign up today and unlock the full potential of TaskAway!</p>
			</div>
			<div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
			<InputField<FormData>
							id="first_name"
							label="First Name"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="Enter First Name"
							type='text'
						/>
				<InputField<FormData>
							id="last_name"
							label="Last Name"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="Enter Last Name"
							type='text'
						/>
<InputField<FormData>
						id="email"
						label="Email"
						register={register}
						errors={errors}
						placeHolder="Email"
						type="text"
						validation={{
							required: "Email is required",
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Invalid email address"
							}
						}}
						className="border border-gray-300 rounded-md p-2 text-black focus:text-black"
					/>
				<InputField<FormData>
						id="phone_number"
						label="Phone Number"
						register={register}
						errors={errors}
						placeHolder="Enter Phone No"
						type="text"
						className="border border-gray-300 rounded-md p-2 text-black focus:text-black"
					/>

				{/* This one spans 1 columns to appear in a row by itself */}
				<div className="col-span-1">
				<InputField<FormData>
						id="user_name"
						label="User Name"
						register={register}
						errors={errors}
						placeHolder="Enter Username"
						type="text"
						
						className="border border-gray-300 rounded-md p-2 text-black focus:text-black"
					/>
				</div>
			</div>
			<button
				//  type="submit"
				onClick={handleClick}
				className="w-full bg-primary-50 text-white py-3 px-4 mt rounded-full text-[12px] hover:bg-primary-200"
			>
				Continue
			</button>
		</form>
	);
};

export default Signup;
