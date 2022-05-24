import { AxiosError } from 'axios';
import { KeyedMutator } from 'swr';

export type DataServiceResponse<T> = {
  data?: T;
  error?: AxiosError<T>;
  mutate?: KeyedMutator<T>;
  isLoading: boolean;
  isValidating?: boolean;
};
