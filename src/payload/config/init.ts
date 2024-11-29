import { Payload } from 'payload';

export function payloadInit(_payload: Payload) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Environment:', {
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
      DATABASE_URI: process.env.DATABASE_URI,

      S3_ENDPOINT: process.env.S3_ENDPOINT,
      S3_BUCKET: process.env.S3_BUCKET,
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,

      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_DEFAULT_NAME: process.env.RESEND_DEFAULT_NAME,
      RESEND_DEFAULT_FROM_ADDRESS: process.env.RESEND_DEFAULT_FROM_ADDRESS,
    });
  }
}
