declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** wether it is deployed on vercel */
      VERCEL?: '1';
      /** vercel environment */
      VERCEL_ENV?: 'production' | 'preview' | 'development';

      /** database connection string */
      DATABASE_URI?: string;

      /** payload secret */
      PAYLOAD_SECRET?: string;

      /** S3 endpoint */
      S3_ENDPOINT?: string;
      /** S3 bucket name */
      S3_BUCKET?: string;
      /** S3 access key ID */
      S3_ACCESS_KEY_ID: string;
      /** S3 secret access key */
      S3_SECRET_ACCESS_KEY?: string;

      /** Resend API key */
      RESEND_API_KEY?: string;
      /** Resend default name */
      RESEND_DEFAULT_NAME?: string;
      /** Resend default from address */
      RESEND_DEFAULT_FROM_ADDRESS?: string;
    }
  }
}

export { };
