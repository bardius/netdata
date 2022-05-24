import { Nullable } from '../../utils/types';
import { CoinMarket } from '../../domain/coins/entities/CoinMarket';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { CoinDetails } from '../../domain/coins/entities/CoinDetails';
import { ICoinsService } from '../../domain/coins/entities/ICoinsService';

export type CoinsProviderState = {
  coinMarketsData?: Nullable<CoinMarket[]>;
  coinMarketsDataError?: AxiosError<CoinMarket[]>;
  isLoadingCoinMarkets?: boolean;
  currentCoinMarketsDataPage: number;
  totalCoinMarketsDataPages: number;
  setCurrentCoinMarketsDataPage: Dispatch<SetStateAction<number>>;
  coinDetailsData?: Nullable<CoinDetails>;
  coinDetailsDataError?: AxiosError<CoinDetails>;
  isLoadingCoinDetails?: boolean;
  setSelectedCoinMarketId: Dispatch<SetStateAction<string | undefined>>;
  coinsService?: ICoinsService;
};
