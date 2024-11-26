declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** tell payload if it is deployed on vercel */
      PAYLOAD_VERCEL: 'true' | 'false';
      /** payload secret */
      PAYLOAD_SECRET: string;
      /** database connection string */
      DATABASE_URI: string;

      /** S3 endpoint */
      S3_ENDPOINT: string;
      /** S3 bucket name */
      S3_BUCKET: string;
      /** S3 access key ID */
      S3_ACCESS_KEY_ID: string;
      /** S3 secret access key */
      S3_SECRET_ACCESS_KEY: string;
    }
  }
}

export { };
