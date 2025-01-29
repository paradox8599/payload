import { resendAdapter } from '@payloadcms/email-resend';

export const email = (
  !process.env.RESEND_API_KEY ? undefined : resendAdapter
)?.({
  apiKey: process.env.RESEND_API_KEY!,
  defaultFromName: process.env.RESEND_DEFAULT_NAME!,
  defaultFromAddress: process.env.RESEND_DEFAULT_FROM_ADDRESS!,
}) satisfies ReturnType<typeof resendAdapter> | undefined;
