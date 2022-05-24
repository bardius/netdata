import { CoinMarket } from '../entities/CoinMarket';
import {
  GetCoinDetailsParams,
  GetCoinMarketChartParams,
  GetCoinMarketsParams,
  ICoinsService
} from '../entities/ICoinsService';
import { ICoinsRepository } from '../entities/ICoinsRepository';
import { CoinDetails } from '../entities/CoinDetails';
import { ChartData } from '../entities/ChartData';

export class CoinsServiceImpl implements ICoinsService {
  itemRepo: ICoinsRepository;

  constructor(ir: ICoinsRepository) {
    this.itemRepo = ir;

    this.GetCoinMarkets = this.GetCoinMarkets.bind(this);
    this.GetCoinDetails = this.GetCoinDetails.bind(this);
    this.GetCoinMarketChart = this.GetCoinMarketChart.bind(this);
  }

  GetCoinMarkets(params: GetCoinMarketsParams): Promise<CoinMarket[]> {
    return this.itemRepo.GetCoinMarkets(params.currentPage);
  }

  GetCoinDetails(params: GetCoinDetailsParams): Promise<CoinDetails> {
    return this.itemRepo.GetCoinDetails(params.id, params.currency);
  }

  GetCoinMarketChart(params: GetCoinMarketChartParams): Promise<ChartData[]> {
    return this.itemRepo.GetCoinMarketChart(params.id, params.days, params.currency);
  }
}
