import axios from 'axios';
import { BASE_URL } from './baseURL';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(config => {

    const accessToken = window.localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

export default api;