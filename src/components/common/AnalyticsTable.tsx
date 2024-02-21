import React from 'react';
import { AppAction } from '@graasp/sdk';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import katex from 'katex';
import { useTranslation } from 'react-i18next';
import { ActionData, AnalyticColumn, Order } from '@/types/table';
import {
  ANALYTIC_ROW_EQUATION_ID,
  ANALYTIC_ROW_RESULT_ID,
  ANALYTIC_ROW_CREATED_AT_ID,
  ANALYTIC_ROW_MEMBER_ID,
  buildAnalyticRowId,
} from '@/config/selectors';
import { PI_SYMBOL } from '@/config/constants';
import { dateColumnFormatter } from '@/utils/action';

interface Props {
  columns: AnalyticColumn[];
  rows: AppAction[];
  orderBy: string;
  order: Order;
  handleSort: (property: string) => void;
}

const AnalyticsTable = ({
  columns,
  rows,
  orderBy,
  order,
  handleSort,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="analytics table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : Order.ASC}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                tabIndex={-1}
                key={row.id}
                id={buildAnalyticRowId(row.id)}
              >
                <TableCell id={ANALYTIC_ROW_MEMBER_ID}>
                  <Typography noWrap>{row.member?.name || '-'}</Typography>
                </TableCell>
                <TableCell id={ANALYTIC_ROW_EQUATION_ID}>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: katex.renderToString(
                        (row.data as ActionData)?.equation.replaceAll(
                          'pi',
                          PI_SYMBOL,
                        ),
                        {
                          throwOnError: false,
                        },
                      ),
                    }}
                  />
                </TableCell>
                <TableCell id={ANALYTIC_ROW_RESULT_ID}>
                  {(row.data as ActionData)?.result}
                </TableCell>
                <TableCell id={ANALYTIC_ROW_CREATED_AT_ID}>
                  {dateColumnFormatter(row.createdAt)}
                </TableCell>
              </TableRow>
            ))}
            {rows.length < 1 && (
              <TableRow hover tabIndex={-1} sx={{ height: '200px' }}>
                <TableCell colSpan={6} align="center">
                  {t('No records for this item')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AnalyticsTable;
