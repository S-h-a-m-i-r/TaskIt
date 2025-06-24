import { useState } from "react";
import InputField from "../../generalComponents/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../generalComponents/ButtonComponent";
type FormData = {
	teamName: string;
};
const AddTeam = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [permissions, setPermissions] = useState({
		manageTickets: false,
		manageUsers: false,
		viewReports: false,
	});
	const onSubmit = (data: FormData) => {
		console.log(data);
	};
	const handleCheckboxChange = (permission: keyof typeof permissions) => {
		setPermissions((prev) => ({
			...prev,
			[permission]: !prev[permission],
		}));
	};

	const checkboxItems = [
		{
			id: "manageTickets",
			label: "Manage Tickets",
			checked: permissions.manageTickets,
		},
		{
			id: "manageUsers",
			label: "Manage Users",
			checked: permissions.manageUsers,
		},
		{
			id: "viewReports",
			label: "View Reports",
			checked: permissions.viewReports,
		},
	];

	return (
		<div>
			<h2 className="text-[32px] text-left font-bold text-gray-900"> Add Team</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField<FormData>
					id="teamName"
					label="Team Name"
					register={register}
					errors={errors}
					placeHolder="Enter team name"
					type="text"
					className="border border-gray-300 rounded-md p-2 text-black focus:text-black max-w-[448px] !bg-[#E8EDF2]"
				/>

				<div className="flex flex-col gap-2 mt-5">
					<label htmlFor="Description" className="block text-left font-semibold mb-5 text-2xl text-gray-700">
						Description
					</label>
					<textarea
						id="teamDescription"
						name="teamDescription"
						placeholder="write here"
						rows={10}
						className="w-full max-w-[448px] px-2 py-4 border bg-[#E8EDF2] border-gray-300 rounded-md focus:outline-none focus:none"
					/>
				</div>
				<div>
					<h3 className="text-[18px] font-bold text-left mt-8">Team permission</h3>
					<div className="w-full max-w-md py-6 bg-transparent">
						<div className="space-y-4">
							{checkboxItems.map((item) => (
								<div key={item.id} className="flex items-center">
									<div className="relative">
										<input
											type="checkbox"
											id={item.id}
											checked={item.checked}
											onChange={() => handleCheckboxChange(item.id as keyof typeof permissions)}
											className="sr-only"
										/>
										<label htmlFor={item.id} className="flex items-center cursor-pointer">
											<div
												className={`w-5 h-5 border-2 rounded-[4px] flex items-center justify-center transition-all ${
													item.checked
														? "bg-blue-600 border-blue-600"
														: "bg-white border-gray-300 hover:border-gray-400"
												}`}
											>
												{item.checked && (
													<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
													</svg>
												)}
											</div>
											<span className="ml-3 text-base text-gray-900 select-none">{item.label}</span>
										</label>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex w-full justify-end">
							<ButtonComponent
								title={"Create Team"}
								className=" bg-primary-50 w-full hover:bg-primary-200 text-white py-3 mt rounded-full flex justify-center self-center max-w-[150px]"
							/>							
						</div>
			</form>
		</div>
	);
};

export default AddTeam;

