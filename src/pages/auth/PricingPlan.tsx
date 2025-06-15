import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PricingPlans() {
	const navigate = useNavigate();
	const [selectedPlan, setSelectedPlan] = useState(0);
	const handleclick = () => {
		navigate("/signup/creditCardDetails");
	};
	return (
		<div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
						Choose the plan that works for you
					</h1>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					{/* Starter Plan */}
					<div
						className={`relative bg-white flex flex-col justify-between h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ${
							!selectedPlan ? "border-blue-500" : "border-gray-200"
						} border`}
					>
						<div className="p-8 bg-white rounded-2xl" id="0">
							<div className="mb-6 bg-white">
								<h2 className="text-2xl font-bold text-gray-900 mb-2 bg-white">Starter Plan</h2>
								<p className="text-gray-600 text-lg bg-white">10-Credit Plan</p>
							</div>

							<div className="mb-8">
								<div className="flex items-baseline bg-white">
									<span className="text-5xl font-bold text-gray-900 bg-white">$70</span>
									<span className="text-gray-600 text-lg ml-2 bg-white">/month</span>
								</div>
							</div>

							<div className="space-y-4 mb-8 bg-white">
								<div className="flex items-start bg-white">
									<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
									<span className="text-gray-700 bg-white">10 credits/month</span>
								</div>
								<div className="flex items-start bg-white">
									<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
									<span className="text-gray-700 bg-white">10 credits/month</span>
								</div>
								<div className="flex items-start bg-white">
									<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
									<span className="text-gray-700 bg-white">Additional credits: $5/credit</span>
								</div>
								<div className="flex items-start bg-white">
									<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
									<span className="text-gray-700 bg-white">No rollover unless base 10 credits are also bought</span>
								</div>
							</div>

							<button
								className="w-full h-12 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-full font-medium text-base"
								onClick={() => {
									setSelectedPlan(0);
								}}
							>
								Select Plan
							</button>
						</div>
					</div>

					{/* Unlimited Plan - Highlighted */}
					<div
						className={`relative bg-white flex flex-col justify-between h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ${
							selectedPlan ? "border-blue-500 border-2" : "border-gray-200"
						} border`}
					>
						<div className="p-8 bg-white rounded-2xl" id="0">
							<div className="h-full py-1 bg-white">
								<div className="mb-6 bg-white">
									<h2 className="text-2xl font-bold text-gray-900 mb-2 bg-white">Unlimited Plan</h2>
									<p className="text-gray-600 text-lg bg-white">Unlimited Credits</p>
								</div>

								<div className="mb-8">
									<div className="flex items-baseline bg-white">
										<span className="text-5xl font-bold text-gray-900 bg-white">$120</span>
										<span className="text-gray-600 text-lg ml-2 bg-white">/month</span>
									</div>
								</div>

								<div className="space-y-4 mb-8 bg-white">
									<div className="flex items-start bg-white">
										<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
										<span className="text-gray-700 bg-white">unlimited Tasks</span>
									</div>
									<div className="flex items-start bg-white">
										<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
										<span className="text-gray-700 bg-white">Best for frequent users</span>
									</div>
									<div className="flex items-start bg-white">
										<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
										<span className="text-gray-700 bg-white">All other benefits included</span>
									</div>
								</div>
							</div>
							<button
								className="w-full h-12 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-full font-medium text-base"
								onClick={() => {
									setSelectedPlan(1);
								}}
							>
								Select Plan
							</button>
						</div>
					</div>
				</div>

				{/* Continue Button */}
				<div className="w-full">
					<button
						className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
						onClick={handleclick}
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
}
