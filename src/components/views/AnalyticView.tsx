import React, { useMemo } from 'react';
import i18n from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { Member, formatDate } from '@graasp/sdk';
import { useTranslation } from 'react-i18next';
import { Table as GraaspTable } from '@graasp/ui/table';
import { Loader } from '@graasp/ui';
import { Box, Typography } from '@mui/material';

import '@ag-grid-community/styles/ag-grid.min.css';
import '@ag-grid-community/styles/ag-theme-material.min.css';
import { ANALYTICS_TABLE_ROW_HEIGHT } from '@/config/constants';

interface Action {
  member?: Member;
  data?: { mathjs: string };
}

const MemberNameRenderer = ({ data }: { data: Action }): JSX.Element => (
  <Typography noWrap>{data.member?.name || '-'}</Typography>
);
const CalculationRenderer = ({ data }: { data: Action }): JSX.Element => (
  <Typography noWrap>{data.data?.mathjs || '-'}</Typography>
);

const cellStyle = {
  display: 'flex',
  alignItems: 'center',
};

const AnalyticView = (): JSX.Element => {
  const { data, isLoading } = hooks.useAppActions();
  const { t } = useTranslation();

  const dateColumnFormatter = ({ value }: { value: string }): string =>
    formatDate(value, {
      locale: i18n.language,
      defaultValue: 'unknown',
    });

  // never changes, so we can use useMemo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnDefs = useMemo<any[]>(
    () => [
      {
        headerName: t('Member Name'),
        field: 'name',
        flex: 1,
        tooltipField: 'name',
        cellRenderer: MemberNameRenderer,
        cellStyle,
      },
      {
        headerName: t('Calculation'),
        sortable: false,
        cellRenderer: CalculationRenderer,
        flex: 1,
        field: 'calculation',
        cellStyle,
      },
      {
        field: 'createdAt',
        headerName: t('Created At'),
        flex: 1,
        valueFormatter: dateColumnFormatter,
        comparator: GraaspTable.dateComparator,
        cellStyle,
        // sort: defaultSortedColumn?.createdAt,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  if (data) {
    return (
      <Box>
        <GraaspTable
          columnDefs={columnDefs}
          rowData={data}
          emptyMessage={t('No records for this item')}
          rowHeight={ANALYTICS_TABLE_ROW_HEIGHT}
          isClickable={false}
        />
      </Box>
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

export default AnalyticView;
