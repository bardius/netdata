import { GenericObject } from '../../../utils/types';

export type ChartData = {
  date: string;
} & GenericObject<number | string>;
