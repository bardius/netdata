import React, { useCallback } from 'react';
import type { VFC } from 'react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { formatAmount } from '../utils/Math';
import { CoinDetails } from '../domain/coins/entities/CoinDetails';
import { Nullable } from '../utils/types';
import { CoinDetailsCard } from './CoinDetailsCard';
import { PriceChartCard } from './PriceChartCard';
import { ICoinsService } from '../domain/coins/entities/ICoinsService';

export type CoinMarketListItemProps = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  highestPrice: number;
  lowerPrice: number;
  priceChange: number;
  isListItem?: boolean;
  details?: Nullable<CoinDetails>;
  chartService?: ICoinsService;
};

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    width: '100%',
    margin: spacing(1, 0)
  },
  content: {
    padding: spacing(0, 3)
  },
  symbol: {
    fontSize: '0.7rem'
  },
  divider: {
    marginBottom: spacing(1)
  }
}));

const CoinCard: VFC<CoinMarketListItemProps> = ({
  id,
  symbol,
  name,
  price,
  highestPrice,
  lowerPrice,
  priceChange,
  isListItem = true,
  details,
  chartService
}) => {
  const theme = useTheme();
  const styles = useStyles();
  const mediaDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const onSelectCoinMarketItem = useCallback(() => {
    navigate(`coin/${id}/details`);
  }, [id, navigate]);

  return (
    <Card component={isListItem ? 'li' : 'div'} className={styles.card} data-testid={'coin-card'}>
      <Grid container alignItems='center'>
        <Grid item xs={12} md>
          <CardActionArea
            disabled={!isListItem}
            onClick={onSelectCoinMarketItem}
            className={styles.content}
            title={isListItem ? `See details for ${name}` : name}>
            <CardContent component='span'>
              <Grid container alignItems='center' spacing={2} component='span'>
                <Grid item xs='auto' md={4} component='span'>
                  <Grid container alignItems='center' spacing={2} component='span' wrap='nowrap'>
                    <Avatar>
                      <Typography component={'span'} variant={'subtitle2'} className={styles.symbol}>
                        {symbol.toUpperCase()}
                      </Typography>
                    </Avatar>
                    <Grid item xs='auto' component='span'>
                      <Typography noWrap component='span' variant='h6' color='textPrimary'>
                        {name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs component='span'>
                  <Grid container alignItems='flex-end' direction='column' component='span'>
                    <Grid item xs='auto' component='span'>
                      <Typography noWrap component='span' variant='subtitle1' color='textPrimary'>
                        Price: {price ? formatAmount(price, 'USD') : '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs='auto' component='span'>
                      <Typography noWrap component='span' variant='body2' color='textSecondary'>
                        Change: {priceChange ? formatAmount(priceChange, 'USD') : '-'}
                        {!mediaDownSm && ` (${formatAmount(highestPrice, 'USD')} - ${formatAmount(lowerPrice, 'USD')})`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          {details && (
            <>
              <Divider className={styles.divider} />
              {chartService && (
                <>
                  <PriceChartCard id={details.id} chartService={chartService.GetCoinMarketChart} />
                  <Divider className={styles.divider} />
                </>
              )}
              <CoinDetailsCard details={details} />
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export { CoinCard };
