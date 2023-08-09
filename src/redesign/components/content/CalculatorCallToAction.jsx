import { useDisplayCategory } from "../controls/Responsive";
import style from "../../style";
import { ActionButton } from "../controls/ActionButton";

export function CalculatorCallToAction() {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        borderTop: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
        borderBottom: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: displayCategory === "mobile" ? 50 : 100,
        backgroundColor: style.colors.LIGHT_GRAY,
      }}
    >
      <h3 style={{ fontFamily: "Roboto Serif" }}>
        Compute any public policy reform
      </h3>
      <ActionButton text="Calculate" onClick={() => {}} />
    </div>
  );
}
