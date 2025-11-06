'use client';

import styles from './blogFilter.module.css';
import Link from 'next/link';
import { useState } from 'react';

// Dummy data
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
  { year: 2019, count: 15 },
  { year: 2018, count: 10 },
  { year: 2017, count: 14 },
  { year: 2016, count: 59 },
  { year: 2015, count: 175 },
  { year: 2014, count: 209 }
];

export default function BlogFilter() {
  const [activeSection, setActiveSection] = useState<'categories' | 'authors' | 'archive' | null>(null);

  const toggleSection = (section: 'categories' | 'authors' | 'archive') => {
    setActiveSection(activeSection === section ? null : section);
  };


  return (
    <div>
      <div className="container">
        <div className={styles.blogFilterWrapper}>
          <ul className={styles.blogFilterList}>
            <li 
              onClick={() => toggleSection('categories')}
              className={styles.blogFilterHeader}
            >
              Categories +
            </li>
            <li 
              onClick={() => toggleSection('authors')}
              className={styles.blogFilterHeader}
            >
              Authors +
            </li>
            <li 
              onClick={() => toggleSection('archive')}
              className={styles.blogFilterHeader}
            >
              Archive +
            </li>
          </ul>
        </div>
        <hr className={styles.blogFilterSeparator} />
        <div className={styles.blogFilterContent}>
          
          <div className={styles.blogFilterContainer}>
          
            {activeSection === 'categories' && (
              <>
              <div className={styles.blogFilterCloseButtonContainer}>
                <button className={styles.blogFilterCloseButton} onClick={() => setActiveSection(null)}>X</button>
              </div>
              <ul className={styles.blogFilterList}>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link href="#" className={styles.blogFilterItem}>
                      <div className={styles.blogFilterDot}></div>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className={styles.blogFilterSeparator} />
              </>
            )}
          </div>
          <div className={styles.blogFilterContainer}>
            {activeSection === 'authors' && (
              <>
              <div className={styles.blogFilterCloseButtonContainer}>
                <button className={styles.blogFilterCloseButton} onClick={() => setActiveSection(null)}>X</button>
              </div>
                <ul className={styles.blogFilterList}>
                {authors.map((author, index) => (
                  <li key={index}>
                    <Link href="#" className={styles.blogFilterItem}>
                      <div className={styles.blogFilterDot}></div>
                      {author}
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className={styles.blogFilterSeparator} />
              </>
            )}
          </div>
          <div className={styles.blogFilterContainer}>
            {activeSection === 'archive' && (
              <>
              <div className={styles.blogFilterCloseButtonContainer}>
                <button className={styles.blogFilterCloseButton} onClick={() => setActiveSection(null)}>X</button>
              </div>
              <ul className={styles.blogFilterList}>
                {archive.map((item, index) => (
                  <li key={index}>
                    <Link href="#" className={styles.blogFilterItem}>
                      <div className={styles.blogFilterDot}></div>
                      {item.year} ({item.count})
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className={styles.blogFilterSeparator} />
              </>
            )}
          </div>
        </div>
      </div> 
    </div>
  );
}
