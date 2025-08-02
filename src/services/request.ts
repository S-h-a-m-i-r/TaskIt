import API from './api';

// Define types for the request function
interface RequestConfig {
	method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
	url: string;
	data?: Record<string, unknown>;
	params?: Record<string, unknown>;
}

interface ErrorResponse {
	response?: {
		data?: {
			message?: string;
			details?: {
				errors?: Array<{
					field?: string;
					message?: string;
					value?: string;
				}>;
			};
			success?: boolean;
		};
	};
	message?: string;
}

export const request = async <T = unknown>({ 
	method = 'get', 
	url, 
	data = {}, 
	params = {} 
}: RequestConfig): Promise<T> => {
	try {
		const response = await API({ method, url, data, params });
		return response.data;
	} catch (error) {
		// Preserve the original error structure from the backend
		const errorResponse = error as ErrorResponse;

		// If the backend returned a structured error response, preserve it
		if (errorResponse.response?.data) {
			throw errorResponse.response.data;
		}

		// Fallback to simple error message
		const message =
			errorResponse.response?.data?.message ||
			errorResponse.message ||
			'Unexpected error occurred';
		throw new Error(message);
	}
};
