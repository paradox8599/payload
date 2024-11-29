import { getPayload } from '@/payload.config';

export async function GET() {
  const payload = await getPayload();

  const data = await payload.find({ collection: 'users' });

  return Response.json(data);
}
