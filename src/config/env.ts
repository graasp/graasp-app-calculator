const {
  VITE_GRAASP_APP_KEY,
  VITE_VERSION,
  VITE_GRAASP_API_HOST,
  VITE_ENABLE_MOCK_API,
} = window.Cypress ? Cypress.env() : import.meta.env;

export const MOCK_API = VITE_ENABLE_MOCK_API === 'true';
export const API_HOST = VITE_GRAASP_API_HOST || 'http://localhost:3000';
export const VERSION = VITE_VERSION || 'latest';
export const GRAASP_APP_KEY = VITE_GRAASP_APP_KEY;
