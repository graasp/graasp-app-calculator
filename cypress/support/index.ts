// cypress/support/index.ts

import { Database, LocalContext } from '@graasp/apps-query-client';
import { ANGLE_UNITS } from 'config/constants';
import { ValueOf } from 'types/math';

interface AppQueryParameters {
  appInstanceId: string;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setUpApi(
        database: Partial<Database>,
        appContext: Partial<LocalContext>,
      ): void;

      visitAsStudent(
        args: { appQueryParameters: AppQueryParameters },
        scientificMode?: boolean,
      ): void;
      clickButton(selector: string): void;
      equal(): void;
      toggleAngleUnit(angleUnit: ValueOf<typeof ANGLE_UNITS>): void;
    }
  }
}
