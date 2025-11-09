'use client';

import { useEffect } from 'react';

/**
 * Client component to add preconnect links after hydration
 * This prevents hydration mismatches while still optimizing resource loading
 */
export function PreconnectLinks() {
  useEffect(() => {
    // Add preconnect links after hydration
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://www.position2.com';
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://www.position2.com';
    document.head.appendChild(dnsPrefetch);

    // Cleanup (though these are safe to leave)
    return () => {
      // Links are safe to leave in head, no cleanup needed
    };
  }, []);

  return null;
}

