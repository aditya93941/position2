import { NextResponse } from 'next/server';
import { getAllBlogs } from '../../../lib/graphql';

// With Cache Components, routes are dynamic by default
// No need for dynamic = 'force-dynamic' or revalidate = 0
export async function GET() {
  try {
    // Use cached function - shared cache with server components
    const data = await getAllBlogs();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

