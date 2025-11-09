import FAQAccordion from '../FAQStudiox/page';
import styles from './studioxFooter.module.css';
import Image from 'next/image';

const Page = () => {
  return (
    <>
      <section className={styles.studiofooter} aria-labelledby="smart-simple-secure-heading">
        <div className={styles.footer__container1}></div>
        <div className={styles.content_wrapper}>
          <div className={styles.content_container}>
            <h2 id="smart-simple-secure-heading">Smart. Simple. Secure.</h2>
            <div className={styles.p1}><p>
              Enterprise-grade encryption. Granular access control.<br />
              Version tracking that actually works. No leaks. No screw-ups. No headaches.
            </p></div>

            <div className={styles.p2}><p>Peace of Mind and a Clean, Secure Launch. Every Time.</p></div>
          </div>
        </div>
      </section>
      <FAQAccordion />
      <section className={styles.studiofooter} aria-labelledby="make-something-beautiful-heading">
        <div className={styles.footer__container2}></div>
        <div className={styles.content_wrapper}>
          <div className={styles.content_container}>
            <div className={styles.logo}>
              <Image src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg" alt="StudioX Logo" className={styles.logo} width={194} height={164} />
            </div>
            <h2 id="make-something-beautiful-heading">Make Something Beautiful</h2>
            <p>Bring your products to life in full 3D</p>
            <div>
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="email-input"
                name="email"
                placeholder="Enter your email"
                aria-label="Enter your email address"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
