"use client";
import { useEffect, useState } from "react";
import styles from "./studioxCarousal.module.css";
import Image from "next/image";
import "../../app/globals.css";

const videos = [
  {
    id: 1,
    title: "Exploded View",
    desc: "See what's inside. And why it matters.",
    src: "https://www.position2.com/wp-content/uploads/2025/09/Explode-View-new.mp4",
  },
  {
    id: 2,
    title: "Custom Wallpaper",
    desc: "Set the mood. Sell the vibe.",
    src: "https://www.position2.com/wp-content/uploads/2025/09/Custome-Wallpaper-new.mp4",
  },
  {
    id: 3,
    title: "Essential Photography",
    desc: "Studio shots without the studio.",
    src: "https://www.position2.com/wp-content/uploads/2025/09/Standard-photography-new.mp4",
  },
  {
    id: 4,
    title: "Lifestyle Photography",
    desc: "Live the dream.",
    src: "https://www.position2.com/wp-content/uploads/2025/09/Lifestyle-Photography-new.mp4",
  },
  {
    id: 5,
    title: "Up to 8K Renders",
    desc: "Crisp enough for billboards, classy enough for Cannes.",
    src: "https://www.position2.com/wp-content/uploads/2025/09/8K-Render.mp4",
  },
];

export default function StudioxCarousal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActiveIndex((i) => (i+3) % videos.length);
          return 0;
        }
        return p + 1;

      });
    }, 100);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="studiox-web" aria-labelledby="features-in-motion-heading">
      <div className="container">
        <div className={styles.studioxCarousalWrapper}>
          <div className={styles.studioxCarousalHeader}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg"
              alt="StudioX Logo"
              width={192}
              height={64}
            />
            <h2 className={styles.studioxCarousalTitle} id="features-in-motion-heading">Features in Motion</h2>
          </div>

          <div 
            className={styles.studioxCarousalItem}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className={styles.videoContainer}>
              {isMobile && (
                <h3 className={styles.mobileVideoTitle}>{videos[activeIndex].title}</h3>
              )}
            <video
                key={videos[activeIndex].id}
              src={videos[activeIndex].src}
              autoPlay
              muted
              loop
              className={styles.studioxCarousalVideo}
              aria-label={`${videos[activeIndex].title}: ${videos[activeIndex].desc}`}
            ></video>
            </div>
          </div>

          <div className={styles.studioxCarousalControls} role="tablist" aria-label="Video carousel controls">
            {videos.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActiveIndex(i)}
                className={`${styles.control} ${
                  i === activeIndex ? styles.active : ""
                }`}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`View ${v.title} feature`}
                tabIndex={i === activeIndex ? 0 : -1}
              >
                {isMobile ? (
                  <span className={styles.dot}></span>
                ) : (
                  <>
                  <div className={styles.controlContent}>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p></div>
                    {i === activeIndex && (
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                  </>
                )}
                
              </button>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
