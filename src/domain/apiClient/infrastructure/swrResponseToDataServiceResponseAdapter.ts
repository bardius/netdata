import { SWRResponse } from 'swr';
import { DataServiceResponse } from '../entities/DataServiceResponse';

/**
 * Generate DataServiceHookResponse object from swr response
 */
const swrResponseToDataServiceResponseAdapter = <T = any>(
  swrResponse: SWRResponse<T>,
  shouldFetch?: boolean
): DataServiceResponse<T> => {
  return {
    data: swrResponse.data,
    error: swrResponse.error,
    isLoading: !swrResponse.error && !swrResponse.data && Boolean(shouldFetch),
    isValidating: swrResponse.isValidating,
    mutate: swrResponse.mutate
  };
};

export { swrResponseToDataServiceResponseAdapter };
