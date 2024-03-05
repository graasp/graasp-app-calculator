import React, { useMemo, useState } from 'react';
import { hooks } from '@/config/queryClient';
import { useTranslation } from 'react-i18next';
import { Loader } from '@graasp/ui';
import { Box, Typography } from '@mui/material';

import { AnalyticsColumn, ActionData, Order } from '@/types/table';
import { sortData } from '@/utils/action';
import { AppAction } from '@graasp/sdk';
import AnalyticsTable from '../common/AnalyticsTable';

const AnalyticsView = (): JSX.Element => {
  const { data, isLoading } = hooks.useAppActions({ getUpdates: true });
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState<Order>(Order.DESC);

  const handleSort = (property: string): void => {
    const isAsc = orderBy === property && order === Order.ASC;
    setOrder(isAsc ? Order.DESC : Order.ASC);
    setOrderBy(property);
  };

  const columns = useMemo<AnalyticsColumn[]>(
    () => [
      {
        label: t('Member Name'),
        id: 'member.name',
        sortable: true,
      },
      {
        label: t('Equation'),
        id: 'equation',
        sortable: false,
      },
      {
        label: t('Result'),
        id: 'result',
        sortable: false,
      },
      {
        id: 'createdAt',
        label: t('Created At'),
        sortable: true,
      },
    ],
    [t],
  );

  const rows: AppAction<ActionData>[] = useMemo(() => {
    if (data) {
      return sortData(data, orderBy, order);
    }
    return [];
  }, [data, orderBy, order]);
  if (data) {
    return (
      <AnalyticsTable
        columns={columns}
        rows={rows}
        orderBy={orderBy}
        order={order}
        handleSort={handleSort}
      />
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Typography>{t('Something went wrong')}</Typography>
    </Box>
  );
};

export default AnalyticsView;
