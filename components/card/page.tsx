import { client, GET_ALL_BLOGS } from "../../lib/graphql";
import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

export default async function CardComponent() {
  const data = await client.request(GET_ALL_BLOGS);
  const blogs = data.blogs.nodes;

  return (
    <section className="container" aria-labelledby="blog-posts-heading">
      <h2 id="blog-posts-heading" className="sr-only">Blog Posts</h2>
      <div className={styles.cardContainer} role="list">
        {blogs.map((blog: any) => {
          const blogDate = blog.date ? new Date(blog.date) : null;
          const isValidDate = blogDate && !isNaN(blogDate.getTime());
          
          const formattedDate = isValidDate 
            ? blogDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date not available";
          
          const dateTime = isValidDate ? blogDate.toISOString() : "";

          return (
            <article 
              key={blog.slug} 
              className={styles.card}
              role="listitem"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <div className={styles.cardHeader}>
                <Link href={`/blog/${blog.slug}`} aria-label={`Read article: ${blog.title}`}>
                  <Image
                    src={
                      blog.featuredImage?.node?.sourceUrl ||
                      "/rendering-platform-featured.jpg"
                    }
                    alt={blog.featuredImage?.node?.altText || `Featured image for ${blog.title}`}
                    width={400}
                    height={250}
                    className={styles.image}
                    itemProp="image"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className={styles.cardBody}>
                {isValidDate && (
                  <div className={styles.cardDate}>
                    <time 
                      dateTime={dateTime} 
                      className={styles.cardDateText}
                      itemProp="datePublished"
                    >
                      {formattedDate}
                    </time>
                  </div>
                )}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle} itemProp="headline">
                    <Link href={`/blog/${blog.slug}`} className={styles.cardTitleLink}>
                      {blog.title}
                    </Link>
                  </h3>
                </div>
                <div className={styles.cardAuthor}>
                  <p className={styles.cardDateText}>
                    By{" "}
                    <span className={styles.authorNameText} itemProp="author" itemScope itemType="https://schema.org/Organization">
                      <span itemProp="name">Position²</span>
                    </span>
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <Link 
                    href={`/blog/${blog.slug}`} 
                    className={styles.cardLink}
                    aria-label={`Read more about ${blog.title}`}
                  >
                    Read More
                    <span className="sr-only">: {blog.title}</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
