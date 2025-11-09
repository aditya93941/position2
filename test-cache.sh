#!/bin/bash

# Cache Testing Script
# This script helps test the caching and revalidation features

echo "🧪 Testing Next.js Performance Optimizations"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if server is running
echo "📡 Checking if server is running..."
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✓ Server is running${NC}"
else
    echo -e "${RED}✗ Server is not running. Please run 'npm run dev' or 'npm start' first${NC}"
    exit 1
fi

echo ""
echo "1️⃣  Testing Cache-Control Headers"
echo "-----------------------------------"
echo "Fetching blog page..."
RESPONSE=$(curl -sI http://localhost:3000/blog)
CACHE_HEADER=$(echo "$RESPONSE" | grep -i "cache-control" || echo "Not found")

if [[ $CACHE_HEADER == *"s-maxage"* ]]; then
    echo -e "${GREEN}✓ Cache-Control header found:${NC}"
    echo "   $CACHE_HEADER"
else
    echo -e "${YELLOW}⚠ Cache-Control header not found or incomplete${NC}"
    echo "   Response: $CACHE_HEADER"
fi

echo ""
echo "2️⃣  Testing Web Vitals"
echo "-----------------------------------"
echo -e "${YELLOW}ℹ Open http://localhost:3000 in your browser${NC}"
echo -e "${YELLOW}ℹ Open DevTools → Console tab${NC}"
echo -e "${YELLOW}ℹ Look for [Web Vitals] logs${NC}"

echo ""
echo "3️⃣  Performance Check"
echo "-----------------------------------"
echo "Measuring TTFB (Time to First Byte)..."
TTFB=$(curl -o /dev/null -s -w '%{time_starttransfer}\n' http://localhost:3000/blog)
echo "   TTFB: ${TTFB}s"

if (( $(echo "$TTFB < 0.5" | bc -l) )); then
    echo -e "${GREEN}✓ TTFB is good (< 0.5s)${NC}"
else
    echo -e "${YELLOW}⚠ TTFB is slow (> 0.5s)${NC}"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}✅ Testing complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Check browser console for Web Vitals"
echo "2. Test in production: npm run build && npm start"
echo "3. Run PageSpeed Insights on production URL"

