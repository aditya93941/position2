# Performance Optimization Guide

This document outlines the performance optimizations implemented in this Next.js project using **Next.js 16 latest caching features**.

## ✅ Implemented Optimizations

### 1. **Next.js 16 Data Caching with `unstable_cache`**
- **GraphQL requests** are now wrapped with `unstable_cache` for proper Next.js data caching
- Provides cache tags for granular cache control
- Better than basic `revalidate` - caches at the data layer, not just page level

**Files:**
- `lib/graphql.ts` - Cached GraphQL request wrapper

**Key Features:**
- Cache tags: `['blogs', 'all-blogs', 'blog-{slug}']`
- Automatic revalidation every 60 seconds

### 2. **ISR (Incremental Static Regeneration)**
- **Blog pages** use `export const revalidate = 60` (re-generate every 60 seconds)
- Added route segment config: `export const dynamic = 'force-static'`
- Pages are statically generated at build time and revalidated in the background
- Reduces server load and improves TTFB

**Files:**
- `app/blog/page.tsx` - Blog listing page
- `app/blog/[slug]/page.tsx` - Individual blog posts

### 2. **Cache-Control Headers**
Configured in `next.config.ts`:
- **HTML pages**: `s-maxage=60, stale-while-revalidate=300` (CDN cache for 60s, serve stale for 300s)
- **Static assets** (JS/CSS): `max-age=31536000, immutable` (1 year cache)
- **Images**: `max-age=86400, s-maxage=86400` (24 hour cache)

### 3. **Next.js Image Optimization**
- All images use `next/image` component
- Automatic optimization, lazy loading, and responsive images
- CDN caching via Vercel

### 4. **Web Vitals Monitoring**
- Real user metrics collection via `web-vitals` package
- Logs to console in development
- Ready for Google Analytics 4 integration
- See `components/web-vitals.tsx` and `lib/reportWebVitals.js`


## 📊 Testing Performance

### Quick Tests

1. **Test ISR:**
   - Deploy and check TTFB on first load vs subsequent loads
   - Should see faster TTFB after initial generation

2. **Test Cache Headers:**
   - Check Network tab in DevTools
   - Verify Cache-Control headers on responses
   - Test repeated requests (should be faster from cache)

3. **Test Web Vitals:**
   - Run `npm run dev`
   - Open DevTools → Console
   - Reload page and check for `[Web Vitals]` logs

### PageSpeed Insights

Run Google PageSpeed Insights and compare:
- **Before**: Lab data only
- **After**: Lab data + Real User Metrics (via Web Vitals)

## 🚀 Deployment Considerations

### Vercel (Recommended)
- Automatic Edge Network deployment
- CDN caching configured via headers
- ISR works out of the box

### Other Platforms
- Ensure CDN supports `s-maxage` header
- Configure revalidation webhooks if needed
- Verify Edge Runtime support (if using)

## 📝 Best Practices

1. **Use Next.js 16 `unstable_cache` for data fetching** - Provides better caching than basic fetch
2. **Use cache tags for granular control** - Cache tags allow targeted revalidation
3. **Use SSG/ISR for most pages** - Only use SSR when you need per-request data
4. **Precompute heavy operations** - Move to build time or background jobs
5. **Monitor Web Vitals** - Track real user performance
6. **Optimize images** - Always use `next/image`
7. **Choose correct deployment region** - Minimize latency to users

## 🆕 Next.js 16 Caching Features Used

### `unstable_cache` (Data Layer Caching)
- Wraps GraphQL requests for proper Next.js caching
- Supports cache tags for targeted revalidation
- Better performance than page-level caching alone

### Route Segment Config
- `export const revalidate = 60` - ISR revalidation interval
- `export const dynamic = 'force-static'` - Prefer static generation
- `export const dynamicParams = true` - Allow dynamic params

### Cache Tags
- Tag-based caching: `['blogs', 'all-blogs', 'blog-{slug}']`
- Allows granular cache control

## 🔧 Tuning Cache Values

Adjust in `next.config.ts` based on your needs:

- **s-maxage**: CDN cache duration (60s = good for frequently updated content)
- **stale-while-revalidate**: How long to serve stale content while revalidating (300s = 5 min)
- **revalidate**: ISR revalidation interval (60s = re-check every minute)

For static content that rarely changes, increase these values.

