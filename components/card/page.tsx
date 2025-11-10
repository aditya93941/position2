import { Suspense } from 'react';
import { getAllBlogs } from "../../lib/graphql";
import CardClient from "./CardClient";
import BlogCardSkeleton from "./BlogCardSkeleton";
import styles from './card.module.css';

async function BlogCards() {
  // Use cached function - automatically cached with Cache Components
  const data = await getAllBlogs();
  const blogs = data.blogs.nodes;

  // Pass initial data to client component for polling
  return <CardClient initialBlogs={blogs} />;
}

export default async function CardComponent() {
  return (
    <Suspense 
      fallback={
        <section className="container" aria-label="Loading blog posts">
          <div className={styles.cardContainer} role="list">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        </section>
      }
    >
      <BlogCards />
    </Suspense>
  );
}
