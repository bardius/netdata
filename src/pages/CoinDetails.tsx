import React, { useCallback, useEffect, VFC } from 'react';
import { Box, CircularProgress, IconButton, makeStyles } from '@material-ui/core';
import {
  useCoinDetailsData,
  useCoinDetailsDataError,
  useCoinsService,
  useIsLoadingCoinDetails,
  useSetSelectedCoinMarketId
} from '../contexts/coins/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';
import { CoinCard } from '../components/CoinCard';

const useStyles = makeStyles(({ spacing }) => ({
  alert: {
    width: '100%'
  }
}));

export const CoinDetails: VFC = () => {
  const styles = useStyles();
  const { coinMarketId: coinMarketIdFromUrl } = useParams();
  const navigate = useNavigate();
  const setSelectedCoinMarketId = useSetSelectedCoinMarketId();
  const coinDetails = useCoinDetailsData();
  const coinDetailsError = useCoinDetailsDataError();
  const coinDetailsIsLoading = useIsLoadingCoinDetails();
  const coinsService = useCoinsService();

  useEffect(() => {
    setSelectedCoinMarketId(coinMarketIdFromUrl);
  }, [coinMarketIdFromUrl, setSelectedCoinMarketId]);

  const onBackBtnClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Box
      my={4}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      display={'flex'}>
      <Box display={'flex'} alignSelf={'flex-start'}>
        <IconButton aria-label='Back to list' onClick={onBackBtnClick}>
          <ArrowBack />
        </IconButton>
      </Box>

      {coinDetailsError && (
        <Alert className={styles.alert} severity='error'>
          <AlertTitle>Error</AlertTitle>
          {coinDetailsError.message}
        </Alert>
      )}
      {coinDetailsIsLoading && (
        <Box py={'100px'}>
          <CircularProgress />
        </Box>
      )}

      {coinDetails && (
        <CoinCard
          id={coinDetails.id}
          name={coinDetails.name}
          symbol={coinDetails.symbol}
          price={coinDetails.price}
          highestPrice={coinDetails.lastDayHighPrice}
          lowerPrice={coinDetails.lastDayLowPrice}
          priceChange={coinDetails.priceChange['1_day']}
          isListItem={false}
          details={coinDetails}
          chartService={coinsService}
        />
      )}
    </Box>
  );
};

export default CoinDetails;
