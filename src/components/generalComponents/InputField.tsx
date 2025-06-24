import { UseFormRegister, FieldValues, Path, FieldErrors } from 'react-hook-form';

interface InputFieldProps<TFormValues extends FieldValues = FieldValues> {
	id: Path<TFormValues>;
	label: string;
	register: UseFormRegister<TFormValues>;
	onChange?: (id: string) => void;
	errors?: FieldErrors<TFormValues>;
	placeHolder?: string;
	type?: string;
	className?: string;
	validation?: {
		required?: string | boolean;
		pattern?: {
			value: RegExp;
			message: string;
		};
	};
}

const InputField = <TFormValues extends FieldValues = FieldValues>({
	id,
	label,
	register,
	onChange,
	errors,
	placeHolder,
	type = "text",
	className,
	validation
}: InputFieldProps<TFormValues>) => {
	const fieldError = errors?.[id];
	const errorMessage = fieldError?.message as string;
	
	return (
		<div className="w-full flex flex-col gap-2">
			<label htmlFor={id as string} className="block text-sm font-semibold mb-2 text-left">
				{label}
			</label>
			<input
				id={id as string}
				type={type}
				className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 border-gray-200 ${
					fieldError ? "text-red-500 focus:text-red-500 border-red-500" : "text-gray-50 focus:border-transparent"
				} ${className || ""}`}
				placeholder={placeHolder}
				{...register(id, {
					required: validation?.required || `${label} is required`,
					pattern: validation?.pattern,
					onChange: onChange ? () => onChange(id as string) : undefined,
				})}
			/>
			{errorMessage && (
				<p className="text-red-500 text-sm mt-1">{errorMessage}</p>
			)}
		</div>
	);
};

export default InputField;