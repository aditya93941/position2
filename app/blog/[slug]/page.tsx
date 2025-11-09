import { client, GET_ALL_BLOGS } from "../../../lib/graphql";
import Image from "next/image";
import styles from "./blogDetail.module.css";
import type { Metadata } from "next";

interface Params {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const data = await client.request(
    `
    query GetBlogBySlug($slug: ID!) {
      blog(id: $slug, idType: SLUG) {
        title
        date
        excerpt
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
    return {
      title: "Blog Post Not Found | Position²",
    };
  }

  return {
    title: `${blog.title} | Position² Blog`,
    description: blog.excerpt || `Read ${blog.title} on Position² blog. Marketing insights and growth strategies.`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on Position² blog.`,
      type: "article",
      publishedTime: blog.date,
      images: blog.featuredImage?.node?.sourceUrl ? [blog.featuredImage.node.sourceUrl] : [],
    },
  };
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
    return (
      <main className={styles.blogDetailContainer}>
        <div className="text-center py-10">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  const blogDate = blog.date ? new Date(blog.date) : null;
  const isValidDate = blogDate && !isNaN(blogDate.getTime());
  
  const dateTime = isValidDate ? blogDate.toISOString() : "";
  const formattedDate = isValidDate 
    ? blogDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <main className={styles.blogDetailContainer}>
      <article itemScope itemType="https://schema.org/BlogPosting">
        {blog.featuredImage?.node?.sourceUrl && (
          <Image
            src={blog.featuredImage.node.sourceUrl}
            alt={blog.featuredImage.node.altText || `Featured image for ${blog.title}`}
            width={800}
            height={400}
            className={`rounded-lg ${styles.blogDetailImage}`}
            itemProp="image"
            priority
          />
        )}
        {isValidDate && (
          <time 
            dateTime={dateTime} 
            className={styles.blogDetailDate}
            itemProp="datePublished"
          >
            {formattedDate}
          </time>
        )}
        <h1 className={styles.blogDetailTitle} itemProp="headline">
          {blog.title}
        </h1>
        <div
          className={`prose prose-lg ${styles.blogDetailContent}`}
          dangerouslySetInnerHTML={{ __html: blog.content }}
          itemProp="articleBody"
        />
        <div itemProp="author" itemScope itemType="https://schema.org/Organization" className="sr-only">
          <span itemProp="name">Position²</span>
        </div>
      </article>
    </main>
  );
}