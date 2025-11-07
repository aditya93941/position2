import styles from './studioxFooter.module.css';

const Page = () => {
  return (
    <>
    <div className={styles.footer}>
      <div className={styles.footer__container1}></div>
      <div className={styles.content_wrapper}>
        <div className={styles.content_container}>
          <h2>Smart. Simple. Secure.</h2>
          <div className={styles.p1}><p>
          Enterprise-grade encryption. Granular access control.<br/>
          Version tracking that actually works. No leaks. No screw-ups. No headaches.
          </p></div>
          
          <div className={styles.p2}><p>Peace of Mind and a Clean, Secure Launch. Every Time.</p></div>
        </div>
      </div>
    </div>
    <div> Accourdien</div>
    <div className={styles.footer}>
      <div className={styles.footer__container2}></div>
      <div className={styles.content_wrapper}>
        <div className={styles.content_container}>
          <h1>Smart. Simple. Secure.</h1>
          <p>
            Enterprise-grade encryption. Granular access control.
            Version tracking that actually works. No leaks. No screw-ups. No headaches.
          </p>
          <p>Peace of Mind and a Clean, Secure Launch. Every Time.</p>
        </div>
      </div>
    </div>
  </>
  );
};

export default Page;
