import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { store } from "@/store/store";
import { refreshTokenApi } from "@/apis/auth";
import { logout, setAuthCredentials } from "@/store/slices/authSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState() as any;
    const token = state.auth?.accessToken;

    if (token) {
      const headers = (config.headers ?? {}) as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    const status = error.response?.status;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const state = store.getState() as any;
    const refreshToken: string | null = state.auth?.refreshToken ?? null;

    if (!refreshToken) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          const data = await refreshTokenApi(refreshToken);
          store.dispatch(setAuthCredentials(data));

          apiClient.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        })();
      }

      await refreshPromise;
      isRefreshing = false;
      refreshPromise = null;

      if (!originalRequest.headers) {
        originalRequest.headers = {} as AxiosRequestHeaders;
      }
      (originalRequest.headers as AxiosRequestHeaders).Authorization =
        apiClient.defaults.headers.common.Authorization as string;

      return apiClient(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      refreshPromise = null;
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  },
);

