/**
 * Format to amount
 */
const formatAmount = (
  value: number,
  currency?: string,
  minimumFractionDigits: number = 2,
  numberFormat: string = 'en-US'
): string => {
  const formatterOptions = {
    minimumFractionDigits: minimumFractionDigits
  } as Intl.NumberFormatOptions;

  if (Boolean(currency)) {
    formatterOptions.style = 'currency';
    formatterOptions.currency = currency;
  } else {
    formatterOptions.style = 'decimal';
  }
  const valueFormatter = new Intl.NumberFormat(numberFormat, formatterOptions);

  return valueFormatter.format(value).replace(/^(\D+)/, '$1 ');
};

export { formatAmount };
