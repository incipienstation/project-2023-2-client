/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAOMAP_API_KEY: string;
  readonly VITE_SERVER_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}