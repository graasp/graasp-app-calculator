import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  MockSolution,
  buildDatabase,
  mockApi,
} from '@graasp/apps-query-client';

import Root from './components/Root';
import { MOCK_API } from './config/env';
import './index.css';
import { defaultMockContext, mockMembers } from './mocks/db';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
