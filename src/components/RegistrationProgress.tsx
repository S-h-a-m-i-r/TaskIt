import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRegistrationStore from '../stores/registrationStore';

const RegistrationProgress: React.FC = () => {
	const { currentStep, setCurrentStep, isStepValid } = useRegistrationStore();
	const navigate = useNavigate();

	const steps = [
		{ number: 1, title: 'User Details', description: 'Personal Information', path: '/signup' },
		{ number: 2, title: 'Select Plan', description: 'Choose Your Plan', path: '/signup/plan' },
		{ number: 3, title: 'Payment', description: 'Card Details', path: '/signup/creditCardDetails' },
		{ number: 4, title: 'Password', description: 'Create Account', path: '/signup/password' },
	];

	

	const isStepClickable = (stepNumber: number) => {
		return stepNumber <= currentStep || isStepValid(stepNumber);
	};

	const handleStepClick = (stepNumber: number) => {
		try {
			// Validate if step is accessible
			if (stepNumber > currentStep && !isStepValid(stepNumber)) {
				const errorDetail = {
					code: 'STEP_NOT_ACCESSIBLE',
					message: `Cannot navigate to step ${stepNumber}. Step is not yet accessible.`,
					stepNumber,
					currentStep,
					isValid: isStepValid(stepNumber),
					requiredData: getRequiredDataForStep(stepNumber)
				};
				console.warn('Navigation blocked:', errorDetail);
				return;
			}

			// Validate step exists
			const step = steps.find(s => s.number === stepNumber);
			if (!step) {
				const errorDetail = {
					code: 'STEP_NOT_FOUND',
					message: `Step ${stepNumber} not found in registration flow.`,
					stepNumber,
					availableSteps: steps.map(s => s.number)
				};
				console.error('Step navigation error:', errorDetail);
				return;
			}

			// Update current step
			setCurrentStep(stepNumber);
			
			// Navigate to the corresponding route
			navigate(step.path);
			
		} catch (error) {
			const errorDetail = {
				code: 'NAVIGATION_ERROR',
				message: 'An unexpected error occurred during step navigation.',
				stepNumber,
				currentStep,
				originalError: error instanceof Error ? error.message : String(error),
				timestamp: new Date().toISOString()
			};
			console.error('Step navigation failed:', errorDetail);
		}
	};

	const getRequiredDataForStep = (stepNumber: number) => {
		switch (stepNumber) {
			case 1:
				return {
					required: ['firstName', 'lastName', 'email', 'phone', 'userName'],
					description: 'User details must be completed'
				};
			case 2:
				return {
					required: ['selectedPlan'],
					description: 'A plan must be selected'
				};
			case 3:
				return {
					required: ['paymentMethod'],
					description: 'Payment method must be provided'
				};
			case 4:
				return {
					required: ['password'],
					description: 'Password must be at least 8 characters'
				};
			default:
				return {
					required: [],
					description: 'Unknown step requirements'
				};
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto mb-8">
			<div className="flex items-center justify-between">
				{steps.map((step, index) => (
					<React.Fragment key={step.number}>
						<div className="flex flex-col items-center">
							<button
								onClick={() => handleStepClick(step.number)}
								disabled={!isStepClickable(step.number)}
								className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
									currentStep >= step.number
										? 'bg-primary-50 text-white hover:bg-primary-60 focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
										: 'bg-gray-200 text-gray-500 cursor-not-allowed'
								} ${
									isStepClickable(step.number) && currentStep >= step.number
										? 'cursor-pointer hover:scale-105'
										: ''
								}`}
							>
								{currentStep > step.number ? '✓' : step.number}
							</button>
							<div className="mt-2 text-center">
								<button
									onClick={() => handleStepClick(step.number)}
									disabled={!isStepClickable(step.number)}
									className={`text-sm font-medium transition-colors duration-200 ${
										currentStep >= step.number 
											? 'text-primary-50 hover:text-primary-60' 
											: 'text-gray-500'
									} ${
										isStepClickable(step.number) && currentStep >= step.number
											? 'cursor-pointer'
											: 'cursor-not-allowed'
									}`}
								>
									{step.title}
								</button>
								<div className="text-xs text-gray-400">{step.description}</div>
							</div>
						</div>
						{index < steps.length - 1 && (
							<div
								className={`flex-1 h-0.5 mx-4 ${
									currentStep > step.number ? 'bg-primary-50' : 'bg-gray-200'
								}`}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default RegistrationProgress; 