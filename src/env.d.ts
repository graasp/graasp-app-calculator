/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAASP_API_HOST?: string;
  readonly VITE_PORT?: number;
  readonly VITE_ENABLE_MOCK_API?: string;
  readonly VITE_GRAASP_APP_KEY: string;
  readonly VITE_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
