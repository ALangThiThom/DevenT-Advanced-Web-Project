import api from '../utils/api';

export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post('/register', data);
    return response.data;
};

export const logout = async () => {
    // Use POST as per Laravel Sanctum instead of DELETE
    const response = await api.post('/logout');
    return response.data;
};