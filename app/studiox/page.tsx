import Header from '@/components/header/page'
import styles from './studiox.module.css'
import Image from 'next/image'
import Link from 'next/link'


export const page = () => {
    return (
        <>
            <Header />

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
                    <h3 className={styles.h3}>
                        Before they hold it. Before they even know they need it. StudioX makes them feel it.
                    </h3>
                    <h2 className={styles.h2}>Work smarter. Look cooler. Launch faster.</h2>
                    <Link href="/" className={styles.button1}>See in Action</Link>
                    <Link href="/" className={styles.button2}>Try it now</Link>

                </div>
            </div>



        </>
    )
}


export default page;
