import Header from "./Header";
import HomeQuoteCarousel from "./HomeQuoteCarousel";
import HomeCallToAction from "./HomeCallToAction";
import HomeBlogPreview from "./HomeBlogPreview";
import HomeSubscribe from "./HomeSubscribe";
import HomePolicyEngineFeatures from "./HomePolicyEngineFeatures";
import HomeUsedBy from "./HomeUsedBy";
import HomeTransparency from "./HomeTransparency";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeQuoteCarousel />
      <HomeCallToAction />
      <HomeBlogPreview />
      <HomeSubscribe />
      <HomePolicyEngineFeatures />
      <HomeUsedBy />
      <HomeTransparency />
      <Footer />
    </div>
  );
}
