// vite-env.d.ts 파일
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}