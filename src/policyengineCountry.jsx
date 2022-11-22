import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { apiCall, countryApiCall } from "./api/call";
import Header from "./Header";
import DesktopView from "./layout/DesktopView";
import HomePage from "./pages/HomePage";
import MobileView from "./layout/MobileView";
import HouseholdPage, { createHousehold } from "./pages/HouseholdPage";
import { buildVariableTree, createDefaultHousehold, getTreeLeavesInOrder } from "./api/variables";
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
  }, [countryId, householdId]);

  // Update the policy state when:
  // - the metadata changes (e.g. the user changes the country)
  // - the reformPolicyId changes (e.g. the user changes the reform policy)
  // - the baselinePolicyId changes (e.g. the user changes the baseline policy)

  // Generally, how things go on the site:
  // - The user does something to change the household/reform policy/baseline policy.
  // - Further down the logic in the app, an API call is fired off to store the new household/reform policy/baseline policy in the database, 
  //   and we get back a new household/reform policy/baseline policy ID. We then update the URL query parameters to include the new ID.
  // - This top-level component we're in now is watching for changes to those query parameters, and notices that they've changed.
  // - It then fires off an API call to fetch the new household/reform policy/baseline policy, and updates the state with the new data.
  //   This does of course involve one redundant API call, but it keeps the logic simple and avoids having to do a lot of work to keep the state in sync.
  //   Plus, the server isn't doing any big openfisca calculations for the call, since the results are cached.

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
