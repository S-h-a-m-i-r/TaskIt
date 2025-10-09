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
		console.log(`🔍 Request Debug - Making ${method.toUpperCase()} request to:`, url);
		if (Object.keys(data).length > 0) {
			console.log("🔍 Request Debug - Request data:", data);
		}
		
		const response = await API({ method, url, data, params });
		console.log(`✅ Request Debug - ${method.toUpperCase()} response received:`, response.data);
		return response.data;
	} catch (error) {
		console.error(`❌ Request Error - ${method.toUpperCase()} request failed for ${url}:`, error);
		
		// Preserve the original error structure from the backend
		const errorResponse = error as ErrorResponse;

		// Log detailed error information
		if (errorResponse.response) {
			console.error("❌ Request Error - Response details:", {
				status: errorResponse.response.status,
				statusText: errorResponse.response.statusText,
				data: errorResponse.response.data
			});
		} else if (errorResponse.request) {
			console.error("❌ Request Error - Network error, no response received:", errorResponse.request);
		} else {
			console.error("❌ Request Error - Request setup error:", errorResponse.message);
		}

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
