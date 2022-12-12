import axios from 'axios';
import TokenService from './TokenService'

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 400; // default
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken()
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {
    return response;
}, async (err) => {
    const originalRequest = err.config;

    if(err.response){
        // access token expired
        if(err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const rs = await instance.post("session/refresh");

                const { token } = rs.data;
                TokenService.updateLocalAccessToken(token);

                // retry the request with new token
                return instance(err.config);

            } catch (error) { 
                return Promise.reject(error);
            }
        }
    }

    return Promise.reject(err);
});

export default instance;