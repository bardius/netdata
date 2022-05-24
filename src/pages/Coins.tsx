import { ChangeEvent, useCallback, useEffect, VFC } from 'react';
import { Alert, AlertTitle, Pagination } from '@material-ui/lab';
import {
  useCoinMarketsData,
  useCoinMarketsDataError,
  useIsLoadingCoinMarkets,
  useCurrentCoinMarketsDataPage,
  useSetCurrentCoinMarketsDataPage,
  useTotalCoinMarketsDataPages,
  useSetSelectedCoinMarketId
} from '../contexts/coins/hooks';
import { CoinMarketList } from '../components/CoinMarketList';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  alert: {
    width: '100%'
  }
}));

export const Coins: VFC = () => {
  const styles = useStyles();
  const setSelectedCoinMarketId = useSetSelectedCoinMarketId();
  const coinMarkets = useCoinMarketsData();
  const coinMarketsError = useCoinMarketsDataError();
  const coinMarketsIsLoading = useIsLoadingCoinMarkets();
  const currentCoinMarketsDataPage = useCurrentCoinMarketsDataPage();
  const setCurrentCoinMarketsDataPage = useSetCurrentCoinMarketsDataPage();
  const totalCoinMarketsDataPages = useTotalCoinMarketsDataPages();

  useEffect(() => {
    setSelectedCoinMarketId(undefined);
  }, [setSelectedCoinMarketId]);

  const navigateToCoinMarketsPage = useCallback(
    (event: ChangeEvent<unknown>, selectedPage: number) => {
      setCurrentCoinMarketsDataPage(Math.max(selectedPage, 1));
    },
    [setCurrentCoinMarketsDataPage]
  );

  return (
    <Box
      my={4}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      display={'flex'}>
      <Pagination
        count={totalCoinMarketsDataPages}
        page={currentCoinMarketsDataPage}
        siblingCount={0}
        color='secondary'
        size='large'
        onChange={navigateToCoinMarketsPage}
        data-testid={'coin-list-pagination'}
      />
      {coinMarketsError && (
        <Alert className={styles.alert} severity='error'>
          <AlertTitle>Error</AlertTitle>
          {coinMarketsError.message}
        </Alert>
      )}
      {coinMarketsIsLoading && (
        <Box py={'100px'}>
          <CircularProgress />
        </Box>
      )}
      <CoinMarketList coins={coinMarkets} />
    </Box>
  );
};
