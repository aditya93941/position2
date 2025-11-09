"use client";
import { useEffect, useState, useRef, useCallback } from "react";
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
  // Initialize as false to match server render, will be set in useEffect
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Set mounted state after hydration to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lazy load videos only when component is visible (after hydration)
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load video for active index when visible
            if (videoRefs.current[activeIndex]) {
              videoRefs.current[activeIndex]?.load();
            }
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [activeIndex, isMounted]);

  // Set mobile state after hydration
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      // Use requestAnimationFrame to batch DOM reads
      requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 768);
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    setProgress(0);
    // Load video when index changes (after hydration)
    if (videoRefs.current[activeIndex]) {
      // Only load if element is in viewport (check via IntersectionObserver)
      const video = videoRefs.current[activeIndex];
      if (video) {
        const checkVisibility = () => {
          const rect = video.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight + 50 && rect.bottom > -50;
          if (isInViewport) {
            video.load();
          }
        };
        // Small delay to ensure DOM is ready
        setTimeout(checkVisibility, 100);
      }
    }

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
  }, [activeIndex, isMounted]);

  const handleControlClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="studiox-web" ref={containerRef}>
      <div className="container">
        <div className={styles.studioxCarousalWrapper}>
          <div className={styles.studioxCarousalHeader}>
            <Image
              src="https://www.position2.com/wp-content/uploads/2025/08/studiox-new-logo.svg"
              alt="StudioX logo"
              width={192}
              height={64}
              loading="lazy"
            />
            <h2 className={styles.studioxCarousalTitle}>Features in Motion</h2>
          </div>

          <div className={styles.studioxCarousalItem}>
            {/* Always render video element to match server/client HTML structure */}
            {/* Use preload="none" to prevent loading until .load() is called */}
            <video
              ref={(el) => {
                videoRefs.current[activeIndex] = el;
              }}
              src={videos[activeIndex].src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className={styles.studioxCarousalVideo}
              aria-label={`${videos[activeIndex].title}: ${videos[activeIndex].desc}`}
            />
          </div>

          <div className={styles.studioxCarousalControls} role="tablist" aria-label="Video carousel controls">
            {videos.map((v, i) => (
              <button
                key={v.id}
                onClick={() => handleControlClick(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleControlClick(i);
                  }
                }}
                className={`${styles.control} ${
                  i === activeIndex ? styles.active : ""
                }`}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`${v.title}: ${v.desc}`}
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
    </div>
  );
}
