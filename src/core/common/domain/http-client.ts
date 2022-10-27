import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { app, TYPES } from "@/core/common/container";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import router from "@/router";

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
  private _notificationController!: NotificationController;
  private _authController!: AuthController;

  get notificationController() {
    if (!this._notificationController) {
      this._notificationController = app.make<NotificationController>(TYPES.NotificationController);
    }
    return this._notificationController;
  }

  get authController() {
    if (!this._authController) {
      this._authController = app.make<AuthController>(TYPES.AuthController);
    }
    return this._authController;
  }

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
      401: this.handleUnauthorized,
      403: this.handleForbidden,
    };

    if(error.response && Object.keys(errorHandlers).includes(error.response.status.toString())) {
      errorHandlers[error.response.status]();
    }

    return Promise.reject(error.response);
  }

  private handleUnauthorized = () => {
    this.authController.logout();
    if (router.currentRoute.name && router.currentRoute.name !== 'login') {
      router.replace({ name: 'login' }).then(() => {
        this.notificationController.push({
          message: 'Sua sessão expirou. Por favor, faça o login novamente.',
          type: 'error',
        });
      });
    }
  }

  private handleForbidden = () => {
    this.notificationController.push({
      message: 'Você não tem permissão para realizar essa ação ou acessar este recurso.',
      type: 'warning',
    });
  }
}
