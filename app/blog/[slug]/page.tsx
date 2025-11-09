import { getBlogBySlug } from "../../../lib/graphql";
import Image from "next/image";

// Route segment config - Next.js 16 best practices
export const revalidate = 60; // ISR: Re-generate at most every 60 seconds
export const dynamic = 'force-static'; // Prefer static generation
export const dynamicParams = true; // Allow dynamic params not generated at build time

interface Params {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogDetailsPage({ params }: Params) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const data = await getBlogBySlug(slug);

  const blog = data.blog;

  if (!blog) {
    return <div className="text-center py-10">Blog not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {blog.featuredImage?.node?.sourceUrl && (
        <Image
          src={blog.featuredImage.node.sourceUrl}
          alt={blog.featuredImage.node.altText || blog.title}
          width={800}
          height={400}
          className="rounded-lg mb-6"
        />
      )}
      <p>{blog.date}</p>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}