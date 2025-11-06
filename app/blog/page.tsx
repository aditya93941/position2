import Header from "../../components/header/page";
import Banner from "../../components/banner/page";
import Footer from "../../components/footer/page";
import CardComponent from "../../components/card/page";
import BlogFilter from "../../components/blogFilter/page";
import GetInTouch from "@/components/getInTouch/page";
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
