import { useForm } from "react-hook-form";
import InputField from "../../components/generalComponents/InputField";
import { useNavigate } from "react-router-dom";

const CreditCardDetails = () => {
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
		card_number: string;
		expiry_date: string;
		cvv: string;
		name_on_card: string 
	}

	const onSubmit = (data: FormData) => {
		console.log(data);
		// navigate("/signup/createPassoword");
	};
	const handleClick = () => {
		navigate("/signup/createPassword");
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className=" max-w-[886px] text-black py-5 flex flex-col gap-5 justify-center rounded-lg w-full font-sans"
		>
			<div className=" text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
				<h2>Credit Card Details</h2>
			</div>
			<div className=" text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
				<p>Unlock the full potential of TaskAway!</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<InputField<FormData>
							id="name_on_card"
							label="Name on Card"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="e.g, John Smith"
							type= "text"
							
						/>
				<InputField<FormData>
							id="card_number"
							label="Card Number"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="Please enter Card number"
							type='text'
						/>
					<InputField<FormData>
							id="expiry_date"
							label="Expiry Date"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="MM / YY"
							type='text'
						/>
				<InputField<FormData>
							id="cvv"
							label="CVV"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black active:border-primary-200"
							register={register}
							errors={errors}
							placeHolder="e.g. 123"
							type='text'
						/>
			</div>
			<button
				// type="submit"
				onClick={handleClick}
				className="w-full text-[12px] bg-primary-50 text-white py-4 px-4 mt rounded-full hover:bg-primary-200"
			>
				Continue
			</button>
		</form>
	);
};

export default CreditCardDetails;
