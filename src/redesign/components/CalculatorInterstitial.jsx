import style from "style";
import Header from "./Header";
import ActionButton from "./ActionButton";
import useCountryId from "./useCountryId";
import HouseholdScreenshot from "../images/home/household_screenshot.png";
import PolicyScreenshot from "../images/home/policy_screenshot.png";

export default function CalculatorInterstitial() {
  const countryId = useCountryId();
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
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

style;

function CalculatorOption({ left, title, description, link, image }) {
  return (
    <div
      style={{
        margin: 20,
        width: 300,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
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
        <ActionButton
          direction={left ? "right" : "left"}
          text={<>{title}</>}
          width={300}
          link={link}
        />
        <div
          style={{
            paddingTop: 20,
          }}
        >
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
