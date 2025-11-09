// lib/reportWebVitals.js
import { onCLS, onFID, onLCP, onINP, onTTFB } from 'web-vitals';

// This function logs all core web vitals in the console
export function reportWebVitals(callback) {
  try {
    onCLS(callback);
    onFID(callback);
    onLCP(callback);
    onINP(callback);
    onTTFB(callback);
  } catch (error) {
    console.error('Web Vitals reporting failed:', error);
  }
}

