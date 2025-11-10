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
            <Link href="/" aria-label="Position² Home">
              <Image
                src="https://www.position2.com/wp-content/uploads/2024/06/p2-full-logo-white.svg"
                alt="Position² Logo"
                width={123}
                height={53}
                priority
              />
            </Link>
          </div>
          <div className={styles.menuButtonContainer}>
            <button 
              type="button"
              className={styles.menuButton}
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="navigation-menu"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
