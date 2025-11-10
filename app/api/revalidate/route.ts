import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    // Security: Check for secret header
    const secret = req.headers.get('x-revalidate-secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { ok: false, message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { type, slug, id } = body;

    // Revalidate blog post
    if (type === 'post' && slug) {
      // Revalidate the specific page path
      await revalidatePath(`/blog/${slug}`);
      
      // Revalidate the cached data tagged with blog-<slug>
      // Second argument 'max' means immediate revalidation
      await revalidateTag(`blog-${slug}`, 'max');
      
      // Also revalidate the blogs list
      await revalidateTag('blogs', 'max');
      
      return NextResponse.json({ 
        revalidated: true, 
        path: `/blog/${slug}`,
        tags: [`blog-${slug}`, 'blogs']
      });
    }

    // Revalidate all blogs (e.g., when new post is added)
    if (type === 'blogs') {
      await revalidateTag('blogs', 'max');
      await revalidatePath('/blog');
      
      return NextResponse.json({ 
        revalidated: true, 
        path: '/blog',
        tags: ['blogs']
      });
    }

    // Revalidate author (if needed in future)
    if (type === 'author' && id) {
      await revalidateTag(`author-${id}`, 'max');
      return NextResponse.json({ 
        revalidated: true, 
        tags: [`author-${id}`]
      });
    }

    return NextResponse.json(
      { ok: false, message: 'Unknown payload type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { ok: false, message: 'Error revalidating' },
      { status: 500 }
    );
  }
}

