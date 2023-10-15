import Header from "./Header";
import HomeLanding from "./HomeLanding";
import HomeCallToAction from "./HomeCallToAction";
import HomeBlogPreview from "./HomeBlogPreview";
import HomeSubscribe from "./HomeSubscribe";
import HomePolicyEngineFeatures from "./HomePolicyEngineFeatures";
import HomeUsedBy from "./HomeUsedBy";
import HomeTransparency from "./HomeTransparency";
import Footer from "./Footer";
import HomeQuoteCarousel from "./HomeQuoteCarousel";

export default function Home() {
  document.title = "PolicyEngine";
  return (
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
  );
}
