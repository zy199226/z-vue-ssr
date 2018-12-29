import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:8080/', // 开启服务端时，记得写好请求接口地址
    // baseURL: '/',
    timeout: 10000
});

service.interceptors.request.use((config) => {

    return config;
}, (error) => {
    Promise.reject(error);
});


service.interceptors.response.use((response) => {

    return response;
}, (error) => {
    Promise.reject(error);
});

export default service;
