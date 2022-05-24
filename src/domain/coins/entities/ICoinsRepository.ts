import { CoinMarket } from './CoinMarket';
import { CoinDetails } from './CoinDetails';
import { ChartData } from './ChartData';

export interface ICoinsRepository {
  GetCoinMarkets(
    page: number,
    per_page?: number,
    vs_currency?: string,
    order?: string,
    price_change_percentage?: string,
    sparkline?: boolean,
    category?: string,
    ids?: string
  ): Promise<CoinMarket[]>;
  GetCoinDetails(
    id: string,
    currency?: string,
    locale?: string,
    localization?: boolean,
    tickers?: boolean,
    market_data?: boolean,
    community_data?: boolean,
    developer_data?: boolean,
    sparkline?: boolean
  ): Promise<CoinDetails>;
  GetCoinMarketChart(
    id: string,
    days?: 1 | 14 | 30 | 90 | 365 | 'max',
    currency?: string,
    interval?: 'daily'
  ): Promise<ChartData[]>;
}
