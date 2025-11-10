import BlogCardSkeleton from '@/components/card/BlogCardSkeleton';
import styles from '@/components/card/card.module.css';

export default function BlogLoading() {
  return (
    <section className="container" aria-label="Loading blog posts">
      <div className={styles.cardContainer} role="list">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

