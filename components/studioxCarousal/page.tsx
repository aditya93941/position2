"use client";
import { useEffect, useState, useRef } from "react";
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
  const isManualClick = useRef(false);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;

    // If it's a manual click, disable transition temporarily to avoid visual jump
    if (isManualClick.current) {
      // Use setTimeout to ensure DOM is updated and ref is attached
      timeoutId = setTimeout(() => {
        if (progressFillRef.current) {
          progressFillRef.current.style.transition = 'none';
          setProgress(0);
          // Re-enable transition after reset is complete
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (progressFillRef.current) {
                progressFillRef.current.style.transition = '';
              }
            });
          });
        } else {
          setProgress(0);
        }
        isManualClick.current = false;
      }, 0);
    } else {
      setProgress(0);
    }

    interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActiveIndex((i) => (i + 3) % videos.length);
          return 0;
        }
        return p + 1;
      });
    }, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <div className="studiox-web">
      <div className="container">
        <div className={styles.studioxCarousalWrapper}>
          <div className={styles.studioxCarousalHeader}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg"
              alt="studiox"
              width={192}
              height={64}
            />
            <h2 className={styles.studioxCarousalTitle}>Features in Motion</h2>
          </div>

          <div className={styles.studioxCarousalItem}>
            <video
              src={videos[activeIndex].src}
              autoPlay
              muted
              loop
              className={styles.studioxCarousalVideo}
            ></video>
          </div>

          <div className={styles.studioxCarousalControls}>
            {videos.map((v, i) => (
              <div
                key={v.id}
                onClick={() => {
                  isManualClick.current = true;
                  setActiveIndex(i);
                }}
                className={`${styles.control} ${
                  i === activeIndex ? styles.active : ""
                }`}
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
                          ref={progressFillRef}
                          className={styles.progressFill}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                  </>
                )}
                
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
