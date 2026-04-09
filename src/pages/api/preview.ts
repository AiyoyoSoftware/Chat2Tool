import type { APIRoute } from 'astro';
import { compileSource } from '../../compiler/compile';

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const source = typeof payload.source === 'string' ? payload.source : '';
    const page = await compileSource(source);
    return new Response(JSON.stringify({ page }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Preview failed.',
        issues: (error as Error & { issues?: { message: string }[] }).issues ?? [{ message: (error as Error).message }],
      }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
};
