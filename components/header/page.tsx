"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./header.module.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="https://www.position2.com/wp-content/uploads/2024/06/p2-full-logo-white.svg"
                alt="logo"
                width={123}
                height={53}
              />
            </Link>
          </div>
          <div className={styles.menuButtonContainer}>
            <button className={styles.menuButton}>Menu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
