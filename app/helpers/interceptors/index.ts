import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import Router from 'next/router';

const config: AxiosRequestConfig = {
  //   baseURL: API_BASE_URL,
  timeout: 30000,
};

const service: AxiosInstance = axios.create(config);

// Intercept request
service.interceptors.request.use(
  (config: any) => {
    // const accessToken = getCookie(AUTH_TOKEN)

    // if (accessToken) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`
    // } else {
    //   Router.push(ENTRY_ROUTE)
    // }

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

// Intercept response
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  },
);

export default service;
