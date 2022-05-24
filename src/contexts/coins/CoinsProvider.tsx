import type { FC } from 'react';
import { CoinsContext } from './CoinsContext';
import { POLLING_INTERVAL, useInvokeSWRService } from '../../domain/apiClient/usecases/hooks';
import { CoinMarket } from '../../domain/coins/entities/CoinMarket';
import { CoinsServiceImpl } from '../../domain/coins/usecases/CoinsServiceImpl';
import { CoinsRepositoryImpl } from '../../domain/coins/infrastructure/CoinsRepositoryImpl';
import { useState } from 'react';
import { CoinDetails } from '../../domain/coins/entities/CoinDetails';

// We can pass the coinsService as prop in order to allow dependency injection
const coinsRepository = new CoinsRepositoryImpl();
const coinsService = new CoinsServiceImpl(coinsRepository);

const CoinsProvider: FC = ({ children }) => {
  const [selectedCoinMarketId, setSelectedCoinMarketId] = useState<string | undefined>();
  const [currentCoinMarketsDataPage, setCurrentCoinMarketsDataPage] = useState(1);
  // TODO: total pages should be retrieved from the api and updated in state on change via useEffect
  const totalCoinMarketsDataPages = 10;

  // Define queries/mutations
  const {
    data: coinMarketsData,
    error: coinMarketsDataError,
    isLoading: isLoadingCoinMarkets
  } = useInvokeSWRService<CoinMarket[]>(
    coinsService.GetCoinMarkets,
    {
      currentPage: currentCoinMarketsDataPage
    },
    !Boolean(selectedCoinMarketId),
    { refreshInterval: POLLING_INTERVAL }
  );

  const {
    data: coinDetailsData,
    error: coinDetailsDataError,
    isLoading: isLoadingCoinDetails
  } = useInvokeSWRService<CoinDetails>(
    coinsService.GetCoinDetails,
    {
      id: selectedCoinMarketId
    },
    Boolean(selectedCoinMarketId),
    { refreshInterval: POLLING_INTERVAL }
  );

  // Expose values via the provider state
  const stateValues = {
    coinMarketsData: coinMarketsData,
    coinMarketsDataError: coinMarketsDataError,
    isLoadingCoinMarkets: isLoadingCoinMarkets,
    setCurrentCoinMarketsDataPage: setCurrentCoinMarketsDataPage,
    currentCoinMarketsDataPage: currentCoinMarketsDataPage,
    totalCoinMarketsDataPages: totalCoinMarketsDataPages,
    coinDetailsData: coinDetailsData,
    coinDetailsDataError: coinDetailsDataError,
    isLoadingCoinDetails: isLoadingCoinDetails,
    setSelectedCoinMarketId: setSelectedCoinMarketId,
    coinsService: coinsService
  };

  return <CoinsContext.Provider value={stateValues}>{children}</CoinsContext.Provider>;
};

export { CoinsProvider };
