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
import useCountryId from "../hooks/useCountryId";
import HomeElectionBanner from "./home/HomeElectionBanner";

export default function Home() {
  const countryId = useCountryId()

  return (
    <>
      <Helmet>
        <title>PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        {
          countryId === "uk" && (
            <HomeElectionBanner />
          )
        }
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
