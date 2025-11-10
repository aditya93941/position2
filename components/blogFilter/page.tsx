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
    <nav className="container" aria-label="Blog filters">
      <div className={styles.blogFilterWrapper}>
        <ul className={styles.blogFilterList} role="list">
          <li role="none">
            <button 
              onClick={() => toggleSection('categories')} 
              className={styles.blogFilterHeader}
              aria-expanded={activeSection === 'categories'}
              aria-controls="categories-filter"
              aria-label="Toggle categories filter"
            >
              Categories {activeSection === 'categories' ? '+' : '+'}
            </button>
          </li>
          <li role="none">
            <button 
              onClick={() => toggleSection('authors')} 
              className={styles.blogFilterHeader}
              aria-expanded={activeSection === 'authors'}
              aria-controls="authors-filter"
              aria-label="Toggle authors filter"
            >
              Authors {activeSection === 'authors' ? '+' : '+'}
            </button>
          </li>
          <li role="none">
            <button 
              onClick={() => toggleSection('archive')} 
              className={styles.blogFilterHeader}
              aria-expanded={activeSection === 'archive'}
              aria-controls="archive-filter"
              aria-label="Toggle archive filter"
            >
              Archive {activeSection === 'archive' ? '+' : '+'}
            </button>
          </li>
        </ul>
      </div>

      <hr className={styles.blogFilterSeparator} />

      {/* CATEGORIES */}
      <div 
        ref={(el :any) => (refs.current.categories = el)} 
        className={styles.blogFilterContainer}
        id="categories-filter"
        role="region"
        aria-labelledby="categories-heading"
        aria-hidden={activeSection !== 'categories'}
      >
        <div className={styles.blogFilterInner}>
          <div className={styles.blogFilterCloseButtonContainer}>
            <button
              className={styles.blogFilterCloseButton}
              onClick={() => setActiveSection(null)}
              aria-label="Close categories filter"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <h3 id="categories-heading" className="sr-only">Categories</h3>
          <ul className={styles.blogFilterContentList} role="list">
            {categories.map((item, i) => (
              <li key={i} role="listitem">
                <Link 
                  href={`/blog?category=${encodeURIComponent(item)}`} 
                  className={styles.blogFilterItem}
                  aria-label={`Filter by category: ${item}`}
                >
                  <div className={styles.blogFilterDot} aria-hidden="true"></div>
                  {item} 
                </Link>
              </li>
            ))}
          </ul>
          <hr className={styles.blogFilterSeparator} />
        </div>
      </div>

      {/* AUTHORS */}
      <div 
        ref={(el :any) => (refs.current.authors = el)} 
        className={styles.blogFilterContainer}
        id="authors-filter"
        role="region"
        aria-labelledby="authors-heading"
        aria-hidden={activeSection !== 'authors'}
      >
        <div className={styles.blogFilterInner}>
          <div className={styles.blogFilterCloseButtonContainer}>
            <button
              className={styles.blogFilterCloseButton}
              onClick={() => setActiveSection(null)}
              aria-label="Close authors filter"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <h3 id="authors-heading" className="sr-only">Authors</h3>
          <ul className={styles.blogFilterContentList} role="list">
            {authors.map((item, i) => (
              <li key={i} role="listitem">
                <Link 
                  href={`/blog?author=${encodeURIComponent(item)}`} 
                  className={styles.blogFilterItem}
                  aria-label={`Filter by author: ${item}`}
                >
                  <div className={styles.blogFilterDot} aria-hidden="true"></div>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <hr className={styles.blogFilterSeparator} />
        </div>
      </div>

      {/* ARCHIVE */}
      <div 
        ref={(el :any) => (refs.current.archive = el)} 
        className={styles.blogFilterContainer}
        id="archive-filter"
        role="region"
        aria-labelledby="archive-heading"
        aria-hidden={activeSection !== 'archive'}
      >
        <div className={styles.blogFilterInner}>
          <div className={styles.blogFilterCloseButtonContainer}>
            <button
              className={styles.blogFilterCloseButton}
              onClick={() => setActiveSection(null)}
              aria-label="Close archive filter"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <h3 id="archive-heading" className="sr-only">Archive</h3>
          <ul className={styles.blogFilterContentList} role="list">
            {archive.map((item, i) => (
              <li key={i} role="listitem">
                <Link 
                  href={`/blog?year=${item.year}`} 
                  className={styles.blogFilterItem}
                  aria-label={`Filter by year ${item.year}, ${item.count} posts`}
                >
                  <div className={styles.blogFilterDot} aria-hidden="true"></div>
                  {item.year} ({item.count})
                </Link>
              </li>
            ))}
          </ul>
          <hr className={styles.blogFilterSeparator} />
        </div>
      </div>
    </nav>
  );
}
