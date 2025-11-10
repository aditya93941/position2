import { Suspense } from 'react';
import Header from "../../components/header/page";
import Banner from "../../components/banner/page";
import Footer from "../../components/footer/page";
import CardComponent from "../../components/card/page";
import BlogFilter from "../../components/blogFilter/page";
import GetInTouch from "@/components/getInTouch/page";
import BlogLoading from "./loading";
import type { Metadata } from "next";

// With Cache Components enabled, pages are dynamic by default
// Caching is controlled by 'use cache' directives in functions
// No need for revalidate export - cacheLife handles it

export const metadata: Metadata = {
  title: "Blog - Marketing Insights & Growth Strategies | Position²",
  description: "Elevate your marketing game with AI-driven expert insights. Read our latest articles on digital marketing, SEO, content creation, and growth strategies.",
  keywords: "marketing blog, digital marketing insights, SEO tips, content marketing, growth strategies, marketing analytics",
  openGraph: {
    title: "Blog - Marketing Insights & Growth Strategies | Position²",
    description: "Elevate your marketing game with AI-driven expert insights.",
    type: "website",
  },
};

const page = () => {
  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <Banner />
      <main id="main-content">
        <BlogFilter />
        {/* Suspense boundary: Only blog cards show loading, rest stays cached */}
        <Suspense fallback={<BlogLoading />}>
          <CardComponent />
        </Suspense>
        <GetInTouch />
      </main>
      <Footer />
    </>
  );
};

export default page;
