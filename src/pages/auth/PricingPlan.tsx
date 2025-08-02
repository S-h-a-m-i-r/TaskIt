import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useRegistrationStore from '../../stores/registrationStore';

export default function PricingPlans() {
	const navigate = useNavigate();
	const { selectedPlan, setSelectedPlan, nextStep, prevStep } =
		useRegistrationStore();

	const handleContinue = () => {
		if (selectedPlan) {
			nextStep();
			navigate('/signup/creditCardDetails');
		}
	};

	const handleBack = () => {
		prevStep();
		navigate('/signup');
	};

	const plans = [
		{
			id: 0,
			type: '10_CREDITS' as const,
			name: 'Starter Plan',
			description: '10-Credit Plan',
			price: 70,
			credits: 10,
			features: [
				'10 credits/month',
				'10 credits/month',
				'Additional credits: $5/credit',
				'No rollover unless base 10 credits are also bought',
			],
		},
		{
			id: 1,
			type: 'UNLIMITED' as const,
			name: 'Unlimited Plan',
			description: 'Unlimited Credits',
			price: 120,
			credits: 'UNLIMITED' as const,
			features: [
				'unlimited Tasks',
				'Best for frequent users',
				'All other benefits included',
			],
		},
	];

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
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`relative bg-white flex flex-col justify-between h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ${
								selectedPlan?.planType === plan.type
									? 'border-blue-500 border-2'
									: 'border-gray-200'
							} border`}
						>
							<div className="p-8 bg-white rounded-2xl">
								<div className="mb-6 bg-white">
									<h2 className="text-2xl font-bold text-gray-900 mb-2 bg-white">
										{plan.name}
									</h2>
									<p className="text-gray-600 text-lg bg-white">
										{plan.description}
									</p>
								</div>

								<div className="mb-8">
									<div className="flex items-baseline bg-white">
										<span className="text-5xl font-bold text-gray-900 bg-white">
											${plan.price}
										</span>
										<span className="text-gray-600 text-lg ml-2 bg-white">
											/month
										</span>
									</div>
								</div>

								<div className="space-y-4 mb-8 bg-white">
									{plan.features.map((feature, index) => (
										<div key={index} className="flex items-start bg-white">
											<Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 bg-white" />
											<span className="text-gray-700 bg-white">{feature}</span>
										</div>
									))}
								</div>

								<button
									className="w-full h-12 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-full font-medium text-base"
									onClick={() => {
										setSelectedPlan({
											planType: plan.type,
											planName: plan.name,
											price: plan.price,
											credits: plan.credits,
										});
									}}
								>
									Select Plan
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Navigation Buttons */}
				<div className="flex gap-4">
					<button
						onClick={handleBack}
						className="flex-1 py-4 text-[12px] border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
					>
						Back
					</button>
					<button
						className={`flex-1 text-[12px] py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
							selectedPlan
								? 'bg-primary-50 hover:bg-primary-200 text-white'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
						onClick={handleContinue}
						disabled={!selectedPlan}
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
}
