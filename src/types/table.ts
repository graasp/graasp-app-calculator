export interface AnalyticColumn {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface ActionData {
  equation: string;
  result: string;
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
