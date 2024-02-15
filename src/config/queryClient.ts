import { configureQueryClient } from '@graasp/apps-query-client';

import { API_HOST, GRAASP_APP_KEY, MOCK_API } from './env';
import { showErrorToast } from '../utils/toasts';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  API_ROUTES,
  mutations,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  notifier: showErrorToast,
  refetchOnWindowFocus: !import.meta.env.DEV,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_KEY,
  // should be relates to MOCK_API
  isStandalone: true,
});

export {
  ReactQueryDevtools,
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  API_ROUTES,
};
