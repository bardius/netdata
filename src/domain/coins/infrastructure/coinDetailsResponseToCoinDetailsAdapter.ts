import { AxiosResponseHeaders } from 'axios';
import { GenericObject } from '../../../utils/types';
import { CoinDetails } from '../entities/CoinDetails';
import { stringToDate } from '../../../utils/Date';

const coinDetailsResponseToCoinDetailsAdapter = (
  data: GenericObject,
  headers?: AxiosResponseHeaders,
  meta: { currency: string; locale: string } = { currency: 'USD', locale: 'en' }
): CoinDetails => {
  const ccy = meta.currency.toLowerCase();
  const {
    id,
    name,
    symbol,
    currency,
    description,
    links,
    community_data,
    developer_data,
    sentiment_votes_down_percentage,
    sentiment_votes_up_percentage,
    market_data
  } = data;

  return new CoinDetails(
    id,
    name,
    symbol,
    currency,
    market_data.current_price[ccy],
    description[meta.locale],
    links,
    community_data,
    {
      forks: developer_data.forks,
      stars: developer_data.stars,
      subscribers: developer_data.subscribers,
      issue: developer_data.total_issues
    },
    {
      down_votes: sentiment_votes_down_percentage,
      up_votes: sentiment_votes_up_percentage
    },
    {
      '1_day': market_data.price_change_percentage_24h_in_currency[ccy],
      '7_days': market_data.price_change_percentage_7d_in_currency[ccy],
      '14_days': market_data.price_change_percentage_14d_in_currency[ccy],
      '30_days': market_data.price_change_percentage_30d_in_currency[ccy],
      '60_days': market_data.price_change_percentage_60d_in_currency[ccy],
      '200_days': market_data.price_change_percentage_200d_in_currency[ccy],
      '1_year': market_data.price_change_percentage_1y_in_currency[ccy]
    },
    market_data.high_24h[ccy],
    market_data.low_24h[ccy],
    {
      price: market_data.ath[ccy],
      date: stringToDate({
        datetimeString: market_data.ath_date[ccy],
        formatExp: 'dd/MM/yyyy HH:mm'
      })
    },
    {
      price: market_data.atl[ccy],
      date: stringToDate({
        datetimeString: market_data.atl_date[ccy],
        formatExp: 'dd/MM/yyyy HH:mm'
      })
    }
  );
};

export { coinDetailsResponseToCoinDetailsAdapter };
