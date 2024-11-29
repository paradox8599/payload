import { getPayload } from '@/payload.config';

export const GET = async () => {
  const payload = await getPayload();

  const data = await payload.find({ collection: 'users' });

  return Response.json(data);
};
