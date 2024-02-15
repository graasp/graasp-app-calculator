import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import {
  MockSolution,
  buildDatabase,
  mockApi,
} from '@graasp/apps-query-client';
import Root from './components/Root';
import { defaultMockContext, mockMembers } from './mocks/db';
import { MOCK_API } from './config/env';

// setup mocked api for cypress or standalone app
/* istanbul ignore next */
if (MOCK_API) {
  mockApi(
    {
      externalUrls: [],
      dbName: window.Cypress ? 'graasp-app-cypress' : undefined,
      appContext: window.Cypress ? window.appContext : defaultMockContext,
      database: window.Cypress
        ? window.database
        : buildDatabase({ members: mockMembers }),
    },
    window.Cypress ? MockSolution.MirageJS : MockSolution.ServiceWorker,
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
