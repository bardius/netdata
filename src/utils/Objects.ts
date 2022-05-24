import { stringToHashCode } from './String';
import { GenericObject } from './types';

/**
 * Generate a hash from an object
 */
const objectToHashCode = (objValue: GenericObject): number => {
  return stringToHashCode(JSON.stringify(objValue));
};

export { objectToHashCode };
