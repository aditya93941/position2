import styles from "./studioxBanner.module.css";
import Image from "next/image";
import Link from "next/link";

export default function StudioxBanner() {
    return (
        <>
             <div className={styles.studioxContainer}>
                <video loop autoPlay muted className={styles.backgroundVideo}>
                    <source
                        src="https://www.position2.com/wp-content/uploads/2025/09/studiox-desktop.mp4"
                        type="video/mp4"
                    />
                </video>

                <div className={styles.textOverlay}>
                    <Image src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg" alt="logo" className={styles.logo} width={194} height={164} />
                    <h1 className={styles.h1}>Make Your Customers <br />Fall in Love with Your Product.</h1>
                    <p className={styles.p}>
                        Before they hold it. Before they even know they need it. StudioX makes them feel it.
                    </p>
                    <h2 className={styles.h2}>Work smarter. Look cooler. Launch faster.</h2>
                    <div className={styles.buttonWrapper}>
                        <Link href="https://studiox.position2.com" className={styles.button1}>See it in Action</Link>
                        <Link href="https://studiox.position2.com" className={styles.button2}>Try it Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}