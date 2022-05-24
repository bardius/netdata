import type { CoinsProviderState } from './types';

const defaultProviderState: CoinsProviderState = {
  setCurrentCoinMarketsDataPage: () => {},
  setSelectedCoinMarketId: () => {},
  currentCoinMarketsDataPage: 1,
  totalCoinMarketsDataPages: 1
};

export { defaultProviderState };
