import { Database, LocalContext } from '@graasp/apps-query-client';
import katex from 'katex';

declare global {
  interface Window {
    appContext: LocalContext;
    Cypress: boolean;
    database: Database;
    apiErrors: object;
    katex: katex;
  }
}

export {};
