import axios, { InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '../stores/authStore';

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const { token } = useAuthStore.getState();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;
