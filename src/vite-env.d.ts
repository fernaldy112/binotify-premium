/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BUILD_DIR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
