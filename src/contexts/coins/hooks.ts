import { useContext, useContextSelector } from 'use-context-selector';
import { CoinsProviderState } from './types';
import { CoinsContext } from './CoinsContext';
import { CoinMarket } from '../../domain/coins/entities/CoinMarket';
import { Nullable } from '../../utils/types';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { CoinDetails } from '../../domain/coins/entities/CoinDetails';
import { ICoinsService } from '../../domain/coins/entities/ICoinsService';

const useCitiesState = (): CoinsProviderState => {
  const context = useContext(CoinsContext);

  if (context === undefined) {
    throw new Error('CoinsContext must be used within CoinsProvider');
  }

  return context;
};

const useCoinMarketsData = (): Nullable<CoinMarket[]> | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.coinMarketsData);

  return contextSlice;
};

const useCoinMarketsDataError = (): AxiosError<CoinMarket[]> | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.coinMarketsDataError);

  return contextSlice;
};

const useIsLoadingCoinMarkets = (): boolean | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.isLoadingCoinMarkets);

  return contextSlice;
};

const useSetCurrentCoinMarketsDataPage = (): Dispatch<SetStateAction<number>> => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.setCurrentCoinMarketsDataPage);

  return contextSlice;
};

const useCurrentCoinMarketsDataPage = (): number => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.currentCoinMarketsDataPage);

  return contextSlice;
};

const useTotalCoinMarketsDataPages = (): number => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.totalCoinMarketsDataPages);

  return contextSlice;
};

const useCoinDetailsData = (): Nullable<CoinDetails> | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.coinDetailsData);

  return contextSlice;
};

const useCoinDetailsDataError = (): AxiosError<CoinDetails> | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.coinDetailsDataError);

  return contextSlice;
};

const useIsLoadingCoinDetails = (): boolean | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.isLoadingCoinDetails);

  return contextSlice;
};

const useSetSelectedCoinMarketId = (): Dispatch<SetStateAction<string | undefined>> => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.setSelectedCoinMarketId);

  return contextSlice;
};

const useCoinsService = (): ICoinsService | undefined => {
  const contextSlice = useContextSelector(CoinsContext, (state) => state.coinsService);

  return contextSlice;
};

export {
  useCitiesState,
  useCoinMarketsData,
  useCoinMarketsDataError,
  useIsLoadingCoinMarkets,
  useSetCurrentCoinMarketsDataPage,
  useCurrentCoinMarketsDataPage,
  useTotalCoinMarketsDataPages,
  useCoinDetailsData,
  useCoinDetailsDataError,
  useIsLoadingCoinDetails,
  useSetSelectedCoinMarketId,
  useCoinsService
};
