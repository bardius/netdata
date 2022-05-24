import { IRequestConfig } from '../entities/IRequestConfig';
import { GenericObject } from '../../../utils/types';
import { objectToHashCode } from '../../../utils/Objects';

/**
 * Generate request identifier key for SWR that is unique for PayloadConfig value as a hash
 */
const requestConfigToCacheKey = (payloadConfig: IRequestConfig | GenericObject): string => {
  // TODO: consider using a lightweight hash lib like https://www.npmjs.com/package/xxhashjs instead
  return objectToHashCode(payloadConfig).toString();
};

export { requestConfigToCacheKey };
