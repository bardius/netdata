import useSWR, { SWRConfiguration } from 'swr';
import { GenericObject } from '../../../utils/types';
import { DataServiceResponse } from '../entities/DataServiceResponse';
import { swrResponseToDataServiceResponseAdapter } from '../infrastructure/swrResponseToDataServiceResponseAdapter';
import { requestConfigToCacheKey } from '../infrastructure/requestConfigToCacheKeyAdapter';

const POLLING_INTERVAL = 60 * 1000;
const DEFAULT_SWR_CONFIG: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount: 0
};

/**
 * Hook to initiate swr service request
 */
const useInvokeSWRService = <T = any>(
  fetcher: (...args: any) => Promise<T>,
  data?: GenericObject,
  shouldFetch: boolean = true,
  swrConfig?: SWRConfiguration
): DataServiceResponse<T> => {
  const swrResponse = useSWR(
    !shouldFetch ? null : requestConfigToCacheKey({ data: data, fetcherName: fetcher.name }),
    () => fetcher(data),
    swrConfig || DEFAULT_SWR_CONFIG
  );

  return swrResponseToDataServiceResponseAdapter(swrResponse, shouldFetch);
};

export { useInvokeSWRService, POLLING_INTERVAL, DEFAULT_SWR_CONFIG };
