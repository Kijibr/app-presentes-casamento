// vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />
interface ImportMetaEnv {
  readonly VITE_QR_CODE: string;
  readonly VITE_API_URL: string;
  readonly VITE_FB_API_KEY: string;
  readonly VITE_FB_STORAGE_BUCKET: string;
  readonly VITE_FB_MESSAGING_SENDER_ID: string;
  readonly VITE_FB_APP_ID: string;
  readonly VITE_FB_MEASUREMENT_ID: string;

  readonly VITE_EMAIL_PAYER_DEFAULT: string;

  readonly VITE_MP_ACCESS_KEY_DEV: string;
  readonly VITE_MP_ACCESS_KEY: string;

  readonly ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
