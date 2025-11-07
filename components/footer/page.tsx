import Link from "next/link";
import styles from "./footer.module.css";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>


      <div className={styles.footer}>
        

        <hr className={styles.line} />

        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <div className={styles.logoCircle}>p²</div>
              <span>keep on growing</span>
            </div>
          </div>

          <div className={styles.right}>
            <ul className={styles.links}>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>© Copyright 2025, Position²</li>
            </ul>

            <div className={styles.socials}>
              <FaFacebookF />
              <FaLinkedinIn />
              <FaXTwitter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
