import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        try {
            const authStorage = JSON.parse(localStorage.getItem('auth-storage'));
            const token = authStorage?.state?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error when parse token from LocalStorage", error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {return response},
    (error) => {
        if (error.response && error.response.status == 401) {


        }
        return Promise.reject(error);
    }
);

export default api;