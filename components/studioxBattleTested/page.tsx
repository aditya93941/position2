import React from 'react'
import styles from './studioxBattleTested.module.css'
import Image from 'next/image'
import Link from 'next/link'

const StudioxBattleTested = () => {
  return (
    <section className={styles.wrapper} aria-labelledby="battle-tested-heading">
      <div className={styles.textSection}>
        <h2 className={styles.h1} id="battle-tested-heading">Battle Tested</h2>
        <p className={styles.h2}>
          We care how things look, how they move and when they ship. We needed production control, storytelling<br />
          power and pixel perfection.
        </p>
        <p className={styles.h3}>
          <strong>Legacy Tools Didn't Cut It. So We Built a Tool That Did.</strong>
        </p>
      </div>

      <div className={styles.featuresContainer}>
     
        <div className={styles.featureBox}>
          <div className={styles.iconWrapper}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/creative-meets-code-1.svg" 
              alt="Creative Meets Code"
              width={60}
              height={60}
              className={styles.icon}
            />
            
          </div>
          <h5 className={styles.title}>Creative Meets Code</h5>
          <p className={styles.description}>It delivers the looks. It works flawlessly.</p>
        </div>

        <div className={styles.featureBox}>
          <div className={styles.iconWrapper}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/real-engineering-1.svg" 
              alt="Real Engineering"
              width={60}
              height={60}
              className={styles.icon}
            />
            
          </div>
          <h5 className={styles.title}>Real Engineering</h5>
          <p className={styles.description}>Rock-solid infrastructure from launch pros.</p>
        </div>

    
        <div className={styles.featureBox}>
          <div className={styles.iconWrapper}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/launch-frontlines-1.svg" 
              alt="Launch Frontlines"
              width={60}
              height={60}
              className={styles.icon}
            />
            
          </div>
          <h5 className={styles.title}>Launch Frontlines</h5>
          <p className={styles.description}>Eats last-minute changes for breakfast.</p>
        </div>

        <div className={styles.featureBox}>
          <div className={styles.iconWrapper}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/tool-that-gets-it-1.svg" 
              alt="A Tool That Gets It"
              width={60}
              height={60}
              className={styles.icon}
            />
          </div>
          <h5 className={styles.title}>A Tool That Gets It</h5>
          <p className={styles.description}>What used to take days now takes minutes.</p>
        </div>
      </div>
    </section>
  )
}

export default StudioxBattleTested
