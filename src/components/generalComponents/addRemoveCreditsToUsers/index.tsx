import { useForm } from "react-hook-form";
import "../../../pages/auth/custom-font.css";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";

interface FormData {
	customerName: string;
	numberOfCredits: string;
	dateOfIssuence?: string;
	dateOfExpiry?: string;
	amountToRemove?: string;
}
export const AddCreditsToUsers = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const navigate = useNavigate();
	const onSubmit = (data: FormData) => {
		console.log("Form data:", data);
		navigate("/");
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="text-left text-black py-5 flex flex-col gap-5 rounded-lg w-full font-sans"
		>
			<div className="space-y-2 text-[32px] font-bold text-center [tracking:0.01em] text-primary-100">
				<h2>Add Credits to User</h2>
			</div>
			<div className="flex flex-col w-full justify-center gap-5">
				<div className="space-y-2 w-full max-w-[433px]">
					<InputField<FormData>
						id="customerName"
						label="Customer Name"
						register={register}
						errors={errors}
						placeHolder=""
						type="text"
						className="border border-gray-300 rounded-md p-2 text-black focus:text-black h-[56px] bg-[#F7FAFC]"
					/>
				</div>
				<div className="w-full max-w-[433px]">
					<div className="space-y-2 relative w-full">
						<InputField<FormData>
							id="numberOfCredits"
							label="Number of Credits"
							register={register}
							errors={errors}
							placeHolder=""
							type="text"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black h-[56px] bg-[#F7FAFC]"
						/>
					</div>

					<div className="space-y-2 relative w-full">
						<InputField<FormData>
							id="dateOfIssuence"
							label="Date of Issuence"
							register={register}
							errors={errors}
							placeHolder=""
							type="text"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black h-[56px] bg-[#F7FAFC]"
						/>
					</div>
					<div className="space-y-2 relative w-full">
						<InputField<FormData>
							id="dateOfExpiry"
							label="Date of Expiry"
							register={register}
							errors={errors}
							placeHolder=""
							type="text"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black h-[56px] bg-[#F7FAFC]"
						/>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-end">
				<button
					type="submit"
					className="bg-primary-50 w-full max-w-[150px] text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center"
				>
					Confirm Add
				</button>
			</div>
		</form>
	);
};

export const RemoveCreditsToUsers = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const navigate = useNavigate();
	const onSubmit = (data: FormData) => {
		console.log("Form data:", data);
		navigate("/");
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="text-left text-black py-5 flex flex-col gap-5 rounded-lg w-full font-sans"
		>
			<div className="space-y-2 text-[32px] font-bold text-center [tracking:0.01em] text-primary-100">
				<h2>Remove Credits from User</h2>
			</div>
			<div className="flex flex-col w-full justify-center gap-5">
				<div className="w-full max-w-[433px]">
					<div className="space-y-2 relative flex flex-col gap-2 w-full">
						<label  className="block text-sm font-semibold mb-2 text-left" >Reason for Removal</label>
						<textarea id="reason" name="reason" className="h-[144px]" />
					</div>
					<div className="space-y-2 relative w-full">
						<InputField<FormData>
							id="amountToRemove"
							label="Amount to Remove"
							register={register}
							errors={errors}
							placeHolder=""
							type="text"
							className="border border-gray-300 rounded-md p-2 text-black focus:text-black h-[56px] bg-[#F7FAFC]"
						/>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-end">
				<button
					type="submit"
					className="bg-primary-50 w-full max-w-[150px] text-white py-3 mt rounded-full hover:bg-primary-200 flex justify-center self-center"
				>
					Confirm Removal
				</button>
			</div>
		</form>
	);
};
