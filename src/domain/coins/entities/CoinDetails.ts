import { GenericObject, Nullable } from '../../../utils/types';

export type CoinPriceChange = {
  '1_day': number;
  '7_days': number;
  '14_days': number;
  '30_days': number;
  '60_days': number;
  '200_days': number;
  '1_year': number;
};

export type CoinReputationScore = {
  down_votes: number;
  up_votes: number;
};

export type CoinTimestampedPrice = {
  price: number;
  date: string;
};

export type CoinGithubStats = {
  forks: number;
  stars: number;
  subscribers: number;
  issue: number;
};

class CoinDetails {
  id: string;
  name: string;
  symbol: string;
  currency: string;
  price: number;
  description: string;
  links: GenericObject<Nullable<string | string[] | GenericObject<Nullable<string | string[]>>>>;
  socialMediaStats: GenericObject<Nullable<number>>;
  githubStats: CoinGithubStats;
  reputationScore: CoinReputationScore;
  priceChange: CoinPriceChange;
  lastDayHighPrice: number;
  lastDayLowPrice: number;
  allTimeHighPrice: CoinTimestampedPrice;
  allTimeLowPrice: CoinTimestampedPrice;

  constructor(
    id: string,
    name: string,
    symbol: string,
    currency: string,
    price: number,
    description: string,
    links: GenericObject<Nullable<string | string[]>>,
    socialMediaStats: GenericObject<Nullable<number>>,
    githubStats: CoinGithubStats,
    reputationScore: CoinReputationScore,
    priceChange: CoinPriceChange,
    lastDayHighPrice: number,
    lastDayLowPrice: number,
    allTimeHighPrice: CoinTimestampedPrice,
    allTimeLowPrice: CoinTimestampedPrice
  ) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.currency = currency;
    this.price = price;
    this.description = description;
    this.links = links;
    this.socialMediaStats = socialMediaStats;
    this.githubStats = githubStats;
    this.reputationScore = reputationScore;
    this.priceChange = priceChange;
    this.lastDayHighPrice = lastDayHighPrice;
    this.lastDayLowPrice = lastDayLowPrice;
    this.allTimeHighPrice = allTimeHighPrice;
    this.allTimeLowPrice = allTimeLowPrice;
  }
}

export { CoinDetails };
