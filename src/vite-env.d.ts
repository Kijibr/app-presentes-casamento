interface ImportMetaEnv {
  readonly VITE_QR_CODE: string;
  readonly VITE_API_URL: string;
  readonly VITE_FB_API_KEY: string;
  readonly VITE_FB_STORAGE_BUCKET: string;
  readonly VITE_FB_MESSAGING_SENDER_ID: string;
  readonly VITE_FB_APP_ID: string;
  readonly VITE_FB_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
