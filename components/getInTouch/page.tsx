"use client";
import Link from 'next/link'
import styles from './getInTouch.module.css'

export default function GetInTouch() {
  return (
    <section aria-labelledby="get-in-touch-heading">
      <div className={styles.contact_us}>
        <h2 id="get-in-touch-heading" className={styles.h1}>Grow Your Business In a Smarter Way</h2>
        <Link href="/" className={styles.button} aria-label="Get in touch with Position²">
          Get in touch
        </Link>
      </div>
      <div className={styles.newsletter}>
        <h3>Subscribe to our newsletter</h3>
        <form 
          className={styles.form}
          action="#"
          method="post"
          aria-label="Newsletter subscription form"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            placeholder="Email Address"
            className={styles.input}
            required
            aria-required="true"
            aria-label="Email address for newsletter subscription"
          />
          <button 
            type="submit" 
            className={styles.submit}
            aria-label="Submit newsletter subscription"
          >
            Submit
          </button>
        </form>
        <hr style={{width: '100%', margin: '15px 0'}} aria-hidden="true"/>
      </div>
    </section>
  )
}


