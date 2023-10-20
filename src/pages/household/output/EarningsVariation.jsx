import { useEffect, useState } from "react";
import { apiCall } from "../../../api/call";
import ErrorPage from "../../../layout/Error";
import ResultsPanel from "../../../layout/ResultsPanel";
import { useSearchParams } from "react-router-dom";
import LoadingCentered from "../../../layout/LoadingCentered";
import SearchOptions from "../../../controls/SearchOptions";
import { capitalize } from "../../../api/language";
import BaselineOnlyChart from "./EarningsVariation/BaselineOnlyChart";
import BaselineAndReformChart from "./EarningsVariation/BaselineAndReformChart";
import { getValueFromHousehold } from "../../../api/variables";

export default function EarningsVariation(props) {
  const {
    householdInput,
    householdBaseline,
    householdReform,
    metadata,
    policy,
  } = props;
  const [baselineNetIncome, setBaselineNetIncome] = useState(null);
  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId =
    searchParams.get("baseline") || metadata.current_law_id;
  const [reformNetIncome, setReformNetIncome] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [variable, setVariable] = useState("household_net_income");
  const variableLabel = metadata.variables[variable].label || variable;
  const possibleEntities = Object.keys(
    householdInput[
      metadata.entities[metadata.variables[variable].entity].plural
    ],
  );
  // eslint-disable-next-line
  const [selectedEntity, setSelectedEntity] = useState(possibleEntities[0]);

  // Only show variables whose values are arrays

  let validVariables = [];
  if (baselineNetIncome) {
    for (const entityPlural in baselineNetIncome) {
      const firstEntity =
        baselineNetIncome[entityPlural][
          Object.keys(baselineNetIncome[entityPlural])[0]
        ];
      validVariables = validVariables.concat(
        Object.keys(firstEntity).filter((variable) =>
          Array.isArray(firstEntity[variable][2023]),
        ),
      );
    }
  }
  validVariables = validVariables
    .map((variable) => metadata.variables[variable])
    .filter((variable) => !variable.isInputVariable);

  useEffect(() => {
    let householdData = JSON.parse(JSON.stringify(householdInput));
    householdData.people.you["employment_income"] = { 2023: null };
    const currentEarnings = getValueFromHousehold(
      "employment_income",
      "2023",
      "you",
      householdInput,
      metadata,
    );
    householdData.axes = [
      [
        {
          name: "employment_income",
          period: "2023",
          min: 0,
          max: Math.max(
            metadata.countryId == "ng" ? 1_200_000 : 200_000,
            2 * currentEarnings,
          ),
          count: 401,
        },
      ],
    ];
    setLoading(true);
    let requests = [];
    requests.push(
      apiCall(`/${metadata.countryId}/calculate`, {
        household: householdData,
        policy: policy.baseline.data,
      })
        .then((res) => res.json())
        .then((data) => {
          setBaselineNetIncome(data.result);
        })
        .catch((err) => {
          setError(err);
        }),
    );
    if (reformPolicyId) {
      requests.push(
        apiCall(`/${metadata.countryId}/calculate`, {
          household: householdData,
          policy: policy.reform.data,
        })
          .then((res) => res.json())
          .then((data) => {
            setReformNetIncome(data.result);
          })
          .catch((err) => {
            setError(err);
          }),
      );
    }
    Promise.all(requests).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reformPolicyId, baselinePolicyId, householdId]);

  if (error) {
    return (
      <ErrorPage message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />
    );
  }

  let yAxisSelector = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        paddingTop: 20,
      }}
    >
      <SearchOptions
        defaultValue={variable}
        options={validVariables.map((variable) => ({
          value: variable.name,
          label: capitalize(variable.label || ""),
        }))}
        onSelect={(value) => {
          setVariable(value);
          setSelectedEntity(possibleEntities[0]);
        }}
        style={{
          width: 400,
        }}
      />
    </div>
  );

  let mainChart;

  if (baselineNetIncome && !reformNetIncome) {
    mainChart = (
      <BaselineOnlyChart
        householdBaseline={householdBaseline}
        householdBaselineVariation={baselineNetIncome}
        metadata={metadata}
        variable={variable}
        variableLabel={variableLabel}
      />
    );
  } else if (baselineNetIncome) {
    mainChart = (
      <BaselineAndReformChart
        householdBaseline={householdBaseline}
        householdBaselineVariation={baselineNetIncome}
        householdReform={householdReform}
        householdReformVariation={reformNetIncome}
        metadata={metadata}
        variable={variable}
        variableLabel={variableLabel}
        policy={policy}
      />
    );
  }

  return (
    <ResultsPanel
      title="How your net income changes with your earnings"
      description="This chart shows how your net income changes under different earnings. It is based on your household's current situation."
    >
      {loading ? (
        <div style={{ height: 300 }}>
          <LoadingCentered />
        </div>
      ) : (
        <>
          {yAxisSelector}
          {mainChart}
        </>
      )}
    </ResultsPanel>
  );
}
