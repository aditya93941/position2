import styles from './blogDetail.module.css';

export default function BlogDetailLoading() {
  return (
    <main id="main-content" className={styles.blogDetailContainer}>
      <div
        style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
          marginBottom: '20px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div
        style={{
          height: '20px',
          width: '200px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '20px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div
        style={{
          height: '40px',
          width: '80%',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '30px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div style={{ marginTop: '20px' }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            style={{
              height: '16px',
              width: index === 4 ? '60%' : '100%',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              marginBottom: '12px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </main>
  );
}

