export interface AnalyticsColumn {
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

export type AppActionData = ActionData & {
  [key: string]: string; // Extending ActionData to include the index signature
};
