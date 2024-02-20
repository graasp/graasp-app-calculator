import React from 'react';
import i18n from '@/config/i18n';
import { AppAction, formatDate } from '@graasp/sdk';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { AnalyticColumn } from '@/types/table';
import { useTranslation } from 'react-i18next';

interface Props {
  columns: AnalyticColumn[];
  rows: AppAction[];
}

const dateColumnFormatter = (value: string): string =>
  formatDate(value, {
    locale: i18n.language,
    defaultValue: 'unknown',
  });
const AnalyticsTable = ({ columns, rows }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover tabIndex={-1} key={row.id}>
                <TableCell>
                  <Typography noWrap>{row.member?.name || '-'}</Typography>
                </TableCell>
                <TableCell>
                  {(row.data as { mathjs: string })?.mathjs || '-'}
                </TableCell>
                <TableCell>{dateColumnFormatter(row.createdAt)}</TableCell>
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
