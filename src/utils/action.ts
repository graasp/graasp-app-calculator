import sortBy from 'lodash.sortby';
import { formatDate } from '@graasp/sdk';
import i18n from '@/config/i18n';
import { Order } from '@/types/table';

export const sortData = <T>(data: T[], orderBy: string, order: Order): T[] => {
  if (order === Order.ASC) {
    return sortBy(data, orderBy);
  }
  return sortBy(data, orderBy).reverse();
};

export const dateColumnFormatter = (value: string): string =>
  formatDate(value, {
    locale: i18n.language,
    defaultValue: 'unknown',
  });
