"use client";
import { FC, useState, useEffect } from "react";
import styles from "./studioxGotALaunch.module.css";
import Link from "next/link";
import Image from "next/image";

const StudioxGotALaunch: FC = () => {
  const images = [
    "https://www.position2.com/wp-content/uploads/2025/08/studiox-new-ce-monitor-explod.jpg",
    "https://www.position2.com/wp-content/uploads/2025/08/studiox-new-ce-laptop-explod.jpg",
    "https://www.position2.com/wp-content/uploads/2025/08/studiox-new-ce-surveillance-explod.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className={styles.container} aria-labelledby="got-a-launch-heading">
      <div className={styles.textSection}>
        <h2 className={styles.heading} id="got-a-launch-heading">Got a Launch?</h2>
        <div className={styles.content}>
          <p className={styles.subheading}>Consumer Electronics</p>
          <p className={styles.description}>
            From laptops and rugged PCs to smartphones, smart devices, and
            next-gen displays, Studio<sup>X</sup> brings engineering brilliance to life
            with photorealistic 3D visuals.<br/> Sharp detail for launch decks,
            ecommerce, even manuals. All from your browser.
          </p>

          <Link href="/" className={styles.button}>
            Try it Now
          </Link>
        </div>
      </div>

      <div className={styles.imageContainer}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`${styles.imageWrapper} ${
              index === current ? styles.active : ""
            }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className={styles.image}
            />
          </div>
        ))}

        <div className={styles.dots} role="tablist" aria-label="Image carousel controls">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`${styles.dot} ${
                index === current ? styles.activeDot : ""
              }`}
              role="tab"
              aria-selected={index === current}
              aria-label={`View slide ${index + 1}`}
              tabIndex={index === current ? 0 : -1}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioxGotALaunch;
