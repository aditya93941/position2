# Quick Testing Guide

## 🚀 Fastest Way to Test Everything

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Open Browser & Check Console
1. Go to: `http://localhost:3000`
2. Open DevTools (F12) → **Console** tab
3. Look for: `[Web Vitals]` logs

**Expected:** You should see 5 metrics logged

---

## 📊 Test Production Build (Recommended)

### Build & Start:
```bash
npm run build
npm start
```

### Test in Browser:
1. Open: `http://localhost:3000/blog`
2. DevTools → **Network** tab
3. Check:
   - ✅ Fast TTFB (< 200ms)
   - ✅ Cache-Control headers present
   - ✅ No duplicate GraphQL requests

---

## 🧪 Run Automated Test Script

```bash
./test-cache.sh
```

This will test:
- ✅ Cache headers
- ✅ TTFB performance

---

## 📈 Production Testing

1. Deploy: `vercel --prod`
2. Test: [PageSpeed Insights](https://pagespeed.web.dev/)
3. Enter your production URL
4. Check scores (should be 90+)

---

## ✅ Quick Checklist

- [ ] Web Vitals in console (dev mode)
- [ ] Fast TTFB in production build
- [ ] Cache headers present
- [ ] PageSpeed score 90+

**For detailed testing, see `TESTING.md`**

