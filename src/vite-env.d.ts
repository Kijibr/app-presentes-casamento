interface ImportMetaEnv {
  readonly VITE_QR_CODE: string;
  readonly VITE_API_URL: string;
  readonly FB_API_KEY: string;
  readonly FB_STORAGE_BUCKET: string;
  readonly FB_MESSAGING_SENDER_ID: string;
  readonly FB_APP_ID: string;
  readonly FB_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
