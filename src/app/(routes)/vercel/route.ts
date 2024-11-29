export async function GET() {
  return Response.json({
    vercel: process.env.VERCEL,
    env: process.env.VERCEL_ENV,
  });
}
