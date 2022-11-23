import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall, deepAssign, deepAssignFromMultiple } from "./api/call";
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
        currency: countryId === "us" ? "$" : "£",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");

  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [householdInput, setHouseholdInput] = useState(null);
  const [householdBaseline, setHouseholdBaseline] = useState(null);
  const [householdReform, setHouseholdReform] = useState(null);
  const [baselinePolicy, setBaselinePolicy] = useState({data: null, label: null});
  const [reformPolicy, setReformPolicy] = useState({data: null, label: null});
  const household = {
    input: householdInput,
    baseline: householdBaseline,
    reform: householdReform,
  }
  const policy = {
    baseline: baselinePolicy,
    reform: reformPolicy,
  }

  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    updateMetadata(countryId, setMetadata, setError);
  }, [countryId]);

  // When the household ID changes, update the input and baseline data (and the reform data if a reform is selected).
  useEffect(() => {
    let requests = [];
    if (householdId) {
      requests.push(
        countryApiCall(countryId, `/household/${householdId}`)
          .then((res) => res.json())
          .then((dataHolder) => {
            return { input: dataHolder.result.household_json };
          })
      );
      requests.push(
        countryApiCall(
          countryId,
          `/household/${householdId}/policy/${
            baselinePolicyId || "current-law"
          }`
        )
          .then((res) => res.json())
          .then((dataHolder) => {
            return { baseline: dataHolder.result };
          })
      );
      if (reformPolicyId) {
        requests.push(
          countryApiCall(
            countryId,
            `/household/${householdId}/policy/${reformPolicyId}`
          )
            .then((res) => res.json())
            .then((dataHolder) => {
              return { reform: dataHolder.result };
            })
        );
      } else {
        requests.push(Promise.resolve({}));
      }
      Promise.all(requests).then((results) => {
        const combined = Object.assign({}, ...results);
        if (combined.input) {
          setHouseholdInput(combined.input);
        }
        if (combined.baseline) {
          setHouseholdBaseline(combined.baseline);
        }
        if (combined.reform) {
          setHouseholdReform(combined.reform);
        }
      });
    } else {
      setHouseholdInput(null);
      setHouseholdBaseline(null);
      setHouseholdReform(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, householdId]);

  // When the baseline policy ID changes, update the baseline data and the baseline policy.

  useEffect(() => {
    let requests = [];
    if (!baselinePolicyId) {
      // We can mock the policy lookup for current law because it's always going to be the same.
      requests.push(Promise.resolve({ data: {}, label: "Current law" }));
    } else {
      requests.push(
        countryApiCall(countryId, `/policy/${baselinePolicyId}`)
          .then((res) => res.json())
          .then((dataHolder) => {
            return {
              policy: {
                baseline: {
                  data: dataHolder.result.policy_json,
                  label: dataHolder.result.label,
                },
              },
            };
          })
      );
    }
    if (householdId) {
      requests.push(
        countryApiCall(
          countryId,
          `/household/${householdId}/policy/${
            baselinePolicyId || "current-law"
          }`
        )
          .then((res) => res.json())
          .then((dataHolder) => {
            return { household: { baseline: dataHolder.result } };
          })
      );
    } else {
      requests.push(Promise.resolve({ household: { baseline: null } }));
    }
    Promise.all(requests).then((results) => {
      const combined = Object.assign({}, ...results);
      const policyUpdates = combined.policy || {};
      if (policyUpdates.baseline) {
        setBaselinePolicy(policyUpdates.baseline);
      }
      if (householdId) {
        const householdUpdates = combined.household || {};
        if (householdUpdates.baseline) {
          setHouseholdBaseline(householdUpdates.baseline);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, baselinePolicyId]);

  // When the reform policy ID changes, update the reform data and the reform policy.
  useEffect(() => {
    let requests = [];
    if (reformPolicyId) {
      requests.push(
        countryApiCall(countryId, `/policy/${reformPolicyId}`)
          .then((res) => res.json())
          .then((dataHolder) => {
            return {
              policy: {
                reform: {
                  data: dataHolder.result.policy_json,
                  label: dataHolder.result.label,
                },
              },
            };
          })
      );
      if (householdId) {
        requests.push(
          countryApiCall(
            countryId,
            `/household/${householdId}/policy/${reformPolicyId}`
          )
            .then((res) => res.json())
            .then((dataHolder) => {
              return { household: { reform: dataHolder.result } };
            })
        );
      }
    } else {
      requests.push(
        Promise.resolve({ policy: { reform: { data: null, label: null } } })
      );
      if (householdId) {
        requests.push(Promise.resolve({ household: { reform: null } }));
      }
    }
    Promise.all(requests).then((results) => {
      const combinedResults = Object.assign({}, ...results);
      const policyUpdates = combinedResults.policy || {};
      if (policyUpdates.reform) {
        setReformPolicy(policyUpdates.reform);
      }
      if (householdId) {
        const householdUpdates = combinedResults.household || {};
        if (householdUpdates.reform) {
          setHouseholdReform(householdUpdates.reform);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, reformPolicyId]);

  // When we've renamed a policy, the ID won't have changed, but we still need to update the policy.
  // To do this, the policy renamer will have added a { renamed: true } search parameter. When this is
  // added, we need to refresh the reform policy and remove the parameter.
  useEffect(() => {
    if (searchParams.get("renamed") && reformPolicyId) {
      countryApiCall(countryId, `/policy/${reformPolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          setReformPolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
          });
          let newSearch = copySearchParams(searchParams);
          newSearch.delete("renamed");
          setSearchParams(newSearch);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, searchParams.get("renamed")]);

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
