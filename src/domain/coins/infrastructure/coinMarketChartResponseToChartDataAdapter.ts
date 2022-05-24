import { GenericObject } from '../../../utils/types';
import { ChartData } from '../entities/ChartData';
import { epochTimeToDateString, stringToDate } from '../../../utils/Date';
import { AxiosResponseHeaders } from 'axios';

const coinMarketChartResponseToChartDataAdapter = (
  data: GenericObject<number[][]>,
  headers?: AxiosResponseHeaders,
  meta: { currency: string; coinMarketId: string } = { currency: 'USD', coinMarketId: 'Coin' }
): ChartData[] => {
  const chartData = data.prices.map((priceItem) => {
    const chartDataItem: ChartData = {
      date: stringToDate({
        datetimeString: epochTimeToDateString(priceItem[0]),
        formatExp: 'dd/MM/yyyy HH:mm'
      })
    };
    chartDataItem[meta.coinMarketId] = priceItem[1];
    return chartDataItem;
  });

  return chartData;
};

export { coinMarketChartResponseToChartDataAdapter };
