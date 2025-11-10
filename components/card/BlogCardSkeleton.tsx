import styles from './card.module.css';

export default function BlogCardSkeleton() {
  return (
    <article className={`${styles.card} ${styles.skeletonCard}`}>
      <div className={styles.cardHeader}>
        <div className={styles.skeletonImage} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.skeletonLine} style={{ width: '40%', height: '14px' }} />
        <div className={styles.cardContent}>
          <div className={styles.skeletonLine} style={{ width: '90%', height: '20px', marginBottom: '8px' }} />
          <div className={styles.skeletonLine} style={{ width: '70%', height: '20px' }} />
        </div>
        <div className={styles.skeletonLine} style={{ width: '50%', height: '14px', marginTop: '10px', marginBottom: '10px' }} />
        <div className={styles.skeletonButton} />
      </div>
    </article>
  );
}

