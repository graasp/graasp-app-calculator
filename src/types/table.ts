export interface AnalyticsColumn {
  id: string;
  label: string;
  sortable?: boolean;
}

export type ActionData = {
  equation: string;
  result: string;
};

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
