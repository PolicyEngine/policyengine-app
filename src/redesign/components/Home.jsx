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
import NavigationButton from "controls/NavigationButton";
import style from "style";

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
      <h3 style={{ fontFamily: "Roboto Serif" }}>
        What people say about PolicyEngine
      </h3>
        <NavigationButton to="/about" text="Read testimonials from our users">See more</NavigationButton>
        </div>
      </Section>
      <HomeTransparency />
      <Footer />
    </div>
  );
}
