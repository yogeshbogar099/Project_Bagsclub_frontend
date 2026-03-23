import axios from 'axios';
import toast from 'react-hot-toast';

const computeBaseURL = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (envUrl) return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
    if (import.meta.env.DEV) return '/api';
    if (typeof window !== 'undefined') {
        const origin = window.location.origin;
        return `${origin}/api`;
    }
    return 'http://localhost:5000/api';
};

const api = axios.create({
    baseURL: computeBaseURL(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            // Optionally probe health endpoint to differentiate CORS vs server down
            toast.error('Network error. Please check server connectivity.');
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 503) {
            const message = error.response?.data?.message || 'Server temporarily unavailable';
            toast.error(message);
            return Promise.reject(error);
        }

        const url = String(originalRequest?.url || '');
        const skipRefresh = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh') || url.includes('/auth/logout');

        if (error.response.status === 401 && !originalRequest._retry && !skipRefresh) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                const { data } = await api.post('/auth/refresh');
                
                // Update local storage with new token
                localStorage.setItem('accessToken', data.accessToken);
                
                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, logout user (clear storage)
                localStorage.removeItem('accessToken');
                // No login page to redirect to
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
