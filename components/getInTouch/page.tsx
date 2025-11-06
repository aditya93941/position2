import Link from 'next/link'
import styles from './getInTouch.module.css'

export default function GetInTouch() {
  return (
    <>
    <div className={styles.contact_us}>
        <h1 className={styles.h1}>Grow Your Business In a Smarter Way</h1>
        <Link href="/" className={styles.button}>
          Get in touch
        </Link>
      </div>
    
    </>
  )
}


