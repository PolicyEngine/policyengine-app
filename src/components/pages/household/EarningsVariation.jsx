import { useEffect } from "react";
import { useContext, useState } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import Plot from "react-plotly.js";
import style from "../../../style";

export function EarningsVariation(props) {
  const PolicyEngine = useContext(PolicyEngineContext);

  useEffect(() => {
    if (PolicyEngine.earningsVariationIsOutdated) {
      let household = JSON.parse(JSON.stringify(PolicyEngine.household));
      household.axes = [
        [
          {
            name: PolicyEngine.variableNames.earnings,
            period: "2022",
            min: 0,
            max: 200_000,
            count: 101,
          },
        ],
      ];
      PolicyEngine.apiCall("/calculate", household)
        .then((res) => res.json())
        .then((data) =>
          PolicyEngine.setState({
            simulatedEarningsVariationHousehold: data,
            earningsVariationIsOutdated: false,
          })
        );
    }
  });

  if (!PolicyEngine.simulatedEarningsVariationHousehold) {
    return <></>;
  }

  const household = PolicyEngine.simulatedEarningsVariationHousehold;

  const earningsVariable =
    PolicyEngine.metadata.variables[PolicyEngine.variableNames.earnings];
  const netIncomeVariable =
    PolicyEngine.metadata.variables[PolicyEngine.variableNames.netIncome];
  const earningsArray = PolicyEngine.getSimulatedValue(
    PolicyEngine.variableNames.earnings,
    "2022",
    "you",
    household
  );
  const netIncomeArray = PolicyEngine.getSimulatedValue(
    PolicyEngine.variableNames.netIncome,
    "2022",
    "your household",
    household
  );
  return (
    <div style={{ padding: 20, paddingLeft: 40 }}>
      <h4
        onClick={() =>
          PolicyEngine.setState({ householdPage: "structure.maritalStatus" })
        }
      >
        {" "}
        &#8592; Back
      </h4>
      <h1 style={{ marginTop: 50 }}>Varying your earnings</h1>
      <p>
        The below chart shows your household's net income as your employment
        income varies.
      </p>
      <Plot
        data={[
          {
            x: earningsArray,
            y: netIncomeArray,
            type: "line",
          },
        ]}
        layout={{
          xaxis: {
            title: `Your ${earningsVariable.label}`,
            tickprefix:
              earningsVariable.unit == "currency-GBP"
                ? "£"
                : earningsVariable.unit == "currency-USD"
                ? "$"
                : null,
          },
          yaxis: {
            title: `Your ${netIncomeVariable.label}`,
            tickprefix:
              netIncomeVariable.unit == "currency-GBP"
                ? "£"
                : netIncomeVariable.unit == "currency-USD"
                ? "$"
                : null,
          },
        }}
        config={{
          displayModeBar: false,
        }}
        style={{
          width: "100%",
          height: 400,
        }}
      />
    </div>
  );
}
