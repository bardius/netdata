import * as R from 'ramda';
import axios, { AxiosRequestConfig, AxiosRequestTransformer, AxiosResponseTransformer } from 'axios';
import { IRequestConfig } from '../entities/IRequestConfig';

const REQUEST_TIMEOUT = 10 * 1000 * 60; // 600 seconds

/**
 * Factory to generate Axios request configuration based on provided endpoint details configuration
 */
class AxiosRequestObjectFactory {
  static createRequestObject = <T>(requestConfig: IRequestConfig<T>): AxiosRequestConfig => {
    const defaultRequestObject: AxiosRequestConfig = {
      withCredentials: true,
      headers: R.mergeRight(axios.defaults.headers.common, {
        'Content-Type': 'application/json;charset=UTF-8'
      }),
      params: requestConfig.params || {},
      data: requestConfig.data,
      url: requestConfig.url || window.location.origin,
      timeout: REQUEST_TIMEOUT
    };

    const hasPostData = requestConfig.hasOwnProperty('data') && typeof requestConfig.data !== 'undefined';

    // Instantiate Axios request object
    const requestObject = { ...defaultRequestObject };
    requestObject.timeout = requestConfig.timeout || requestObject.timeout;
    requestObject.method = requestConfig.method || (hasPostData ? 'post' : 'get');
    requestObject.headers = R.mergeRight(defaultRequestObject.headers || {}, requestConfig.headers || {});
    requestObject.params = R.mergeRight(defaultRequestObject.params, requestConfig.params || {});
    requestObject.withCredentials =
      typeof requestConfig.withCredentials !== 'undefined'
        ? requestConfig.withCredentials
        : defaultRequestObject.withCredentials;

    if (typeof requestConfig.transformResponse === 'function') {
      requestObject.transformResponse = ([] as AxiosResponseTransformer[]).concat(
        axios.defaults.transformResponse as AxiosResponseTransformer,
        requestConfig.transformResponse
      );
    }

    if (typeof requestConfig.transformRequest === 'function') {
      requestObject.transformRequest = ([] as AxiosRequestTransformer[]).concat(
        axios.defaults.transformRequest as AxiosRequestTransformer,
        requestConfig.transformRequest
      );
    }

    // Remove empty query params
    if (R.isNil(requestObject.params) || R.isEmpty(requestObject.params)) {
      delete requestObject.params;
    }

    // Attach the data to be the request
    if (hasPostData) {
      requestObject.data = requestConfig.data;
    }

    // Attach specific type if any
    if (requestConfig.responseType) {
      requestObject.responseType = requestConfig.responseType;
    }

    const rawResponseDataTransformer = <T = any>(data: T): T => {
      return data;
    };

    // No transform is specifically requested text/plain as the axios default transform returns
    // JSON object from string response data
    if (requestObject.headers && (requestObject.headers['Content-Type'] as string).includes('plain/text')) {
      requestObject.transformResponse = ([] as AxiosResponseTransformer[]).concat(
        requestConfig.transformResponse || rawResponseDataTransformer
      );
    }

    return requestObject;
  };
}

export { AxiosRequestObjectFactory };
