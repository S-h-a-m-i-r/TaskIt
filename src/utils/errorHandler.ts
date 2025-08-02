import { AuthResponse } from '../types/auth';

export const getErrorMessage = (response: AuthResponse | Error | unknown): string => {
	// Handle AuthResponse with details.errors array
	if (response && typeof response === 'object' && 'details' in response) {
		const authResponse = response as AuthResponse;
		
		if (authResponse.details?.errors && Array.isArray(authResponse.details.errors)) {
			const firstError = authResponse.details.errors[0];
			return firstError?.message || authResponse.message || 'An error occurred';
		}
		// Fallback to the main message
		return authResponse.message || 'An error occurred';
	}

	// Handle Error objects
	if (response instanceof Error) {
		return response.message || 'An error occurred';
	}

	// Handle unknown error types with message property
	if (response && typeof response === 'object' && 'message' in response) {
		return (response as { message: string }).message;
	}

	// Handle case where response might be a string
	if (typeof response === 'string') {
		return response;
	}

	// Default fallback
	return 'An unexpected error occurred';
};

export const getUsernameErrorMessage = (response: AuthResponse | Error | unknown): string => {
	const message = getErrorMessage(response);
	
	// Provide more user-friendly messages for username-related errors
	if (message.toLowerCase().includes('username') || message.toLowerCase().includes('user name')) {
		if (message.toLowerCase().includes('maximum') || message.toLowerCase().includes('limit')) {
			return 'This username is already taken by the maximum number of users. Please choose a different username.';
		}
		if (message.toLowerCase().includes('alphanumeric')) {
			return 'Username must contain only letters and numbers (no spaces or special characters).';
		}
		if (message.toLowerCase().includes('taken') || message.toLowerCase().includes('exists')) {
			return 'This username is already taken. Please choose a different username.';
		}
	}
	
	return message;
};

export const logError = (error: unknown, context: string = 'Application Error'): void => {
	console.error(`${context}:`, error);
	
	// Additional logging for better debugging
	if (error && typeof error === 'object') {
		console.error('Error type:', typeof error);
		console.error('Error keys:', Object.keys(error));
		if ('details' in error) {
			console.error('Error details:', (error as any).details);
		}
	}
}; 