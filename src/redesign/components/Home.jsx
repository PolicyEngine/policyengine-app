import Header from "./Header";
import HomeLanding from "./HomeLanding";
import HomeCallToAction from "./HomeCallToAction";
import HomeBlogPreview from "./HomeBlogPreview";
import HomeSubscribe from "./HomeSubscribe";
import HomePolicyEngineFeatures from "./HomePolicyEngineFeatures";
import HomeUsedBy from "./HomeUsedBy";
import HomeTransparency from "./HomeTransparency";
import Footer from "./Footer";
import Section from "./Section";
import style from "style";
import useCountryId from "./useCountryId";
import ActionButton from "./ActionButton";

export default function Home() {
  document.title = "PolicyEngine";
  const countryId = useCountryId();
  return (
    <div>
      <Header />
      <HomeLanding />
      <HomeUsedBy />
      <HomeBlogPreview />
      <HomeSubscribe />
      <HomeCallToAction />
      <HomePolicyEngineFeatures />
      <Section>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: style.colors.WHITE,
        height: "100%",
      }}
    >
      <h3 style={{ fontFamily: "Roboto Serif", marginBottom: 30 }}>
        What people say about PolicyEngine
      </h3>
        <ActionButton width={500} link={`/${countryId}/testimonials`} text="Read testimonials from our users"></ActionButton>
        </div>
      </Section>
      <HomeTransparency />
      <Footer />
    </div>
  );
}
