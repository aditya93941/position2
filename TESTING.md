# Testing Guide - Performance Optimizations

This guide shows you how to test all the performance optimizations we've implemented.

## 🚀 Quick Start Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

---

## 📊 Test 1: Web Vitals Monitoring

### Steps:
1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Open DevTools (F12) → **Console** tab
4. Reload the page (Cmd/Ctrl + R)

### Expected Output:
You should see logs like:
```
[Web Vitals] LCP: 1243.45
[Web Vitals] CLS: 0.03
[Web Vitals] FID: 12.34
[Web Vitals] INP: 60.12
[Web Vitals] TTFB: 87.56
```

### ✅ Success Criteria:
- All 5 metrics appear in console
- Values are reasonable (LCP < 2500ms, CLS < 0.1, etc.)

---

## 🏗️ Test 2: ISR (Incremental Static Regeneration)

### Steps:
1. Build the project:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

3. Open browser: `http://localhost:3000/blog`
4. Open DevTools → **Network** tab
5. Check the first request to `/blog`:
   - Look at **Time** column (should be fast, < 100ms for cached)
   - Check **Response Headers** → `Cache-Control` header

### Expected Headers:
```
Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate=300
```

### Test Revalidation:
1. Wait 60+ seconds
2. Make a request to `/blog` again
3. Check if content updates (if blog data changed)

### ✅ Success Criteria:
- Fast TTFB (< 200ms for cached pages)
- Cache-Control headers present
- Pages revalidate after 60 seconds

---

## 💾 Test 3: Data Caching with `unstable_cache`

### Steps:
1. Build and start production server:
   ```bash
   npm run build
   npm start
   ```

2. Open browser: `http://localhost:3000/blog`
3. Open DevTools → **Network** tab
4. Reload page multiple times
5. Check GraphQL requests (if visible) - should be cached

### Test Cache Tags:
1. Check `lib/graphql.ts` - verify cache tags are set:
   - `['blogs', 'all-blogs']` for blog listing
   - `['blogs', 'blog-{slug}']` for individual posts

### ✅ Success Criteria:
- GraphQL requests are cached (no duplicate requests)
- Fast page loads on subsequent visits

---

## 📦 Test 4: Cache-Control Headers

### Steps:
1. Build and start:
   ```bash
   npm run build
   npm start
   ```

2. Open DevTools → **Network** tab
3. Reload page
4. Check different file types:

### Expected Headers:

**HTML Pages:**
```
Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate=300
```

**Static Assets (JS/CSS):**
```
Cache-Control: public, max-age=31536000, immutable
```

**Images:**
```
Cache-Control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600
```

### ✅ Success Criteria:
- All file types have appropriate cache headers
- Static assets have long cache (1 year)
- HTML has short cache with stale-while-revalidate

---

## 🌐 Test 5: Production Performance (PageSpeed Insights)

### Steps:
1. Deploy to Vercel (or your hosting):
   ```bash
   vercel --prod
   ```

2. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
3. Enter your production URL
4. Run test for both Mobile and Desktop

### Expected Results:
- **Performance**: 90+ (good)
- **LCP**: < 2.5s
- **FID/INP**: < 100ms
- **CLS**: < 0.1

### Compare Before/After:
- **Before**: Only lab data
- **After**: Lab data + Real User Metrics (from Web Vitals)

---

## 📝 Test Checklist

- [ ] Web Vitals appear in console
- [ ] ISR pages have fast TTFB
- [ ] Cache-Control headers are correct
- [ ] Data caching works (no duplicate requests)
- [ ] Production PageSpeed score is good

---

## 🐛 Troubleshooting

### Web Vitals not showing?
- Check browser console for errors
- Verify `web-vitals` package is installed
- Check `components/web-vitals.tsx` is in layout

### Cache not working?
- Verify `revalidate` export in page files
- Check `unstable_cache` is wrapping requests
- Clear `.next` folder and rebuild

### Headers not appearing?
- Verify `next.config.ts` headers config
- Rebuild after config changes
- Check production build (not dev mode)

---

## 📊 Performance Benchmarks

### Target Metrics:
- **TTFB**: < 200ms (cached), < 500ms (uncached)
- **LCP**: < 2.5s
- **FID/INP**: < 100ms
- **CLS**: < 0.1
- **PageSpeed Score**: 90+

### Tools:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- Browser DevTools Network tab

---

## 🚀 Next Steps

1. **Monitor in production**: Set up Web Vitals tracking in Google Analytics
2. **Set up webhooks**: Connect CMS to revalidation API
3. **Tune cache values**: Adjust based on your content update frequency
4. **Monitor performance**: Track metrics over time

