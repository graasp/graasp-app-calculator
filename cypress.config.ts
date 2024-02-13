import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false,
    retries: { runMode: 1, openMode: 0 },
    baseUrl: `http://localhost:${process.env.PORT || 3017}`,
  },
});
