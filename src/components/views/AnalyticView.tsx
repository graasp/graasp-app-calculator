import React, { useMemo } from 'react';
import { hooks } from '@/config/queryClient';
import { useTranslation } from 'react-i18next';
import { Loader } from '@graasp/ui';
import { Box, Typography } from '@mui/material';

import { AnalyticColumn } from '@/types/table';
import AnalyticsTable from '../common/AnalyticsTable';

const AnalyticView = (): JSX.Element => {
  const { data, isLoading } = hooks.useAppActions();
  const { t } = useTranslation();

  const columns = useMemo<AnalyticColumn[]>(
    () => [
      {
        label: t('Member Name'),
        id: 'name',
      },
      {
        label: t('Calculation'),
        id: 'calculation',
      },
      {
        id: 'createdAt',
        label: t('Created At'),
      },
    ],
    [t],
  );

  if (data) {
    return <AnalyticsTable columns={columns} rows={data} />;
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

export default AnalyticView;
