import React from 'react';
import { useTranslation } from './useTranslation';

/**
 * Locale-aware formatting component
 * Provides CLDR-compliant date, number, and currency formatting
 */
export function FormattedDate({ value, options }) {
  const { formatters } = useTranslation();
  return <>{formatters.date(value, options)}</>;
}

export function FormattedTime({ value, options }) {
  const { formatters } = useTranslation();
  return <>{formatters.time(value, options)}</>;
}

export function FormattedDateTime({ value, options }) {
  const { formatters } = useTranslation();
  return <>{formatters.datetime(value, options)}</>;
}

export function FormattedNumber({ value, options }) {
  const { formatters } = useTranslation();
  return <>{formatters.number(value, options)}</>;
}

export function FormattedCurrency({ value, currency = 'USD', options }) {
  const { formatters } = useTranslation();
  return <>{formatters.currency(value, currency, options)}</>;
}

export function FormattedPercent({ value, options }) {
  const { formatters } = useTranslation();
  return <>{formatters.percent(value, options)}</>;
}

export function FormattedRelativeTime({ value, unit = 'day' }) {
  const { formatters } = useTranslation();
  return <>{formatters.relativeTime(value, unit)}</>;
}

export function FormattedList({ items, options }) {
  const { formatters } = useTranslation();
  return <>{formatters.list(items, options)}</>;
}