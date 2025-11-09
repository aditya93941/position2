import styles from "./footer.module.css";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.bottom}>
          <div className={styles.logo}>
            <div className={styles.logoCircle}>p²</div>
            <span>keep on growing</span>
          </div>

          <ul className={styles.links}>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>© Copyright 2025, Position²</li>
          </ul>

          <div className={styles.socials}>
            <div className={styles.socialIcon}>
              <FaFacebookF />
            </div>
            <div className={styles.socialIcon}>
              <FaLinkedinIn />
            </div>
            <div className={styles.socialIcon}>
              <FaXTwitter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
