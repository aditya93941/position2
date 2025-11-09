import Link from 'next/link'
import styles from './getInTouch.module.css'

export default function GetInTouch() {
  return (
    <>
     <section>
      <div className={styles.contact_us}>
        <h1 className={styles.h1}>Grow Your Business In a Smarter Way</h1>
        <Link href="/" className={styles.button}>
          Get in touch
        </Link>
       
      </div>
      <div className={styles.newsletter}>
          <h2>Subscribe to our newsletter</h2>
          <div className={styles.form}>
            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
            />
            <button className={styles.submit}>Submit</button>
          </div>
          <hr style={{width: '100%', margin: '15px 0'}}/>
        </div>

      
     </section>
    
    </>
  )
}


