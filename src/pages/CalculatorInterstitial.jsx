import Header from "../layout/Header";
import LinkButton from "controls/LinkButton";
import useCountryId from "../redesign/components/useCountryId";
import HouseholdScreenshot from "../images/home/household_screenshot.png";
import PolicyScreenshot from "../images/home/policy_screenshot.png";
import useDisplayCategory from "../redesign/components/useDisplayCategory";

export default function CalculatorInterstitial() {
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: displayCategory === "mobile" ? 40 : 100,
        }}
      >
        <h3
          className="spaced-sans-serif"
          style={{
            fontWeight: 300,
          }}
        >
          Choose a calculator
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CalculatorOption
          title="Calculate my taxes and benefits"
          link={`/${countryId}/household`}
          description="Enter your household details and see how tax-benefit policy affects you."
          image={HouseholdScreenshot}
        />
        <CalculatorOption
          title="Calculate policy reform impacts"
          link={`/${countryId}/policy`}
          description="See how different policy reforms affect your household and the economy."
          image={PolicyScreenshot}
        />
      </div>
    </>
  );
}

function CalculatorOption({ left, title, description, link, image }) {
  const displayCategory = useDisplayCategory();

  return (
    <div
      style={{
        margin: 20,
        width: 300,
        display: "flex",
        flexDirection: displayCategory === "mobile" ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        alt={title}
        src={image}
        style={{
          width: 300,
          objectFit: "contain",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LinkButton
          hoverStart={left ? "right" : "left"}
          text={<>{title}</>}
          width={300}
          link={link}
        />
        <div
          style={{
            paddingTop: 20,
            order: displayCategory === "mobile" ? -1 : 0,
          }}
        >
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
