import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";

export default function OutputPanel() {
  const PolicyEngine = useContext(PolicyEngineContext);
  const isExpanded = PolicyEngine.householdPage.startsWith("policyOutput.");
  const hasReform = Object.keys(PolicyEngine.policyReform).length > 0;

  return (
    <div
      style={{
        color: style.colors.BLACK,
        width: "60%",
        position: "fixed",
        bottom: 0,
        height: isExpanded
          ? `calc(100% - ${style.spacing.HEADER_SIZE}px)`
          : 100,
        cursor: hasReform && "pointer",
        borderTopWidth: !isExpanded ? 3 : 0,
        borderTopStyle: "solid",
        borderTopColor: style.colors.DARK_GRAY,
      }}
      onClick={() => {
        if (!isExpanded && hasReform) {
          PolicyEngine.setState({
            policyPage: "policyOutput.budgetaryImpact",
          });
        }
      }}
    >
      <>
        {!isExpanded && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              height: "100%",
            }}
          >
            {hasReform ? (
              <h3>See how your reform affects the economy</h3>
            ) : (
              <h3>Change policy parameters to build a reform</h3>
            )}
          </div>
        )}
        {isExpanded && <div></div>}
      </>
    </div>
  );
}
