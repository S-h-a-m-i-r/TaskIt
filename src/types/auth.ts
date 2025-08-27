// Shared auth types to be used across the application

export interface User {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	userName: string;
	profileImage?: string;
	credits: number;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	email: string;
	password: string;
	name: string;
	// Add other registration fields as needed
}

export interface CompleteRegistrationData {
	userDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		userName: string;
	};
	planDetails: {
		planType: '10_CREDITS' | 'UNLIMITED';
		planName: string;
		price: number;
		credits: number | 'UNLIMITED';
	};
	paymentMethod: {
		paymentMethodId: string;
		cardLast4: string;
		cardBrand: string;
		cardExpMonth: number;
		cardExpYear: number;
		cardFunding: string;
		token: string;
	};
	password: string;
}

export interface AuthResponse {
	token: string;
	user: User;
	success: boolean;
	message?: string;
	details?: {
		errors?: Array<{
			field?: string;
			message?: string;
			value?: string;
		}>;
	};
	stack?: string;
	name?: string;
}

export interface GetUsersResponse {
	success: boolean;
	users: User[];
	message?: string;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ResetPasswordRequest {
	password: string;
	confirmPassword: string;
}

export interface ForgotPasswordResponse {
	success: boolean;
	message: string;
}

export interface ResetPasswordResponse {
	success: boolean;
	message: string;
} 