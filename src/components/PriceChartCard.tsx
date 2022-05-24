import { Box, CardContent, CircularProgress, makeStyles, Slider, Typography } from '@material-ui/core';
import React, { ChangeEvent, useCallback, useState, VFC } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { POLLING_INTERVAL, useInvokeSWRService } from '../domain/apiClient/usecases/hooks';
import { XYChartVisualization } from './XYChartVisualization';
import { ChartData } from '../domain/coins/entities/ChartData';
import { formatAmount } from '../utils/Math';

export type PriceChartCardProps = {
  id: string;
  chartService?: (params: any) => Promise<any>;
};

const useStyles = makeStyles(({ spacing }) => ({
  chartCard: {
    padding: spacing(3)
  },
  list: {
    listStyle: 'none'
  },
  alert: {
    width: '100%'
  }
}));

const PriceChartCard: VFC<PriceChartCardProps> = ({ id, chartService }) => {
  const styles = useStyles();
  const [duration, setDuration] = useState<1 | 14 | 30 | 90 | 365 | 'max'>(30);
  const currency = 'USD';

  const {
    data: chartData,
    error: chartDataError,
    isLoading: chartDataIsLoading
  } = useInvokeSWRService<ChartData[]>(
    chartService as (params: any) => Promise<any>,
    {
      id: id,
      days: duration
    },
    Boolean(id) && Boolean(chartService),
    { refreshInterval: POLLING_INTERVAL }
  );

  const sliderValueToDuration = (sliderValue: number): 1 | 14 | 30 | 90 | 365 | 'max' => {
    switch (sliderValue) {
      case 1:
        return 1;
      case 10:
        return 14;
      case 20:
        return 30;
      case 40:
        return 90;
      case 80:
        return 365;
      default:
        return 'max';
    }
  };

  const onDurationChange = useCallback((event: ChangeEvent<{}>, value: number | number[]) => {
    setDuration(sliderValueToDuration(value as number));
  }, []);

  return (
    <CardContent className={styles.chartCard} data-testid={'price-chart-card'}>
      <Box
        justifyContent={'center'}
        alignContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        display={'flex'}>
        <Typography variant={'h6'} id='discrete-slider-restrict' gutterBottom>
          Historical price ({duration} days)
        </Typography>
        <Box mb={3} px={2} width={'100%'}>
          <Slider
            defaultValue={20}
            scale={(x) => sliderValueToDuration(x) as any}
            onChange={onDurationChange}
            aria-labelledby='discrete-slider-restrict'
            step={null}
            valueLabelDisplay='auto'
            marks={[
              { value: 1, label: 'Last Day' },
              { value: 10, label: '2 weeks' },
              { value: 20, label: '30 Days' },
              { value: 40, label: '90 Days' },
              { value: 80, label: 'Year' },
              { value: 100, label: 'All' }
            ]}
          />
        </Box>
        {chartDataError && (
          <Alert className={styles.alert} severity='error'>
            <AlertTitle>Error</AlertTitle>
            {chartDataError.message}
          </Alert>
        )}
        {chartDataIsLoading && (
          <Box py={'100px'}>
            <CircularProgress />
          </Box>
        )}
      </Box>
      {chartData && (
        <>
          <XYChartVisualization
            YAxisLabel={`Price (${currency})`}
            currency={currency}
            data={chartData}
            dataAccessorIds={[id]}
          />

          <Typography component='h6' variant={'srOnly'}>
            Historical price data for {duration} day/s
          </Typography>
          {chartData.map((chartDataItem) => {
            return (
              <Typography variant={'srOnly'} component={'p'} key={chartDataItem.date}>
                Price on {chartDataItem.date} was {formatAmount(chartDataItem[id] as number, currency)}
              </Typography>
            );
          })}
        </>
      )}
    </CardContent>
  );
};

export { PriceChartCard };
