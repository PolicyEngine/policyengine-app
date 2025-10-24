import style from "../../style";
import Section from "../../layout/Section";
import CodeBlock from "../../components/CodeBlock";
import githubScreenshot from "../../images/home/github_screenshot.png";
import testingScreenshot from "../../images/home/testing_screenshot.png";
import ShowcaseItem from "../../layout/ShowcaseItem";
import useCountryId from "../../hooks/useCountryId";

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
        title="PolicyEngine's API computes policy impacts"
        description="Instantly compute taxes and benefits for any household under current or reformed policy rules, using the PolicyEngine REST API, reproducing any result in the web app."
        linkTitle="Explore the documentation"
        link={`/${countryId}/api`}
        image={
          <CodeBlock
            code={`{
          "income_tax": {
            "2023": 3486
          },
          "income_tax_pre_charges": {
            "2023": 3486
          },
          "is_CTC_child_limit_exempt": {
            "2023": true
          },
          "is_QYP": {
            "2023": false
          }
        }`}
          />
        }
        altText="JSON response from API"
        borderColor={style.colors.BLACK}
      />


    </Section>
  );
}
