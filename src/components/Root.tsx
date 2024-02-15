import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { Loader, theme } from '@graasp/ui';
import 'react-toastify/dist/ReactToastify.css';
import {
  GraaspContextDevTool,
  WithLocalContext,
  WithTokenContext,
  useObjectState,
} from '@graasp/apps-query-client';
import { QueryClientProvider, hooks, queryClient } from '@/config/queryClient';
import { defaultMockContext, mockMembers } from '@/mocks/db';
import i18nConfig from '../config/i18n';
import App from './App';

const Root = (): JSX.Element => {
  const [mockContext, setMockContext] = useObjectState(defaultMockContext);

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18nConfig}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <WithLocalContext
            defaultValue={window.Cypress ? window.appContext : mockContext}
            LoadingComponent={<Loader />}
            useGetLocalContext={hooks.useGetLocalContext}
            useAutoResize={hooks.useAutoResize}
            onError={(e) => {
              console.error('An error occurred while fetching the context.', e);
            }}
          >
            <WithTokenContext
              LoadingComponent={<Loader />}
              useAuthToken={hooks.useAuthToken}
              onError={() => {
                console.error('An error occurred while requesting the token.');
              }}
            >
              <App />
              {import.meta.env.DEV && (
                <GraaspContextDevTool
                  members={mockMembers}
                  context={mockContext}
                  setContext={setMockContext}
                />
              )}
            </WithTokenContext>
          </WithLocalContext>
        </QueryClientProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default Root;
