'use client';

import styles from './blogFilter.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const categories = [
  'AI', 'Best of the Week', 'Campaign Hub', 'Content Creation', 'Content Marketing',
  'Creative', 'CRM Services', 'CyberSecurity', 'Data Privacy', 'Demand Acceleration',
  'Digital Experience', 'Digital Marketing', 'Digital Strategy', 'Digital Transformation',
  'Education', 'Framework & Strategy', 'General', 'Local Marketing', 'Marketing Analytics',
  'Marketing Automation', 'Marketing Technology', 'Multi Location Health', 'Paid Acquisition',
  'Paid Search', 'Pay per click', 'Retargeting', 'SaaS', 'SEO', 'Social Ads',
  'Social Media Marketing', 'Uncategorized', 'Web & Apps'
];

const authors = [
  'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown',
  'Emily Davis', 'Robert Miller', 'Lisa Anderson', 'Chris Wilson', 'Amanda Taylor'
];

const archive = [
  { year: 2025, count: 11 },
  { year: 2024, count: 20 },
  { year: 2023, count: 32 },
  { year: 2022, count: 11 },
  { year: 2021, count: 12 },
  { year: 2020, count: 13 },
];

type Section = 'categories' | 'authors' | 'archive';

export default function BlogFilter() {
  const [activeSection, setActiveSection] = useState<Section | null>('categories'); // default open
  const refs = useRef<Record<Section, HTMLDivElement | null>>({
    categories: null,
    authors: null,
    archive: null,
  });

  useEffect(() => {
    const updateHeights = () => {
      (Object.keys(refs.current) as Section[]).forEach((key) => {
        const el = refs.current[key];
        if (!el) return;
        if (activeSection === key) {
          const scrollHeight = el.scrollHeight;
          el.style.height = scrollHeight + 'px';
        } else {
          el.style.height = '0px';
        }
      });
    };
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [activeSection]);

  const toggleSection = (section: Section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="container">
      <div className={styles.blogFilterWrapper}>
        <ul className={styles.blogFilterList}>
          <li onClick={() => toggleSection('categories')} className={styles.blogFilterHeader}>
            Categories +
          </li>
          <li onClick={() => toggleSection('authors')} className={styles.blogFilterHeader}>
            Authors +
          </li>
          <li onClick={() => toggleSection('archive')} className={styles.blogFilterHeader}>
            Archive +
          </li>
        </ul>
      </div>

      <hr className={styles.blogFilterSeparator} />

      {/* CATEGORIES */}
      <div ref={(el :any) => (refs.current.categories = el)} className={styles.blogFilterContainer}>
        <div className={styles.blogFilterInner}>
          <div className={styles.blogFilterCloseButtonContainer}>
            <button
              className={styles.blogFilterCloseButton}
              onClick={() => setActiveSection(null)}
            >
              X
            </button>
          </div>
          <ul className={styles.blogFilterContentList}>
            {categories.map((item, i) => (
              <li key={i}>
                <Link href="#" className={styles.blogFilterItem}>
                  <div className={styles.blogFilterDot}></div>
                  {item} 
                </Link>
              </li>
            ))}
          </ul>
          <hr className={styles.blogFilterSeparator} />
        </div>
      </div>

      {/* AUTHORS */}
      <div ref={(el :any) => (refs.current.authors = el)} className={styles.blogFilterContainer}>
        <div className={styles.blogFilterInner}>
          <div className={styles.blogFilterCloseButtonContainer}>
            <button
              className={styles.blogFilterCloseButton}
              onClick={() => setActiveSection(null)}
            >
              X
            </button>
          </div>
          <ul className={styles.blogFilterContentList}>
            {authors.map((item, i) => (
              <li key={i}>
                <Link href="#" className={styles.blogFilterItem}>
                  <div className={styles.blogFilterDot}></div>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <hr className={styles.blogFilterSeparator} />
        </div>
      </div>

      {/* ARCHIVE */}
      <div ref={(el :any) => (refs.current.archive = el)} className={styles.blogFilterContainer}>
        <div className={styles.blogFilterInner}>
          <div className={styles.blogFilterCloseButtonContainer}>
            <button
              className={styles.blogFilterCloseButton}
              onClick={() => setActiveSection(null)}
            >
              X
            </button>
          </div>
          <ul className={styles.blogFilterContentList}>
            {archive.map((item, i) => (
              <li key={i}>
                <Link href="#" className={styles.blogFilterItem}>
                  <div className={styles.blogFilterDot}></div>
                  {item.year} ({item.count})
                </Link>
              </li>
            ))}
          </ul>
          <hr className={styles.blogFilterSeparator} />
        </div>
      </div>
    </div>
  );
}
