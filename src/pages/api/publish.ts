import type { APIRoute } from 'astro';
import { compileAllPages, compileSource } from '../../compiler/compile';
import { writeSourceFile } from '../../lib/storage';

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const source = typeof payload.source === 'string' ? payload.source : '';
    const page = await compileSource(source);
    const path = await writeSourceFile(page.frontmatter.slug, page.frontmatter.layout, source);
    await compileAllPages();

    return new Response(
      JSON.stringify({
        ok: true,
        slug: page.frontmatter.slug,
        path,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Publish failed.',
        issues: (error as Error & { issues?: { message: string }[] }).issues ?? [{ message: (error as Error).message }],
      }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
};
