'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/reportWebVitals';

// This runs after the app loads and logs Web Vitals in console
export function reportWebVitalsMetric(metric:any) {
  console.log(`[Web Vitals] ${metric.name}: ${metric.value}`);
  
  // Optional: Send to Google Analytics 4 (if configured)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      non_interaction: true,
    });
  }
}

export function WebVitals() {
  useEffect(() => {
    reportWebVitals(reportWebVitalsMetric);
  }, []);

  return null;
}

