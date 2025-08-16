import { request } from './request';
import {
	LoginCredentials,
	RegisterCredentials,
	CompleteRegistrationData,
	AuthResponse,
	GetUsersResponse,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	ForgotPasswordResponse,
	ResetPasswordResponse,
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

export const forgotPassword = (
	email: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
	return request<ForgotPasswordResponse>({
		method: 'post',
		url: '/auth/forget-password',
		data: email as unknown as Record<string, unknown>,
	});
};

export const resetPassword = (
	passwordData: ResetPasswordRequest,
	token: string
): Promise<ResetPasswordResponse> => {
	// Transform the data to match backend expectations
	const transformedData = {
		password: passwordData.password,
		confirmPassword: passwordData.confirmPassword,
	};

	return request<ResetPasswordResponse>({
		method: 'post',
		url: `/auth/reset-password?token=${token}`,
		data: transformedData as unknown as Record<string, unknown>,
	});
};

export const addTeamMember = (teamMemberData: {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phone: string;
	password: string;
	role: string;
	isVerified: boolean;
}): Promise<{ success: boolean; message?: string }> => {
	return request<{ success: boolean; message?: string }>({
		method: 'post',
		url: '/team/addMember',
		data: teamMemberData as unknown as Record<string, unknown>,
	});
};

export const getAllTeamMembers = (): Promise<{
	success: boolean;
	teamMembers: Array<{
		_id: string;
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		phone: string;
		role: string;
		isVerified: boolean;
		__v: number;
	}>;
	message?: string;
}> => {
	return request<{
		success: boolean;
		teamMembers: Array<{
			_id: string;
			firstName: string;
			lastName: string;
			userName: string;
			email: string;
			phone: string;
			role: string;
			isVerified: boolean;
			__v: number;
		}>;
		message?: string;
	}>({
		method: 'get',
		url: '/team/allMembers',
	});
};

export const getTeamMember = (id: string): Promise<{
	success: boolean;
	teamMember: {
		_id: string;
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		phone: string;
		role: string;
		isVerified: boolean;
		__v: number;
	};
	message?: string;
}> => {
	return request<{
		success: boolean;
		teamMember: {
			_id: string;
			firstName: string;
			lastName: string;
			userName: string;
			email: string;
			phone: string;
			role: string;
			isVerified: boolean;
			__v: number;
		};
		message?: string;
	}>({
		method: 'get',
		url: `/team/getMember/${id}`,
	});
};

export const updateTeamMember = (id: string, teamMemberData: {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phone: string;
	password?: string;
	role: string;
	isVerified: boolean;
}): Promise<{ success: boolean; message?: string }> => {
	return request<{ success: boolean; message?: string }>({
		method: 'put',
		url: `/team/updateMember/${id}`,
		data: teamMemberData as unknown as Record<string, unknown>,
	});
};

export const deleteTeamMember = (id: string): Promise<{ success: boolean; message?: string }> => {
	return request<{ success: boolean; message?: string }>({
		method: 'delete',
		url: `/team/deleteMember/${id}`,
	});
};