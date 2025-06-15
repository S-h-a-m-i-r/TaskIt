const InputField = (props: any) => {
	const { id, label, register, onChange, errors, placeHolder, type } = props;
	return (
		<div className="w-full">
			<label htmlFor={id} className="block text-sm font-semibold mb-2 text-left">
				{label}
			</label>
			<input
				id={id}
				type={type}
				className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 border-gray-200 ${
					errors.id ? "text-red-500 focus:text-red-500" : "text-gray-50 focus:border-transparent"
				}`}
				placeholder={placeHolder}
				{...register(id, {
					required: `${id} is required`,
					pattern: { value: /^\S+@\S+$/i, message: `Invalid ${id}! Please try again.` },
					onChange: () => onChange(id),
				})}
			/>
		</div>
	);
};

export default InputField;
