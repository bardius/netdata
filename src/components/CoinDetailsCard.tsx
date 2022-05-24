import React, { VFC } from 'react';
import { Box, CardContent, makeStyles, Typography } from '@material-ui/core';
import { CoinDetails } from '../domain/coins/entities/CoinDetails';
import { InfoList } from './InfoList';

export type CoinDetailsCardProps = {
  details: CoinDetails;
};

const useStyles = makeStyles(({ spacing }) => ({
  detailsCard: {
    padding: spacing(3)
  }
}));

// TODO: use a library to render description as dangerouslySetInnerHTML is a security vulnerability
// TODO: create proper presentational component per detail content type
const CoinDetailsCard: VFC<CoinDetailsCardProps> = ({ details }) => {
  const styles = useStyles();

  return (
    <CardContent className={styles.detailsCard} data-testid={'coin-details-card'}>
      {details.description && (
        <Box mb={2}>
          <Typography variant={'h6'}>Description</Typography>
          <Typography variant={'body2'} dangerouslySetInnerHTML={{ __html: details.description }} />
        </Box>
      )}
      <InfoList listPairs={details.links} title={'Contact & Social Media Links'} />
      <InfoList listPairs={details.socialMediaStats} title={'Social Media Stats'} />
      <InfoList listPairs={details.githubStats} title={'Github Stats'} />
      <InfoList listPairs={details.reputationScore} title={'Reputation'} isPercentages={true} />
      <InfoList listPairs={details.priceChange} title={'Price Change'} isPercentages={true} />
      <InfoList listPairs={{ price: details.lastDayLowPrice }} currency='USD' title={'Last Day Low Price'} />
      <InfoList listPairs={{ price: details.lastDayHighPrice }} currency='USD' title={'Last Day High Price'} />
      <InfoList listPairs={details.allTimeLowPrice} currency='USD' title={'All Time Low Price'} />
      <InfoList listPairs={details.allTimeHighPrice} currency='USD' title={'All Time High Price'} />
    </CardContent>
  );
};

export { CoinDetailsCard };
