import Header from "../../layout/Header";
import HomeLanding from "./HomeLanding";
import HomeCallToAction from "./HomeCallToAction";
import HomeBlogPreview from "./HomeBlogPreview";
import HomeSubscribe from "./HomeSubscribe";
import HomePolicyEngineFeatures from "./HomePolicyEngineFeatures";
import HomeUsedBy from "./HomeUsedBy";
import HomeTransparency from "./HomeTransparency";
import Footer from "../../layout/Footer";
import HomeQuoteCarousel from "./HomeQuoteCarousel";
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
