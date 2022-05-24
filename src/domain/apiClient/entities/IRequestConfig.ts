import {
  AxiosError,
  AxiosRequestTransformer,
  AxiosResponse,
  AxiosResponseHeaders,
  AxiosResponseTransformer,
  Method,
  ResponseType
} from 'axios';
import { GenericObject } from '../../../utils/types';

export interface SuccessCallback<T = any> {
  (data?: T): void;
}

export interface ErrorCallback<T = any> {
  (error?: T): void;
}

export interface ResponseDataAdapter<T = any> {
  (data: any, headers?: AxiosResponseHeaders, meta?: any): T;
}

export interface IRequestConfig<T = any> {
  dynamicPath?: any;
  headers?: GenericObject;
  params?: GenericObject;
  data?: GenericObject | string | number | any;
  nextCallback?: SuccessCallback<AxiosResponse<T>>;
  onErrorCallback?: ErrorCallback<AxiosError<T>>;
  dataAdapter?: ResponseDataAdapter<T>;
  url?: string;
  method?: Method | string;
  timeout?: number;
  withCredentials?: boolean;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  responseType?: ResponseType;
  meta?: any;
}
