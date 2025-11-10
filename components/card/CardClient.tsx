'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';
import BlogCardSkeleton from './BlogCardSkeleton';

interface Blog {
  slug: string;
  title: string;
  date: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

interface BlogsData {
  blogs: {
    nodes: Blog[];
  };
}

interface CardClientProps {
  initialBlogs: Blog[];
}

// Helper to create a unique key for a blog
const getBlogKey = (blog: Blog) => `${blog.slug}-${blog.title}-${blog.date}`;

// Smart diffing: Find which blogs changed, were added, or removed
function diffBlogs(oldBlogs: Blog[], newBlogs: Blog[]) {
  const oldMap = new Map(oldBlogs.map(blog => [blog.slug, blog]));
  const newMap = new Map(newBlogs.map(blog => [blog.slug, blog]));
  
  const changed: string[] = [];
  const added: string[] = [];
  const removed: string[] = [];
  
  // Find changed and added
  newBlogs.forEach(newBlog => {
    const oldBlog = oldMap.get(newBlog.slug);
    if (!oldBlog) {
      added.push(newBlog.slug);
    } else if (getBlogKey(oldBlog) !== getBlogKey(newBlog)) {
      changed.push(newBlog.slug);
    }
  });
  
  // Find removed
  oldBlogs.forEach(oldBlog => {
    if (!newMap.has(oldBlog.slug)) {
      removed.push(oldBlog.slug);
    }
  });
  
  return { changed, added, removed, hasChanges: changed.length > 0 || added.length > 0 || removed.length > 0 };
}

export default function CardClient({ initialBlogs }: CardClientProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [updatingSlugs, setUpdatingSlugs] = useState<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blogsRef = useRef<Blog[]>(initialBlogs); // Track current blogs for diffing

  // Keep ref in sync with state
  useEffect(() => {
    blogsRef.current = blogs;
  }, [blogs]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs', {
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data: BlogsData = await response.json();
          const newBlogs = data.blogs.nodes;
          
          // Smart diffing to find what actually changed
          // Use ref to get current blogs (avoids stale closure)
          const currentBlogs = blogsRef.current;
          const diff = diffBlogs(currentBlogs, newBlogs);
          
          if (!diff.hasChanges) {
            // No changes, no update needed
            return;
          }
          
          // Mark changed/added items for skeleton display
          // Note: removed items are handled by React (they disappear from array)
          const slugsToUpdate = new Set([...diff.changed, ...diff.added]);
          
          // Show skeleton for updating items
          setUpdatingSlugs(slugsToUpdate);
          
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          // Update blogs state
          setBlogs(newBlogs);
          
          // Clear updating state after a short delay (skeleton animation)
          // This allows skeleton to show briefly while data updates
          timeoutRef.current = setTimeout(() => {
            setUpdatingSlugs(new Set());
            timeoutRef.current = null;
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    // Start polling every 10 seconds
    // First poll happens 10 seconds after mount
    const interval = setInterval(() => {
      fetchBlogs();
    }, 10000);

    // Cleanup interval and timeout on unmount
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Memoize blog cards to prevent unnecessary re-renders
  const blogCards = useMemo(() => {
    return blogs.map((blog) => {
      const isUpdating = updatingSlugs.has(blog.slug);
      const blogDate = blog.date ? new Date(blog.date) : null;
      const isValidDate = blogDate && !isNaN(blogDate.getTime());
      
      const formattedDate = isValidDate 
        ? blogDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Date not available";
      
      const dateTime = isValidDate ? blogDate.toISOString() : "";

      // Show skeleton for updating items, actual card for others
      if (isUpdating) {
        return <BlogCardSkeleton key={blog.slug} />;
      }

      return (
        <article 
          key={blog.slug} 
          className={styles.card}
          role="listitem"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <div className={styles.cardHeader}>
            <Link href={`/blog/${blog.slug}`} aria-label={`Read article: ${blog.title}`}>
              <Image
                src={
                  blog.featuredImage?.node?.sourceUrl ||
                  "/rendering-platform-featured.jpg"
                }
                alt={blog.featuredImage?.node?.altText || `Featured image for ${blog.title}`}
                width={400}
                height={250}
                className={styles.image}
                itemProp="image"
                loading="lazy"
              />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {isValidDate && (
              <div className={styles.cardDate}>
                <time 
                  dateTime={dateTime} 
                  className={styles.cardDateText}
                  itemProp="datePublished"
                >
                  {formattedDate}
                </time>
              </div>
            )}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle} itemProp="headline">
                <Link href={`/blog/${blog.slug}`} className={styles.cardTitleLink}>
                  {blog.title}
                </Link>
              </h3>
            </div>
            <div className={styles.cardAuthor}>
              <p className={styles.cardDateText}>
                By{" "}
                <span className={styles.authorNameText} itemProp="author" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">Position²</span>
                </span>
              </p>
            </div>
            <div className={styles.cardFooter}>
              <Link 
                href={`/blog/${blog.slug}`} 
                className={styles.cardLink}
                aria-label={`Read more about ${blog.title}`}
              >
                Read More
                <span className="sr-only">: {blog.title}</span>
              </Link>
            </div>
          </div>
        </article>
      );
    });
  }, [blogs, updatingSlugs]);

  return (
    <section className="container" aria-labelledby="blog-posts-heading">
      <h2 id="blog-posts-heading" className="sr-only">Blog Posts</h2>
      {updatingSlugs.size > 0 && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Updating {updatingSlugs.size} blog post{updatingSlugs.size > 1 ? 's' : ''}...
        </div>
      )}
      <div className={styles.cardContainer} role="list">
        {blogCards}
      </div>
    </section>
  );
}

