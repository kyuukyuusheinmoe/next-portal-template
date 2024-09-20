import https from 'https';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = process.env.API_URL,
  isServer = typeof window === 'undefined';

interface CustomAxiosInstance extends AxiosInstance {
    get<T= any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
  
    post<T= any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
  
    put<T= any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
  }

const axiosInstance : CustomAxiosInstance = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
});

axiosInstance.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');

    const token = cookies().get('token')?.value;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token.replace(/['"]+/g, '')}`;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      config.headers['Authorization'] = `Bearer ${token.replaceAll('%22', '')}`;
    }
  }

  return config;
});

export const fetcher = (url: string) => axiosInstance.get(url);

export { axiosInstance };