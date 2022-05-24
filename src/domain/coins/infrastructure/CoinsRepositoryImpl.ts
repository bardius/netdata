import { ICoinsRepository } from '../entities/ICoinsRepository';
import { CoinMarket } from '../entities/CoinMarket';
import { axiosDataFetcher } from '../../apiClient/usecases/DataServiceFetchers';
import { CoinDetails } from '../entities/CoinDetails';
import { coinDetailsResponseToCoinDetailsAdapter } from './coinDetailsResponseToCoinDetailsAdapter';
import { coinMarketChartResponseToChartDataAdapter } from './coinMarketChartResponseToChartDataAdapter';
import { ChartData } from '../entities/ChartData';

// All requests are proxied via webpack server to avoid CORS, environments will need proxy or discovery service with CORS enabled
const COIN_GECKO_HOST = '';

class CoinsRepositoryImpl implements ICoinsRepository {
  constructor() {
    this.GetCoinMarkets = this.GetCoinMarkets.bind(this);
    this.GetCoinDetails = this.GetCoinDetails.bind(this);
    this.GetCoinMarketChart = this.GetCoinMarketChart.bind(this);
  }

  GetCoinMarkets(
    page: number,
    per_page: number = 10,
    vs_currency: string = 'usd',
    order: string = 'market_cap_desc',
    price_change_percentage: string = '24h',
    sparkline: boolean = false,
    category?: string,
    ids?: string
  ): Promise<CoinMarket[]> {
    return axiosDataFetcher({
      url: `${COIN_GECKO_HOST}/coins/markets`,
      params: {
        vs_currency: vs_currency,
        order: order,
        per_page: per_page,
        page: page,
        price_change_percentage: price_change_percentage,
        sparkline: sparkline,
        ids: category,
        category: ids
      }
    });
  }

  GetCoinDetails(
    id: string,
    currency: string = 'USD',
    locale: string = 'en',
    localization: boolean = false,
    tickers?: boolean,
    market_data?: boolean,
    community_data?: boolean,
    developer_data?: boolean,
    sparkline?: boolean
  ): Promise<CoinDetails> {
    return axiosDataFetcher({
      url: `${COIN_GECKO_HOST}/coins/${id}`,
      params: {
        localization: localization,
        tickers: tickers,
        market_data: market_data,
        community_data: community_data,
        developer_data: developer_data,
        sparkline: sparkline
      },
      meta: {
        currency: currency,
        locale: locale
      },
      dataAdapter: coinDetailsResponseToCoinDetailsAdapter
    });
  }

  GetCoinMarketChart(
    id: string,
    days: 1 | 14 | 30 | 90 | 365 | 'max' = 1,
    currency: string = 'USD',
    interval?: 'daily'
  ): Promise<ChartData[]> {
    return axiosDataFetcher({
      url: `${COIN_GECKO_HOST}/coins/${id}/market_chart`,
      params: {
        vs_currency: currency,
        days: days,
        interval: interval
      },
      meta: {
        coinMarketId: id,
        currency: currency
      },
      dataAdapter: coinMarketChartResponseToChartDataAdapter
    });
  }
}

export { CoinsRepositoryImpl };
