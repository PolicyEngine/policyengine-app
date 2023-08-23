import style from "../style";
import Section from "./Section";
import placeholderImage from "../images/placeholder.png";
import ShowcaseItem from "./ShowcaseItem";

export default function HomeTransparency() {
  return (
    <Section backgroundColor={style.colors.LIGHT_GRAY} title="With PolicyEngine">
      <ShowcaseItem
        title="Advanced analysis with our Python packages"
        description="Dive deeper into policy impact analysis using PolicyEngine's open-source Python packages. Customize your simulations and perform advanced reforms for thorough insights, all on your own computer."
        linkTitle="Explore the documentation"
        link="/"
        image={placeholderImage}
        borderColor={style.colors.BLACK}
      />
      <ShowcaseItem
        title="PolicyEngine's free API computes policy impacts"
        description="Instantly compute taxes and benefits for any household under current or reformed policy rules, using the PolicyEngine REST API."
        linkTitle="Explore the documentation"
        link="/"
        image={placeholderImage}
        borderColor={style.colors.BLACK}
      />
      <ShowcaseItem
        title="We're fully open source"
        description="All PolicyEngine models, code, and data are open source and available in their latest form on GitHub, with code, documentation and validation from over fifty open-source contributors. This is our real-time, unfiltered development."
        linkTitle="See our GitHub activity"
        link="/"
        image={placeholderImage}
        borderColor={style.colors.BLACK}
      />
    </Section>
  );
}

