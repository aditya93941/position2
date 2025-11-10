import styles from './blogDetail.module.css';

export default function BlogDetailLoading() {
  return (
    <main id="main-content" className={styles.blogDetailContainer}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonLine} style={{ width: '200px', height: '20px' }} />
      <div className={styles.skeletonLine} style={{ width: '80%', height: '40px' }} />
      <div style={{ marginTop: '20px' }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={styles.skeletonLine}
            style={{
              height: '16px',
              width: index === 4 ? '60%' : '100%',
            }}
          />
        ))}
      </div>
    </main>
  );
}

