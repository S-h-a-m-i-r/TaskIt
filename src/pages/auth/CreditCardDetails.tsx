import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";

const CreditCardDetails = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<FormData>();

	interface FormData {
		email: string;
		password: string;
		confirm_password: string;
	}

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
			className=" text-black py-5 flex flex-col gap-5 justify-center rounded-lg w-full font-sans"
		>
			<div className=" text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
				<h2>Credit Card Details</h2>
			</div>
			<div className=" text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
				<p>Unlock the full potential of TaskAway!</p>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<InputField
					id="cardName"
					label="Name on the card"
					register={register}
					onChange={clearErrors}
					errors={errors}
					placeHolder="e.g, John Doe"
					type="text"
				/>
				<InputField
					id="cardNumber"
					label="Card Number"
					register={register}
					onChange={clearErrors}
					errors={errors}
					placeHolder="1234 5678 9012 3456"
					type="text"
				/>

				<InputField
					id="expiry"
					label="Expiry Date"
					register={register}
					onChange={clearErrors}
					errors={errors}
					placeHolder="MM/YY"
					type="text"
				/>
				<InputField
					id="CVV"
					label="CVV"
					register={register}
					onChange={clearErrors}
					errors={errors}
					placeHolder="e.g, 123"
					type="text"
				/>
			</div>
			<button
				// type="submit"
				onClick={handleClick}
				className="w-full bg-primary-50 text-white py-2 px-4 mt rounded-md hover:bg-primary-200"
			>
				Continue
			</button>
		</form>
	);
};

export default CreditCardDetails;
