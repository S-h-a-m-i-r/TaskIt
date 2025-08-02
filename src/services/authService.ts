import { request } from './request';
import {
	LoginCredentials,
	RegisterCredentials,
	CompleteRegistrationData,
	AuthResponse,
	GetUsersResponse,
} from '../types/auth';

export const loginUser = (
	credentials: LoginCredentials
): Promise<AuthResponse> => {
	return request<AuthResponse>({
		method: 'post',
		url: '/auth/login',
		data: credentials as unknown as Record<string, unknown>,
	});
};

export const registerUser = (
	credentials: RegisterCredentials
): Promise<AuthResponse> => {
	return request<AuthResponse>({
		method: 'post',
		url: '/auth/register',
		data: credentials as unknown as Record<string, unknown>,
	});
};

export const completeRegistration = (
	registrationData: CompleteRegistrationData
): Promise<AuthResponse> => {
	// Transform the data to match your backend API structure
	const transformedData = {
		firstName: registrationData.userDetails.firstName,
		lastName: registrationData.userDetails.lastName,
		email: registrationData.userDetails.email,
		phone: registrationData.userDetails.phone,
		userName: registrationData.userDetails.userName,
		password: registrationData.password,
		planType: registrationData.planDetails.planType,
		planName: registrationData.planDetails.planName,
		planPrice: registrationData.planDetails.price,
		planCredits: registrationData.planDetails.credits,
		paymentMethod: {
			paymentMethodId: registrationData.paymentMethod.paymentMethodId,
			cardLast4: registrationData.paymentMethod.cardLast4,
			cardBrand: registrationData.paymentMethod.cardBrand,
			cardExpMonth: registrationData.paymentMethod.cardExpMonth,
			cardExpYear: registrationData.paymentMethod.cardExpYear,
			cardFunding: registrationData.paymentMethod.cardFunding,
			token: registrationData.paymentMethod.token,
		},
	};

	return request<AuthResponse>({
		method: 'post',
		url: '/auth/register',
		data: transformedData as unknown as Record<string, unknown>,
	});
};

export const getAllUsers = (): Promise<GetUsersResponse> => {
	return request<GetUsersResponse>({
		method: 'get',
		url: '/users',
	});
};

export const getUsersByRole = (roles: string[]): Promise<GetUsersResponse> => {
	return request<GetUsersResponse>({
		method: 'get',
		url: `/users/by-role?role=${roles.join(',')}`,
	});
};