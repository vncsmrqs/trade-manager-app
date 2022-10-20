import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type ErrorHandlers = { [key:number]: () => void; }

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

export abstract class HttpClient {
  protected readonly client: AxiosInstance;

  protected constructor(baseURL: string, headers?: Record<string, any>) {
    this.client = axios.create({ baseURL, headers });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.client.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );

    this.client.interceptors.request.use(
      this.handleRequests,
      this.handleError,
    );
  }

  private handleRequests = (request: AxiosRequestConfig) => {
    request.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('token'),
      ...request.headers,
    };
    return request;
  }

  private handleResponse = ({ data }: AxiosResponse) => {
    return data;
  }

  protected handleError = (error: AxiosError) => {
    const errorHandlers: ErrorHandlers = {
      401: () => this.handleUnauthorized(error),
      403: this.handleForbidden,
    };

    if(error.response && Object.keys(errorHandlers).includes(error.response.status.toString())) {
      errorHandlers[error.response.status]();
    }

    return Promise.reject(error);
  }

  private handleUnauthorized = ({ response }: AxiosError) => {
    //todo: Logout
  }

  private handleForbidden = () => {
    //todo: Show error alert
  }
}
