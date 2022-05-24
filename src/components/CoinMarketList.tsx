import React from 'react';
import type { VFC } from 'react';
import { CoinMarket } from '../domain/coins/entities/CoinMarket';
import { Box, makeStyles } from '@material-ui/core';
import { CoinCard } from './CoinCard';
import { Nullable } from '../utils/types';

export type CoinMarketProps = {
  coins?: Nullable<CoinMarket[]>;
};

const useStyles = makeStyles(() => ({
  list: {
    listStyle: 'none'
  }
}));

const CoinMarketList: VFC<CoinMarketProps> = ({ coins }) => {
  const styles = useStyles();

  return (
    <>
      {coins?.length === 0 && <p data-testid={'coin-list-empty'}>No results</p>}

      {coins && coins.length > 0 && (
        <Box component='ul' className={styles.list} width={'100%'} my={4} p={0} data-testid={'coin-list'}>
          {coins.map((coin) => {
            return (
              <CoinCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                highestPrice={coin.high_24h}
                lowerPrice={coin.low_24h}
                priceChange={coin.price_change_24h}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export { CoinMarketList };
