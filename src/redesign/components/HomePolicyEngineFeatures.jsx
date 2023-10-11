import style from "../style";
import Section from "./Section";
import codingScreenshot from "../images/home/coding_screenshot.png";
import parameterScreenshot from "../images/home/parameter_screenshot.png";
import decileChartScreenshot from "../images/home/decile_chart_screenshot.png";
import ShowcaseItem from "./ShowcaseItem";

export default function HomePolicyEngineFeatures() {
  return (
    <Section
      backgroundColor={style.colors.BLUE_PRIMARY}
      title="With PolicyEngine"
      color="white"
    >
      <ShowcaseItem
        title="Advanced analysis with our Python packages"
        description="Dive deeper into policy impact analysis using PolicyEngine's open-source Python packages. Customize your simulations and perform advanced reforms for thorough insights, all on your own computer."
        linkTitle="Try it out"
        link="/"
        image={codingScreenshot}
        color="white"
      />
      <ShowcaseItem
        title="Design custom policy reforms"
        description="PolicyEngine's country models contains hundreds of customisable policy parameters and can handle structural reforms."
        linkTitle="Explore the documentation"
        link="/"
        image={parameterScreenshot}
        color="white"
      />
      <ShowcaseItem
        title="See how reforms affect households"
        description="Evaluate the impact of changes to policy rules on households or entire economics within seconds, and iterate quickly over policy ideas."
        linkTitle="Explore the documentation"
        link="/"
        image={decileChartScreenshot}
        color="white"
      />
    </Section>
  );
}
