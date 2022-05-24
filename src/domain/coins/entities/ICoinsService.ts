import { CoinMarket } from './CoinMarket';
import { CoinDetails } from './CoinDetails';
import { ChartData } from './ChartData';

export type GetCoinMarketsParams = {
  currentPage: number;
  totalPageItems?: number;
  currency?: string;
};

export type GetCoinDetailsParams = {
  id: string;
  currency?: string;
};

export type GetCoinMarketChartParams = {
  id: string;
  currency?: string;
  days: 1 | 14 | 30 | 90 | 365 | 'max';
  interval?: 'daily';
};

export interface ICoinsService {
  GetCoinMarkets(params: GetCoinMarketsParams): Promise<CoinMarket[]>;
  GetCoinDetails(params: GetCoinDetailsParams): Promise<CoinDetails>;
  GetCoinMarketChart(params: GetCoinMarketChartParams): Promise<ChartData[]>;
}
