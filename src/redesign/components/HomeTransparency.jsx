import style from "../style";
import Section from "./Section";
import apiScreenshot from "../images/home/api_screenshot.png";
import githubScreenshot from "../images/home/github_screenshot.png";
import testingScreenshot from "../images/home/testing_screenshot.png";
import ShowcaseItem from "./ShowcaseItem";
import useCountryId from "./useCountryId";

export default function HomeTransparency() {
  const countryId = useCountryId();
  return (
    <Section backgroundColor={style.colors.LIGHT_GRAY} title="Transparency">
      <ShowcaseItem
        title="We're fully open source"
        description="All PolicyEngine models, code, and data are open source and available in their latest form on GitHub, with code, documentation and validation from over fifty open-source contributors. This is our real-time, unfiltered development."
        linkTitle="See our GitHub activity"
        link={`https://github.com/policyengine`}
        image={githubScreenshot}
        altText="Screenshot of PolicyEngine's GitHub activity"
        borderColor={style.colors.BLACK}
      />
      <ShowcaseItem
        title="Our models are tested extensively"
        description="PolicyEngine's software undergoes thousands of automated tests every day to ensure our simulations produce accurate results."
        linkTitle="Explore the documentation"
        link={`https://policyengine.github.io/policyengine-${countryId}`}
        image={testingScreenshot}
        altText="Screenshot of PolicyEngine's test coverage"
        borderColor={style.colors.BLACK}
      />
      <ShowcaseItem
        title="PolicyEngine's API computes policy impacts"
        description="Instantly compute taxes and benefits for any household under current or reformed policy rules, using the PolicyEngine REST API, reproducing any result in the web app."
        linkTitle="Explore the documentation"
        link={`https://policyengine.github.io/policyengine-${countryId}`}
        image={apiScreenshot}
        altText="Screenshot of PolicyEngine's API documentation"
        borderColor={style.colors.BLACK}
      />
    </Section>
  );
}
