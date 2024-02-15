import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false,
    retries: { runMode: 1, openMode: 0 },
    baseUrl: `http://localhost:${process.env.VITE_PORT || 3017}`,
    env: {
      VITE_GRAASP_API_HOST: process.env.VITE_GRAASP_API_HOST,
      VITE_ENABLE_MOCK_API: process.env.VITE_ENABLE_MOCK_API,
      VITE_GRAASP_APP_KEY: process.env.VITE_GRAASP_APP_KEY,
    },
  },
});
