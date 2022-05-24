import { List, ListItem, makeStyles, Typography } from '@material-ui/core';
import React, { ReactNode, useMemo, VFC } from 'react';
import { GenericObject, Nullable } from '../utils/types';
import { isEmpty, isString } from '../utils/Assertions';
import { formatAmount } from '../utils/Math';

export type InfoListProps = {
  title?: string;
  currency?: string;
  isPercentages?: boolean;
  listPairs: GenericObject<Nullable<number | string | string[] | GenericObject<Nullable<string | string[]>>>>;
};

const useStyles = makeStyles(({ spacing }) => ({
  listItemLabel: {
    marginRight: spacing(1),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap'
  },
  arrayListItem: {
    whiteSpace: 'break-spaces',
    wordBreak: 'break-word'
  }
}));

const formatKeyName = (keyName: string): string => keyName.replaceAll('_', ' ');

// TODO: make values that are URL to be a link element
const InfoList: VFC<InfoListProps> = ({ title, currency, isPercentages, listPairs }) => {
  const styles = useStyles();

  const renderListItem = useMemo(
    () =>
      (
        keyName: string,
        itemValue: Nullable<number | string | string[] | GenericObject<Nullable<string | string[]>>>,
        index: number
      ): ReactNode => {
        if (!itemValue) {
          return null;
        }

        if (!isNaN(itemValue as any) && !Array.isArray(itemValue)) {
          return (
            <ListItem key={index}>
              <Typography variant='body2' component='strong' className={styles.listItemLabel}>
                {formatKeyName(keyName)}:
              </Typography>
              {formatAmount(itemValue as number, currency)}
              {isPercentages ? '%' : ''}
            </ListItem>
          );
        } else if (isString(itemValue)) {
          return (
            <ListItem key={index}>
              <Typography variant='body2' component='strong' className={styles.listItemLabel}>
                {formatKeyName(keyName)}:
              </Typography>
              {itemValue}
            </ListItem>
          );
        } else if (Array.isArray(itemValue)) {
          const itemValueString = itemValue.filter((n) => n).join(' ');
          if (isEmpty(itemValue) || !itemValueString.trim()) {
            return null;
          }

          return (
            <ListItem key={index} className={styles.arrayListItem}>
              <Typography variant='body2' component='strong' className={styles.listItemLabel}>
                {formatKeyName(keyName)}:
              </Typography>
              {itemValueString}
            </ListItem>
          );
        } else {
          return Object.keys(itemValue).map((nestedItemValueKey, nestedIndex) =>
            renderListItem(nestedItemValueKey, (itemValue as GenericObject)[nestedItemValueKey], nestedIndex)
          );
        }
      },
    [currency, isPercentages, styles]
  );

  return (
    <>
      {title && listPairs && <Typography variant={'h6'}>{title}</Typography>}
      {listPairs && (
        <List data-testid={'info-list'}>
          {Object.keys(listPairs).map((linkKey, index) => {
            return renderListItem(linkKey, listPairs[linkKey], index);
          })}
        </List>
      )}
    </>
  );
};

export { InfoList };
