"use client";
import { useEffect, useState } from "react";
import styles from "./studioxBanner.module.css";
import Image from "next/image";
import Link from "next/link";

export default function StudioxBanner() {
    const [videoSrc, setVideoSrc] = useState("https://www.position2.com/wp-content/uploads/2025/09/studiox-desktop.mp4");

    useEffect(() => {
        const updateVideoSrc = () => {
            if (window.innerWidth <= 767) {
                setVideoSrc("https://www.position2.com/wp-content/uploads/2025/09/studiox-mobile.mp4");
            } else {
                setVideoSrc("https://www.position2.com/wp-content/uploads/2025/09/studiox-desktop.mp4");
            }
        };

        updateVideoSrc();
        window.addEventListener("resize", updateVideoSrc);
        return () => window.removeEventListener("resize", updateVideoSrc);
    }, []);

    return (
        <>
             <section className={styles.studioxContainer} aria-label="StudioX Hero Section">
                <video 
                    key={videoSrc}
                    loop 
                    autoPlay 
                    muted 
                    playsInline
                    className={styles.backgroundVideo}
                    aria-label="StudioX product demonstration video"
                >
                    <source
                        src={videoSrc}
                        type="video/mp4"
                    />
                </video>

                <div className={styles.textOverlay}>
                    <Image src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg" alt="StudioX Logo" className={styles.logo} width={194} height={164} />
                    <h1 className={styles.h1}>Make Your Customers <br />Fall in Love with Your Product.</h1>
                    <p className={styles.p}>
                        Before they hold it. Before they even know they need it. StudioX makes them feel it.
                    </p>
                    <p className={styles.h2}>Work smarter. Look cooler. Launch faster.</p>
                    <div className={styles.buttonWrapper}>
                        <Link href="https://studiox.position2.com" className={styles.button1} aria-label="See StudioX in action">See it in Action</Link>
                        <Link href="https://studiox.position2.com" className={styles.button2} aria-label="Try StudioX now">Try it Now</Link>
                    </div>
                </div>
            </section>
        </>
    )
}