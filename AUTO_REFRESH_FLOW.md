# Auto-Refresh Flow Documentation

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER VISITS /blog PAGE                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Server-Side Rendering (SSR)                           │
│  File: app/blog/page.tsx                                        │
│  - Page has revalidate = 10 (ISR)                               │
│  - Renders Header, Banner, BlogFilter, CardComponent, Footer    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: CardComponent (Server Component)                      │
│  File: components/card/page.tsx                                 │
│  - async function CardComponent()                               │
│  - Fetches data from GraphQL API on SERVER                      │
│  - Uses: client.request(GET_ALL_BLOGS)                          │
│  - Gets initial blog data                                       │
│  - Passes data as props to CardClient                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Initial HTML Sent to Browser                           │
│  - Complete HTML with blog cards already rendered               │
│  - Fast initial load (SEO-friendly)                             │
│  - User sees content immediately                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Client-Side Hydration                                   │
│  File: components/card/CardClient.tsx                          │
│  - React hydrates the component                                 │
│  - useState initializes with initialBlogs prop                  │
│  - Component becomes interactive                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: useEffect Hook Runs (On Mount)                         │
│  File: components/card/CardClient.tsx                           │
│  - Sets up polling mechanism                                    │
│  - Immediately calls fetchBlogs() (first check)                  │
│  - Sets interval to poll every 10 seconds                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: First Poll Request (Immediate)                         │
│  Client → GET /api/blogs                                        │
│  - fetch('/api/blogs', { cache: 'no-store' })                  │
│  - Checks for updates right away                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 7: API Route Handler                                      │
│  File: app/api/blogs/route.ts                                   │
│  - Receives GET request                                          │
│  - Uses GraphQL client to fetch from WordPress                  │
│  - Returns JSON: { blogs: { nodes: [...] } }                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 8: Data Comparison & Update                               │
│  File: components/card/CardClient.tsx                           │
│  - Compares new data with current state                         │
│  - Checks: length, slugs, titles, dates                         │
│  - Only updates if data actually changed                        │
│  - setBlogs() triggers React re-render                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 9: React Reconciliation                                    │
│  - React compares old vs new virtual DOM                         │
│  - Uses key={blog.slug} to identify items                       │
│  - Only re-renders changed blog cards                            │
│  - No page reload, smooth update                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 10: Continuous Polling (Every 10 seconds)                │
│  - setInterval continues running                                 │
│  - Every 10 seconds: fetchBlogs() → API → Compare → Update     │
│  - Loop continues until user leaves page                         │
│  - Cleanup on unmount: clearInterval()                          │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Step-by-Step Flow

### **Initial Page Load (Server-Side)**

1. **User navigates to `/blog`**
   - Browser requests the page
   - Next.js server receives request

2. **Page Component (`app/blog/page.tsx`)**
   ```typescript
   export const revalidate = 10; // ISR: revalidate every 10s
   ```
   - Server renders the page
   - Includes: Header, Banner, BlogFilter, CardComponent, Footer

3. **CardComponent Server Component (`components/card/page.tsx`)**
   ```typescript
   export default async function CardComponent() {
     const data = await client.request(GET_ALL_BLOGS); // Server-side fetch
     return <CardClient initialBlogs={blogs} />;
   }
   ```
   - Fetches blog data on the **server**
   - GraphQL query to WordPress API
   - Passes data as `initialBlogs` prop

4. **HTML Response**
   - Complete HTML sent to browser
   - Blog cards already rendered
   - Fast initial load, SEO-friendly

---

### **Client-Side Hydration & Polling**

5. **React Hydration**
   - React takes over on client
   - `CardClient` component hydrates
   - `useState` initializes with `initialBlogs`

6. **useEffect Setup (`CardClient.tsx`)**
   ```typescript
   useEffect(() => {
     const fetchBlogs = async () => { /* ... */ };
     
     fetchBlogs(); // Immediate check
     const interval = setInterval(fetchBlogs, 10000); // Every 10s
     
     return () => clearInterval(interval); // Cleanup
   }, []);
   ```
   - Runs once on component mount
   - Immediately fetches (first check)
   - Sets up 10-second interval

7. **Polling Request**
   ```typescript
   fetch('/api/blogs', { cache: 'no-store' })
   ```
   - Client makes request to `/api/blogs`
   - Bypasses browser cache
   - Gets fresh data

8. **API Route Handler (`app/api/blogs/route.ts`)**
   ```typescript
   export async function GET() {
     const data = await client.request(GET_ALL_BLOGS);
     return NextResponse.json(data);
   }
   ```
   - Server-side GraphQL query
   - Returns JSON response
   - Always fresh (no caching)

9. **Smart Update Logic**
   ```typescript
   setBlogs((prevBlogs) => {
     const hasChanged = /* compare logic */;
     return hasChanged ? newBlogs : prevBlogs;
   });
   ```
   - Compares old vs new data
   - Only updates if changed
   - Prevents unnecessary re-renders

10. **React Reconciliation**
    - React compares virtual DOM
    - Uses `key={blog.slug}` for identification
    - Only updates changed items
    - Smooth, no page reload

---

## Key Features

### ✅ **Dual-Layer Strategy**
- **Server**: Fast initial load (SSR)
- **Client**: Auto-refresh without reload

### ✅ **Optimized Updates**
- Only updates when data changes
- React reconciliation minimizes re-renders
- No unnecessary API calls

### ✅ **Performance**
- Initial load: Server-rendered (fast)
- Updates: Client-side polling (smooth)
- No page reloads
- Maintains scroll position

### ✅ **Error Handling**
- Try-catch in fetchBlogs
- Graceful error handling
- Continues polling even on errors

---

## File Structure

```
app/
├── blog/
│   └── page.tsx              # Main blog page (ISR: 10s)
│   └── [slug]/
│       └── page.tsx          # Blog detail (ISR: 10s)
├── api/
│   └── blogs/
│       └── route.ts          # API endpoint (force-dynamic)

components/
└── card/
    ├── page.tsx              # Server component (fetches initial data)
    └── CardClient.tsx        # Client component (polling logic)

lib/
└── graphql.ts               # GraphQL client & queries
```

---

## Timeline Example

```
Time 0s:   User visits /blog
           ↓ Server renders with initial data
           ↓ HTML sent to browser
           ↓ User sees blog cards

Time 0s:   React hydrates
           ↓ useEffect runs
           ↓ Immediate fetch to /api/blogs
           ↓ Check for updates

Time 10s:  First interval poll
           ↓ fetch('/api/blogs')
           ↓ Compare & update if changed

Time 20s:  Second interval poll
           ↓ fetch('/api/blogs')
           ↓ Compare & update if changed

Time 30s:  Third interval poll
           ↓ ... continues every 10 seconds
```

---

## Benefits

1. **Fast Initial Load**: Server-rendered HTML
2. **Auto-Updates**: No manual refresh needed
3. **Efficient**: Only updates changed content
4. **Smooth UX**: No page reloads, no flicker
5. **SEO-Friendly**: Initial content in HTML
6. **Scalable**: Polling doesn't block UI

