import * as R from 'ramda';

const isDefined = (value?: any): boolean => {
  return !R.isNil(value) && value !== undefined;
};

const isFunction = (value: any): boolean => {
  return isDefined(value) && typeof value === 'function';
};

const isString = (value: any): boolean => {
  return isDefined(value) && typeof value === 'string';
};

const isEmpty = (value?: any): boolean => {
  return R.isNil(value) || R.isEmpty(value);
};

export { isDefined, isFunction, isString, isEmpty };
