import style from "../../style";
import Section from "../../layout/Section";
import apiScreenshot from "../../images/home/api_screenshot.png";
import githubScreenshot from "../../images/home/github_screenshot.png";
import testingScreenshot from "../../images/home/testing_screenshot.png";
import ShowcaseItem from "../../layout/ShowcaseItem";
import useCountryId from "../../hooks/useCountryId";

export default function HomeTransparency() {
  const countryId = useCountryId();
  return (
    <Section backgroundColor={style.colors.LIGHT_GRAY} title="Transparency">
      <ShowcaseItem
        title="Building in the open"
        description="We develop and publish all our models, code, and data open source on GitHub, with contributions from over a hundred experts from around the world."
        linkTitle="See Our GitHub Activity"
        link={`https://github.com/policyengine`}
        image={githubScreenshot}
        altText="GitHub Activity"
        borderColor={style.colors.BLACK}
      />
      <ShowcaseItem
        title="Extensive testing and validation"
        description="PolicyEngine's software undergoes thousands of automated tests every day to ensure accurate results."
        linkTitle="Explore Documentation"
        link={`https://policyengine.github.io/policyengine-${countryId}`}
        image={testingScreenshot}
        altText="Test Coverage"
        borderColor={style.colors.BLACK}
      />
      <ShowcaseItem
        title="Replicability through APIs"
        description="Instantly compute taxes and benefits for any household under current or reformed policy rules using our REST and Python APIs."
        linkTitle="Explore Documentation"
        link={`/${countryId}/api`}
        image={apiScreenshot}
        altText="API Documentation"
        borderColor={style.colors.BLACK}
      />
    </Section>
  );
}
