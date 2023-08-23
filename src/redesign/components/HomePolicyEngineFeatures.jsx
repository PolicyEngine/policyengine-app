import style from "../style";
import Section from "./Section";
import useDisplayCategory from "./useDisplayCategory";
import placeholderImage from "../images/placeholder.png";
import FontIcon from "./FontIcon";

export default function HomePolicyEngineFeatures() {
  return (
    <Section backgroundColor={style.colors.BLUE_PRIMARY} title="With PolicyEngine">
      <IndividualPolicyEngineFeature
        title="Advanced analysis with our Python packages"
        description="Dive deeper into policy impact analysis using PolicyEngine's open-source Python packages. Customize your simulations and perform advanced reforms for thorough insights, all on your own computer."
        linkTitle="Try it out"
        link="/"
        image={placeholderImage}
      />
      <IndividualPolicyEngineFeature
        title="Design custom policy reforms"
        description="PolicyEngine's country models contains hundreds of customisable policy parameters and can handle structural reforms."
        linkTitle="Explore the documentation"
        link="/"
        image={placeholderImage}
      />
      <IndividualPolicyEngineFeature
        title="See how reforms affect households"
        description="Evaluate the impact of changes to policy rules on households or entire economics within seconds, and iterate quickly over policy ideas."
        linkTitle="Explore the documentation"
        link="/"
        image={placeholderImage}
      />
    </Section>
  );
}

function IndividualPolicyEngineFeature({ title, description, linkTitle, link, image }) {
  const displayCategory = useDisplayCategory();

  return <div
    style={{
      display: "flex",
      flexDirection: displayCategory === "desktop" ? "row" : "column",
      marginTop: 50,
      paddingBottom: 50,
      borderBottom: `1px solid ${style.colors.WHITE}`,
    }}>
      <div style={{
        minWidth: displayCategory === "desktop" ? 300 : "100%",
        paddingRight: displayCategory === "desktop" ? 100 : 0,
        marginBottom: displayCategory !== "desktop" ? 20 : 0,
      }}>
      <h2>{title}</h2>
      </div>
      <div style={{
        paddingRight: displayCategory === "desktop" ? 50 : 0,
        marginBottom: displayCategory !== "desktop" ? 20 : 0,
      }}>
      <p>{description}</p>
      <a href={link}>{linkTitle.toUpperCase()}<FontIcon name="arrow_forward" /></a>
      </div>
      <img src={image} />
    </div>
}