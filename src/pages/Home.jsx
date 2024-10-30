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
import UK2024AutumnBudgetBanner from "./home/banners/UK2024AutumnBudgetBanner";
import US2024ElectionBanner from "./home/banners/US2024ElectionBanner.jsx";
import useCountryId from "../hooks/useCountryId";

export default function Home() {
  const countryId = useCountryId();
  return (
    <>
      <Helmet>
        <title>PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        {countryId === "uk" && <UK2024AutumnBudgetBanner />}

        {countryId === "us" && <US2024ElectionBanner />}
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
