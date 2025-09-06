import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Types for registration data
interface UserDetails {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	userName: string;
}

interface PlanDetails {
	planType: '10_CREDITS' | 'UNLIMITED';
	planName: string;
	price: number;
	credits: number | 'UNLIMITED';
}

interface PaymentMethod {
	paymentMethodId: string;
	customerId: string;
	cardLast4: string;
	cardBrand: string;
	cardExpMonth: number;
	cardExpYear: number;
	cardFunding: string;
	token: string;
}

interface RegistrationState {
	userDetails: UserDetails;
	
	selectedPlan: PlanDetails | null;
	
	paymentMethod: PaymentMethod | null;
	
	password: string;
	
	currentStep: number;
	
	setUserDetails: (details: UserDetails) => void;
	setSelectedPlan: (plan: PlanDetails) => void;
	setPaymentMethod: (method: PaymentMethod) => void;
	setPassword: (password: string) => void;
	setCurrentStep: (step: number) => void;
	nextStep: () => void;
	prevStep: () => void;
	resetRegistration: () => void;
	
	// Validation
	isStepValid: (step: number) => boolean;
}

const initialUserDetails: UserDetails = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	userName: '',
};

const useRegistrationStore = create(
	devtools(
		persist(
			(set, get): RegistrationState => ({
				userDetails: initialUserDetails,
				selectedPlan: null,
				paymentMethod: null,
				password: '',
				currentStep: 1,
				
				setUserDetails: (details: UserDetails) => set({ userDetails: details }),
				setSelectedPlan: (plan: PlanDetails) => set({ selectedPlan: plan }),
				setPaymentMethod: (method: PaymentMethod) => set({ paymentMethod: method }),
				setPassword: (password: string) => set({ password }),
				setCurrentStep: (step: number) => set({ currentStep: step }),
				
				nextStep: () => {
					const { currentStep } = get();
					if (currentStep < 4) {
						set({ currentStep: currentStep + 1 });
					}
				},
				
				prevStep: () => {
					const { currentStep } = get();
					if (currentStep > 1) {
						set({ currentStep: currentStep - 1 });
					}
				},
				
				resetRegistration: () => set({
					userDetails: initialUserDetails,
					selectedPlan: null,
					paymentMethod: null,
					password: '',
					currentStep: 1,
				}),
				
				isStepValid: (step: number) => {
					const state = get();
					
					switch (step) {
						case 1:
							return !!(
								state.userDetails.firstName &&
								state.userDetails.lastName &&
								state.userDetails.email &&
								state.userDetails.phone &&
								state.userDetails.userName
							);
						case 2:
							return !!state.selectedPlan;
						case 3:
							return !!state.paymentMethod;
						case 4:
							return state.password.length >= 8;
						default:
							return false;
					}
				},
			}),
			{
				name: 'registration-storage',
				partialize: (state: RegistrationState) => ({
					userDetails: state.userDetails,
					selectedPlan: state.selectedPlan,
					paymentMethod: state.paymentMethod,
					currentStep: state.currentStep,
				}),
			}
		),
		{ name: 'RegistrationStore' }
	)
);

export default useRegistrationStore; 