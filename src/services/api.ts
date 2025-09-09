import axios, { InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '../stores/authStore';

const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
	headers: {
		'Content-Type': 'application/json',
		// Add default cache control headers
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'Pragma': 'no-cache',
	  },
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const { token } = useAuthStore.getState();
	if (token) {
	  config.headers.Authorization = `Bearer ${token}`;
	}
	
	// For POST requests, always add cache control headers
	if (config.method?.toLowerCase() === 'post') {
	  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
	  config.headers['Pragma'] = 'no-cache';
	  
	  // Add a timestamp parameter to the URL to ensure uniqueness
	  const separator = config.url?.includes('?') ? '&' : '?';
	  config.url = `${config.url}${separator}_t=${Date.now()}`;
	}
	
	return config;
  });


  API.interceptors.response.use(
	(response) => response,
	(error) => {
	  // If we get a 304 on a POST request, retry the request once
	  if (error.response?.status === 304 && error.config?.method?.toLowerCase() === 'post') {
		console.warn('Received 304 on POST request, retrying with cache busting');
		// Add an extra cache-busting parameter and retry
		const retryConfig = { ...error.config };
		retryConfig.url = `${retryConfig.url}&_retry=${Date.now()}`;
		return API(retryConfig);
	  }
	  return Promise.reject(error);
	}
  );

export default API;
