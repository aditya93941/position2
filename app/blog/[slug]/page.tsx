import { client, GET_ALL_BLOGS } from "../../../lib/graphql";
import Image from "next/image";

interface Params {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogDetailsPage({ params }: Params) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const data = await client.request(
    `
    query GetBlogBySlug($slug: ID!) {
      blog(id: $slug, idType: SLUG) {
        date
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `,
    { slug }
  );

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