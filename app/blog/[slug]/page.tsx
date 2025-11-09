import { client, GET_ALL_BLOGS } from "../../../lib/graphql";
import Image from "next/image";
import styles from "./blogDetail.module.css";

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
    <div className={styles.blogDetailContainer}>
      {blog.featuredImage?.node?.sourceUrl && (
        <Image
          src={blog.featuredImage.node.sourceUrl}
          alt={blog.featuredImage.node.altText || blog.title}
          width={800}
          height={400}
          className={`rounded-lg ${styles.blogDetailImage}`}
        />
      )}
      <p className={styles.blogDetailDate}>{blog.date}</p>
      <h1 className={styles.blogDetailTitle}>{blog.title}</h1>
      <div
        className={`prose prose-lg ${styles.blogDetailContent}`}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}