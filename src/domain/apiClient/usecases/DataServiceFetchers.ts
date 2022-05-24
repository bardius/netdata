import { AxiosClientImpl } from '../infrastructure/AxiosClientImpl';
import { IRequestConfig } from '../entities/IRequestConfig';

/**
 * Fetcher to invoke the axios client
 */
const axiosDataFetcher = <T = any>(requestConfig: IRequestConfig<T>): Promise<T> => {
  return AxiosClientImpl.doRequest<T>(requestConfig);
};

export { axiosDataFetcher };
