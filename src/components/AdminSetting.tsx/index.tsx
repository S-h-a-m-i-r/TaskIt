import { useState } from "react";

export default function SettingsPage() {
	const [dataDeletion, setDataDeletion] = useState("manual");
	const [timezone, setTimezone] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

	const handlePasswordChange = () => {
		// Handle password change logic
	};

	return (
		<div className="w-full  mx-auto p-6 bg-transparent min-h-screen">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
			</div>

			{/* Data Deletion Settings */}
			<div className="mb-10">
				<h2 className="text-xl font-semibold text-gray-900 mb-6">Data Deletion Settings</h2>
				<div className="space-y-4">
					{/* Manual Deletion */}
					<div className="flex text-left items-start space-x-4 p-4 border border-gray-300 rounded-lg">
						<div className="flex items-center mt-1">
							<input
								type="radio"
								id="manual"
								name="dataDeletion"
								value="manual"
								checked={dataDeletion === "manual"}
								onChange={(e) => setDataDeletion(e.target.value)}
								className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="manual" className="block text-base font-medium text-gray-900 cursor-pointer">
								Manual Deletion
							</label>
							<p className="text-sm text-gray-500 mt-1">Delete data manually as needed.</p>
						</div>
					</div>

					{/* Scheduled Deletion */}
					<div className="flex text-left items-start space-x-4 p-4 border border-gray-300 rounded-lg">
						<div className="flex items-center mt-1">
							<input
								type="radio"
								id="scheduled"
								name="dataDeletion"
								value="scheduled"
								checked={dataDeletion === "scheduled"}
								onChange={(e) => setDataDeletion(e.target.value)}
								className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="scheduled" className="block text-left text-base font-medium text-gray-900 cursor-pointer">
								Scheduled Deletion
							</label>
							<p className="text-sm text-gray-500 mt-1">Schedule data deletion at regular intervals.</p>
						</div>
					</div>
				</div>
			</div>

			{/* Timezone Configuration */}
			<div className="mb-10">
				<h2 className="text-xl text-left font-semibold text-gray-900 mb-6">Timezone Configuration</h2>
				<div className="max-w-md">
					<input
						type="text"
						value={timezone}
						onChange={(e) => setTimezone(e.target.value)}
						placeholder="Enter Timezone"
						className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
					/>
				</div>
			</div>

			{/* Password Change */}
			<div className="mb-10">
				<h2 className="text-xl text-left font-semibold text-gray-900 mb-6">Password Change</h2>
				<div className="space-y-4 max-w-md">
					<input
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						placeholder="Current Password"
						className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
					/>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="New Password"
						className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
					/>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm New Password"
						className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
					/>
					<button
						onClick={handlePasswordChange}
						className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
					>
						Change Password
					</button>
				</div>
			</div>

			{/* 2FA Setup */}
			<div className="mb-10">
				<h2 className="text-xl font-semibold text-gray-900 mb-6">2FA Setup</h2>
				<div className="flex items-center justify-between p-4 border border-gray-300 bg-slate-200/50 rounded-lg">
					<div className="flex-1 ">
						<h3 className="text-base font-medium text-gray-900">Two-Factor Authentication</h3>
						<p className="text-sm text-gray-500 mt-1">
							Enable or manage Two-Factor Authentication for enhanced security.
						</p>
					</div>
					<div className="ml-4">
						<button
							onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
							className={`relative inline-flex h-6 w-11 items-center border border-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
								twoFactorEnabled ? "bg-blue-600" : "bg-gray-400"
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
									twoFactorEnabled ? "translate-x-6" : "translate-x-1"
								}`}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
