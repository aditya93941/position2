import styles from "./footer.module.css";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.bottom}>
        <div className={styles.logo}>
          <div className={styles.logoCircle} aria-hidden="true">p²</div>
          <span>keep on growing</span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className={styles.links}>
            <li>
              <Link href="/terms-of-service" aria-label="Terms of Service">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" aria-label="Privacy Policy">
                Privacy Policy
              </Link>
            </li>
            <li>© Copyright 2025, Position²</li>
          </ul>
        </nav>

        <nav aria-label="Social media links">
          <ul className={styles.socials} role="list">
            <li>
              <a 
                href="https://www.facebook.com/position2" 
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Position² on Facebook (opens in new tab)"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/company/position2" 
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Position² on LinkedIn (opens in new tab)"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com/position2" 
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Position² on X (formerly Twitter) (opens in new tab)"
              >
                <FaXTwitter aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
