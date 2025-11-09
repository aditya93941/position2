import { getAllBlogs } from "../../lib/graphql";
import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

export default async function CardComponent() {
  const data: any = await getAllBlogs();
  const blogs = data.blogs.nodes;
  console.log(blogs);
  const formattedDate = new Date(blogs[0].date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container">
      <div className={styles.cardContainer}>
        {blogs.map((blog: any) => (
          <div key={blog.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <Image
                src={
                  blog.featuredImage?.node?.sourceUrl ||
                  "/rendering-platform-featured.jpg"
                }
                alt={blog.featuredImage?.node?.altText || blog.title}
                width={400}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardDate}>
                <span className={styles.cardDateText}>{formattedDate}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{blog.title}</h3>
              </div>
              <div className={styles.cardAuthor}>
                <p className={styles.cardDateText}>
                  By{" "}
                  <span className={styles.authorNameText}>{"Position2"}</span>
                </p>
              </div>
              <div className={styles.cardFooter}>
                <Link href={`/blog/${blog.slug}`} className={styles.cardLink}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
