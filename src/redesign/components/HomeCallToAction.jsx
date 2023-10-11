import style from "../style";
import Section from "./Section";
import useDisplayCategory from "./useDisplayCategory";
import ActionButton from "./ActionButton";
import useCountryId from "./useCountryId";

export default function HomeCallToAction() {
  return (
    <Section height={500} backgroundColor={style.colors.LIGHT_GRAY}>
      <CalculatorCallToAction />
    </Section>
  );
}

export function CalculatorCallToAction() {
  const displayCategory = useDisplayCategory();
  const buttonSize = displayCategory === "desktop" ? 700 : "100%";
  const countryId = useCountryId();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: style.colors.LIGHT_GRAY,
        height: "100%",
      }}
    >
      <h3 style={{ fontFamily: "Roboto Serif" }}>
        Compute any public policy reform
      </h3>
      <div style={{ marginTop: 20 }} />
      <ActionButton
        width={buttonSize}
        text="Calculate my household income, taxes and benefits"
        link={`/${countryId}/household`}
      />
      <div style={{ marginTop: 20 }} />
      <ActionButton
        width={buttonSize}
        text="Calculate the impact of policy reforms"
        link={`/${countryId}/policy`}
      />
    </div>
  );
}
