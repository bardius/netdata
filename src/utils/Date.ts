import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { GenericObject } from './types';

/**
 * Retrieve the Date-fns locale if available, fallback to enUS
 */
const getLocale = (localeName: string = 'en'): Locale => {
  const availableLocales: GenericObject<Locale> = {
    en: enUS
  };

  return availableLocales[localeName] ?? availableLocales.en;
};

/**
 * Current client timezone
 */
const getClientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Converts a date string to the desired date format
 */
const stringToDate = ({
  datetimeString,
  formatExp = 'dd/MM/yyyy',
  localeName,
  tz
}: {
  datetimeString: string;
  formatExp: string;
  localeName?: string;
  tz?: string;
}): string => {
  const locale = getLocale(localeName);

  const datetime = new Date(datetimeString);
  const zonedDate = dateToTimeZone({ date: datetime, tz: tz });
  return format(zonedDate, formatExp, { locale: locale });
};

/**
 * Converts a date to the equivalent UTC time
 */
const dateFromTimezoneToUTC = ({ date, tz }: { date: Date; tz: string }) => {
  return zonedTimeToUtc(date, tz);
};

/**
 * Converts a date to the equivalent time in given timezone
 */
const dateToTimeZone = ({ date, tz }: { date: Date; tz?: string }) => {
  return utcToZonedTime(date, tz || getClientTimezone);
};

/**
 * Converts epochTime to the equivalent UTC date
 */
const epochTimeToDateString = (epochTime: number): string => {
  return new Date(epochTime).toString();
};

export { getLocale, stringToDate, dateToTimeZone, dateFromTimezoneToUTC, getClientTimezone, epochTimeToDateString };
