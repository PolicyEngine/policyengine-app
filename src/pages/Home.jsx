import Header from "../layout/Header";
import HomeLanding from "./home/HomeLanding";
import HomeCallToAction from "./home/HomeCallToAction";
import HomeBlogPreview from "./home/HomeBlogPreview";
import HomeSubscribe from "./home/HomeSubscribe";
import HomePolicyEngineFeatures from "./home/HomePolicyEngineFeatures";
import HomeUsedBy from "./home/HomeUsedBy";
import HomeTransparency from "./home/HomeTransparency";
import Footer from "../layout/Footer";
import HomeQuoteCarousel from "./home/HomeQuoteCarousel";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        <HomeLanding />
        <HomeUsedBy />
        <HomeBlogPreview />
        <HomeSubscribe />
        <HomeCallToAction />
        <HomePolicyEngineFeatures />
        <HomeQuoteCarousel />
        <HomeTransparency />
        <Footer />
      </div>
    </>
  );
}
