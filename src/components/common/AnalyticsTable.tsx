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
import { AnalyticsColumn, ActionData, Order } from '@/types/table';
import {
  ANALYTICS_ROW_EQUATION_ID,
  ANALYTICS_ROW_RESULT_ID,
  ANALYTICS_ROW_CREATED_AT_ID,
  ANALYTICS_ROW_MEMBER_ID,
  buildAnalyticsRowId,
} from '@/config/selectors';
import { PI_SYMBOL } from '@/config/constants';
import { dateColumnFormatter } from '@/utils/action';
import HtmlParser from './HtmlParser';

interface Props {
  columns: AnalyticsColumn[];
  rows: AppAction<ActionData>[];
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
            {rows.length ? (
              rows.map((row) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                  id={buildAnalyticsRowId(row.id)}
                >
                  <TableCell>
                    <Typography id={ANALYTICS_ROW_MEMBER_ID} noWrap>
                      {row.member?.name || t('Unknown')}
                    </Typography>
                  </TableCell>
                  <TableCell id={ANALYTICS_ROW_EQUATION_ID}>
                    <HtmlParser
                      content={katex.renderToString(
                        row.data?.equation?.replaceAll('pi', PI_SYMBOL),
                        {
                          throwOnError: false,
                        },
                      )}
                    />
                    <div />
                  </TableCell>
                  <TableCell id={ANALYTICS_ROW_RESULT_ID}>
                    <HtmlParser
                      content={katex.renderToString(
                        row.data?.result?.replaceAll('pi', PI_SYMBOL),
                        {
                          throwOnError: false,
                        },
                      )}
                    />
                  </TableCell>
                  <TableCell id={ANALYTICS_ROW_CREATED_AT_ID}>
                    {dateColumnFormatter(row.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow hover tabIndex={-1} sx={{ height: '200px' }}>
                <TableCell colSpan={columns.length} align="center">
                  {t('NO_COMPUTATIONS_YET')}
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
