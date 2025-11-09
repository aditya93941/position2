import Header from "../../components/header/page";
import Banner from "../../components/banner/page";
import Footer from "../../components/footer/page";
import CardComponent from "../../components/card/page";
import BlogFilter from "../../components/blogFilter/page";
import GetInTouch from "@/components/getInTouch/page";

// Route segment config - Next.js 16 best practices
export const revalidate = 60; // ISR: Re-generate at most every 60 seconds
export const dynamic = 'force-static'; // Prefer static generation

const page = () => {
  return (
    <>
      <Header />
      <Banner />
      <BlogFilter />
      <CardComponent />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default page;
