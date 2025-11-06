import Image from "next/image";
import Link from "next/link";
import styles from "./banner.module.css";
import "../../app/globals.css";
const banner = () => {
  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles.bannerWrapper}>
          <div className={styles.image}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2024/06/white-design-element-one.svg"
              alt="banner"
              width={59}
              height={303}
              className={styles.image1}
            />
            <Image
              src="https://www.position2.com/wp-content/uploads/2024/06/white-design-element-two.svg"
              alt="banner"
              width={143}
              height={303}
              className={styles.image2}
            />
            <Image
              src="https://www.position2.com/wp-content/uploads/2024/06/white-design-element-three.svg"
              alt="banner"
              width={214}
              height={303}
              className={styles.image3}
            />
            <Image
              src="https://www.position2.com/wp-content/uploads/2024/06/blog.svg"
              alt="banner"
              width={303}
              height={303}
              className={styles.image4}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>Insights that ignite growth</h1>
            <p className={styles.description}>
            Elevate your marketing game with our AI-driven expert insights
            </p>
            <Link href="/" className={styles.button}>
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default banner;
