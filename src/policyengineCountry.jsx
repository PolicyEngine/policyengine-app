import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { countryApiCall } from "./api/call";
import Header from "./Header";
import DesktopView from "./layout/DesktopView";
import HomePage from "./pages/HomePage";
import MobileView from "./layout/MobileView";
import HouseholdPage from "./pages/HouseholdPage";
import { buildVariableTree, getTreeLeavesInOrder } from "./api/variables";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";
import PolicyPage from "./pages/PolicyPage";
import { buildParameterTree } from "./api/parameters";

function updateMetadata(countryId, setMetadata, setError) {
  return countryApiCall(countryId, "/metadata")
    .then((res) => res.json())
    .then((dataHolder) => {
      const data = dataHolder.result;
      const variableTree = buildVariableTree(
        data.variables,
        data.variableModules
      );
      const parameterTree = buildParameterTree(data.parameters);
      const variablesInOrder = getTreeLeavesInOrder(variableTree);
      const metadata = {
        ...data,
        variableTree: variableTree,
        variablesInOrder: variablesInOrder,
        parameterTree: parameterTree,
        countryId: countryId,
        currency: countryId === "us" ? 
          "$" : "£",
      };
      setMetadata(metadata);
      return metadata;
    })
    .catch((error) => {
      setError(error);
    });
}

export default function PolicyEngineCountry(props) {
  // When loaded, fetch the PolicyEngine metadata for the country.
  // Fail gracefully if the country is not supported.
  const { countryId } = props;
  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");

  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [household, setHousehold] = useState({
    input: null,
    baseline: null,
    reform: null,
  });
  const [policy, setPolicy] = useState({
    baseline: {
      data: null,
      label: null,
    },
    reform: {
      data: null,
      label: null,
    },
  });

  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    updateMetadata(countryId, setMetadata, setError);
  }, [countryId]);

  // When the household ID changes, update the input and baseline data (and the reform data if a reform is selected).
  useEffect(() => {
    let requests = [];
    if (householdId) {
      requests.push(countryApiCall(countryId, `/household/${householdId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          return {input: dataHolder.result.household_json};
        }));
      requests.push(countryApiCall(countryId, `/household/${householdId}/policy/${baselinePolicyId || "current-law"}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          return {baseline: dataHolder.result};
        }));
      if (reformPolicyId) {
        requests.push(countryApiCall(countryId, `/household/${householdId}/policy/${reformPolicyId}`)
          .then((res) => res.json())
          .then((dataHolder) => {
            return {reform: dataHolder.result};
          }));
      }
      Promise.all(requests).then((results) => {
        setHousehold(Object.assign(JSON.parse(JSON.stringify(household)), ...results));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, householdId]);

  // When the baseline policy ID changes, update the baseline data and the baseline policy.

  useEffect(() => {
    let requests = [];
    if (!baselinePolicyId) {
      // We can mock the policy lookup for current law because it's always going to be the same.
      requests.push(Promise.resolve({data: {}, label: "Current law"}));
    } else {
      requests.push(countryApiCall(countryId, `/policy/${baselinePolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          return {policy: {data: dataHolder.result.policy_json, label: dataHolder.result.label}};
        }));
    }
    if (householdId) {
      requests.push(countryApiCall(countryId, `/household/${householdId}/policy/${baselinePolicyId || "current-law"}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          return {household: {baseline: dataHolder.result}};
        }));
    }
    Promise.all(requests).then((results) => {
      const combinedResults = Object.assign({}, ...results);
      setPolicy(Object.assign(JSON.parse(JSON.stringify(policy)), {baseline: combinedResults.policy}));
      if (householdId) {
        setHousehold(Object.assign(JSON.parse(JSON.stringify(household)), {baseline: combinedResults.household.baseline}));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, baselinePolicyId]);

  // When the reform policy ID changes, update the reform data and the reform policy.
  useEffect(() => {
    let requests = [];
    if (reformPolicyId) {
      requests.push(countryApiCall(countryId, `/policy/${reformPolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          return {policy: {data: dataHolder.result.policy_json, label: dataHolder.result.label}};
        }));
      if (householdId) {
        requests.push(countryApiCall(countryId, `/household/${householdId}/policy/${reformPolicyId}`)
          .then((res) => res.json())
          .then((dataHolder) => {
            return {household: {reform: dataHolder.result}};
          }));
      }
    }
    Promise.all(requests).then((results) => {
      const combinedResults = Object.assign({}, ...results);
      setPolicy(Object.assign(JSON.parse(JSON.stringify(policy)), combinedResults.policy));
      if (householdId) {
        setHousehold(Object.assign(JSON.parse(JSON.stringify(household)), combinedResults.household));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, reformPolicyId]);

  // Generally, how things go on the site:
  // - The user does something to change the household/reform policy/baseline policy.
  // - Further down the logic in the app, an API call is fired off to store the new household/reform policy/baseline policy in the database, 
  //   and we get back a new household/reform policy/baseline policy ID. We then update the URL query parameters to include the new ID.
  // - This top-level component we're in now is watching for changes to those query parameters, and notices that they've changed.
  // - It then fires off an API call to fetch the new household/reform policy/baseline policy, and updates the state with the new data.
  //   This does of course involve one redundant API call, but it keeps the logic simple and avoids having to do a lot of work to keep the state in sync.
  //   Plus, the server isn't doing any big openfisca calculations for the call, since the results are cached.
  console.log(household, policy)

  const mainPage = (
    <Routes>
      <Route path="/" element={<HomePage countryId={countryId} />} />
      <Route
        path="/household/*"
        element={
          metadata ? (
            <HouseholdPage
              metadata={metadata}
              household={household}
              policy={policy}
            />
          ) : error ? (
            <ErrorPage message="We couldn't talk to PolicyEngine's servers. Please try again in a few minutes." />
          ) : (
            <LoadingCentered />
          )
        }
      />
      <Route
        path="/policy/*"
        element={
          metadata ? (
            <PolicyPage
              metadata={metadata}
              policy={policy}
              setPolicy={setPolicy}
              household={household}
            />
          ) : error ? (
            <ErrorPage message="We couldn't talk to PolicyEngine's servers. Please try again in a few minutes." />
          ) : (
            <LoadingCentered />
          )
        }
      />
    </Routes>
  );

  return (
    <>
      <DesktopView>
        <Header countryId={countryId} />
        {mainPage}
      </DesktopView>
      <MobileView>
        <h3>Currently not supported on mobile.</h3>
      </MobileView>
    </>
  );
}
