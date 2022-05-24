import { useContext, useEffect, useState, VFC } from 'react';
import { PatternLines } from '@visx/pattern';
import { curveLinear } from '@visx/curve';
import { AxisScaleOutput } from '@visx/axis';
import { coerceNumber, ScaleConfig } from '@visx/scale';
import { DataContext } from '@visx/xychart';
import { getAnimatedOrUnanimatedComponents, userPrefersReducedMotion } from '../utils/Charts';
import { darkTheme } from '../theme/chart';
import { GenericObject } from '../utils/types';
import { formatAmount } from '../utils/Math';
import { ChartData } from '../domain/coins/entities/ChartData';

type XYChartVisualizationProps = {
  data: ChartData[];
  dataAccessorIds: string[];
  YAxisLabel?: string;
  currency?: string;
};

type Accessor = (d: GenericObject) => number | string;

type Accessors = {
  x: GenericObject<Accessor>;
  y: GenericObject<Accessor>;
  date: Accessor;
};

const CustomChartBackground: VFC<any> = () => {
  const patternId = 'xy-chart-pattern';
  const { theme, margin, width, height, innerWidth, innerHeight } = useContext(DataContext);

  // early return values not available in context
  if (width == null || height == null || margin == null || theme == null) return null;

  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
        orientation={['diagonal']}
        stroke={theme?.gridStyles?.stroke}
        strokeWidth={1}
      />
      <rect x={0} y={0} width={width} height={height} fill={theme?.backgroundColor ?? '#fff'} />
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.3}
      />
    </>
  );
};

const TooltipContent: VFC<any> = ({ tooltipData, getScaleColor, accessors, currency }) => {
  return (
    <>
      {(tooltipData?.nearestDatum?.datum && accessors.date(tooltipData?.nearestDatum?.datum)) || 'No date'}
      <br />
      <br />
      {Object.keys(tooltipData?.datumByKey ?? {})
        .filter((accessorID) => accessorID)
        .map((accessorID) => {
          const accessorValue =
            tooltipData?.nearestDatum?.datum && accessors['y'][accessorID](tooltipData?.nearestDatum?.datum);

          return (
            <div key={accessorID}>
              <em
                style={{
                  color: getScaleColor?.(accessorID),
                  textDecoration: tooltipData?.nearestDatum?.key === accessorID ? 'underline' : undefined
                }}>
                {accessorID}
              </em>{' '}
              {accessorValue == null || Number.isNaN(accessorValue)
                ? '–'
                : `${currency ? formatAmount(accessorValue, currency) : accessorValue}`}
            </div>
          );
        })}
    </>
  );
};

const defaultAccessors: Accessors = {
  x: {},
  y: {},
  date: (d) => d.date
};

const getMinMax = (vals: ChartData[], dataAccessorIds: string) => {
  const numericVals = vals.map((val) => coerceNumber(val[dataAccessorIds] as number));
  const maxValue = Math.max(...numericVals);
  return [0, maxValue + maxValue * 0.25];
};

const XYChartVisualization: VFC<XYChartVisualizationProps> = ({ dataAccessorIds, data, YAxisLabel, currency }) => {
  const [accessors, setAccessors] = useState<Accessors>({ ...defaultAccessors });
  const theme = darkTheme; // TODO: Change with chartTheme
  const useAnimatedComponents = !userPrefersReducedMotion();
  const { Axis, LineSeries, Tooltip, XYChart } = getAnimatedOrUnanimatedComponents(useAnimatedComponents);
  const dateScaleConfig: ScaleConfig<AxisScaleOutput, any, any> = { type: 'band' };
  const priceScaleConfig: ScaleConfig<AxisScaleOutput, any, any> = {
    type: 'linear',
    domain: getMinMax(data, dataAccessorIds[0])
  };
  const config = {
    x: dateScaleConfig,
    y: priceScaleConfig
  };

  useEffect(() => {
    const nextAccessors = { ...defaultAccessors };

    dataAccessorIds.forEach((dataAccessorId: string) => {
      nextAccessors.x[dataAccessorId] = (d: any) => d.date;
      nextAccessors.y[dataAccessorId] = (d: any) => d[dataAccessorId];
    });

    setAccessors(nextAccessors);
  }, [dataAccessorIds, setAccessors]);

  return (
    <XYChart theme={theme} xScale={config.x} yScale={config.y} height={400}>
      <CustomChartBackground />
      {dataAccessorIds.map((dataAccessorId) => {
        return (
          <LineSeries
            key={dataAccessorId}
            dataKey={dataAccessorId}
            data={data}
            xAccessor={(accessors.x as any)[dataAccessorId]}
            yAccessor={(accessors.y as any)[dataAccessorId]}
            curve={curveLinear}
          />
        );
      })}
      <Axis key={`time-axis-min`} orientation={'bottom'} numTicks={5} animationTrajectory={'min'} />
      <Axis
        label={YAxisLabel}
        labelOffset={20}
        key={`price-axis-min`}
        orientation={'left'}
        numTicks={10}
        animationTrajectory={'min'}
      />
      <Tooltip
        showHorizontalCrosshair={false}
        showVerticalCrosshair={true}
        snapTooltipToDatumX={true}
        snapTooltipToDatumY={true}
        renderTooltip={({ tooltipData, colorScale }) => (
          <TooltipContent
            tooltipData={tooltipData}
            getScaleColor={colorScale}
            accessors={accessors}
            currency={currency}
          />
        )}
      />
    </XYChart>
  );
};

export { XYChartVisualization };
