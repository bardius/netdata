export type Nullable<T = any> = T | null;

export type GenericObject<T = any> = {
  [key: string]: T;
};
