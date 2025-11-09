import FAQAccordion from '../FAQStudiox/page';
import styles from './studioxFooter.module.css';
import Image from 'next/image';

const Page = () => {
  return (
    <>
      <div className={styles.studiofooter}>
        <div className={styles.footer__container1}></div>
        <div className={styles.content_wrapper}>
          <div className={styles.content_container}>
            <h2>Smart. Simple. Secure.</h2>
            <div className={styles.p1}><p>
              Enterprise-grade encryption. Granular access control.<br />
              Version tracking that actually works. No leaks. No screw-ups. No headaches.
            </p></div>

            <div className={styles.p2}><p>Peace of Mind and a Clean, Secure Launch. Every Time.</p></div>
          </div>
        </div>
      </div>
      <FAQAccordion />
      <div className={styles.studiofooter}>
        <div className={styles.footer__container2}></div>
        <div className={styles.content_wrapper}>
          <div className={styles.content_container}>
            <div className={styles.logo}>
              <Image 
                src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg" 
                alt="StudioX logo" 
                className={styles.logo} 
                width={194} 
                height={164}
                loading="lazy"
              />
            </div>
            <h2>Make Something Beautiful</h2>
            <p>Bring your products to life in full 3D</p>
            <div>
              <input 
                type="email" 
                placeholder="Enter your email"
                aria-label="Email address for StudioX updates"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
