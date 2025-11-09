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
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`} role="banner">
      <div className="container">
        <nav className={styles.headerWrapper} aria-label="Main navigation">
          <div className={styles.logo}>
            <Link href="/" aria-label="Position² Home">
              <Image
                src="https://www.position2.com/wp-content/uploads/2024/06/p2-full-logo-white.svg"
                alt="Position² Logo"
                width={123}
                height={53}
              />
            </Link>
          </div>
          <div>
            <Link href="https://studiox.position2.com" className={styles.studioxHeaderButton} aria-label="Try StudioX now">Try it now</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
