import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosRequestObjectFactory } from './AxiosRequestObjectFactory';
import { IRequestConfig } from '../entities/IRequestConfig';
import { Nullable } from '../../../utils/types';
import { isFunction } from '../../../utils/Assertions';

/*
 * Implementation of HTTP Client on top of axios to standardize how request, response and errors are handled
 */
class AxiosClientImpl {
  // Perform the request
  static doRequest = async <T = any>(requestConfig: IRequestConfig) => {
    const axiosConfig: Nullable<AxiosRequestConfig> = AxiosRequestObjectFactory.createRequestObject(requestConfig);

    // request success handler
    const onAxiosSuccess = (response: AxiosResponse): T => {
      // apply any response data transformation if provided
      if (isFunction(requestConfig.dataAdapter)) {
        response.data = (requestConfig.dataAdapter as Function)(response.data, response.headers, requestConfig.meta);
      }

      // if a chained callback exists, invoke after success is dispatched on next tick to avoid race conditions
      if (isFunction(requestConfig.nextCallback)) {
        setTimeout(
          (successResponse: AxiosResponse<T>) =>
            (requestConfig.nextCallback as Function)(successResponse, successResponse.headers),
          1,
          response
        );
      }

      return response.data;
    };

    // request error handler
    const onAxiosError = (error: AxiosError) => {
      if (isFunction(requestConfig.onErrorCallback)) {
        setTimeout((axiosError) => (requestConfig as any).onErrorCallback(axiosError), 1, error);
      }

      throw error;
    };

    try {
      const apiResponse = await axios.request(axiosConfig);
      return onAxiosSuccess(apiResponse);
    } catch (e) {
      return onAxiosError(e as AxiosError);
    }
  };
}

export { AxiosClientImpl };
