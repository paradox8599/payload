import { s3Storage } from '@payloadcms/storage-s3';

export function createS3Storage() {
  const result = [];

  const hasS3Storage =
    process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY;

  if (hasS3Storage) {
    result.push(
      s3Storage({
        bucket: process.env.S3_BUCKET!,
        config: {
          region: 'auto',
          endpoint: process.env.S3_ENDPOINT!,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
          },
        },
        collections: {
          media: {
            prefix: 'media/',
            generateFileURL: undefined,
          },
        },
        disableLocalStorage: true,
      }),
    );
  }
  return result;
}
