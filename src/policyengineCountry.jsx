import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { apiCall, countryApiCall } from "./api/call";
import Header from "./Header";
import DesktopView from "./layout/DesktopView";
import HomePage from "./pages/HomePage";
import MobileView from "./layout/MobileView";
import HouseholdPage, { createHousehold } from "./pages/HouseholdPage";
import { buildVariableTree, getTreeLeavesInOrder } from "./api/variables";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";
import PolicyPage from "./pages/PolicyPage";
import { buildParameterTree } from "./api/parameters";

function getMetadata(countryId, setMetadata, setError) {
  return countryApiCall(countryId, "/metadata")
  .then((res) => res.json())
  .then((data) => {
    const variableTree = buildVariableTree(
      data.variables,
      data.variableModules
    );
    const parameterTree = buildParameterTree(
      data.parameters,
    )
    const variablesInOrder = getTreeLeavesInOrder(variableTree);
    const metadata = {
      ...data,
      variableTree: variableTree,
      variablesInOrder: variablesInOrder,
      parameterTree: parameterTree,
      countryId: countryId,
    }
    setMetadata(metadata);
    return metadata;
  })
  .catch((error) => {
    setError(error);
    return {};
  });
}

function getSetHousehold(countryId, household, setHouseholdData, searchParams, setSearchParams, setErrorCreatingHousehold) {
  return (newHousehold) => {
    setHouseholdData({
      input: newHousehold,
      computed: household.computed,
      id: household.id,
    });
    apiCall(`/${countryId}/calculate`, newHousehold)
      .then((res) => res.json())
      .then((data) => {
        setHouseholdData({
          input: newHousehold,
          computed: data,
          id: data.household_id,
        });
        let newSearch = {};
        for (const [key, value] of searchParams) {
            newSearch[key] = value;
        }
        newSearch.household = data.household_id;
        setSearchParams(newSearch);
      })
      .catch((err) => {
        setErrorCreatingHousehold(true);
      });
  };
}

function getSetPolicy(countryId, policy, setPolicyData, searchParams, setSearchParams, setErrorCreatingPolicy) {
  return (newPolicy) => {
    setPolicyData({
        policy: newPolicy,
        id: policy.id,
    });
    apiCall(`/${countryId}/policy`, newPolicy)
        .then((res) => res.json())
        .then((data) => {
            setPolicyData({
                policy: newPolicy,
                id: data.policy_id,
            });
            let newSearch = {};
            for (const [key, value] of searchParams) {
                newSearch[key] = value;
            }
            newSearch.policy = data.policy_id;
            setSearchParams(newSearch);
        })
        .catch((err) => {
            setErrorCreatingPolicy(true);
        });
  };
}

export default function PolicyEngineCountry(props) {
  // When loaded, fetch the PolicyEngine metadata for the country.
  // Fail gracefully if the country is not supported.
  const { countryId } = props;
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [household, setHouseholdData] = useState({
    input: null,
    computed: null,
    id: null,
  });
  const setHousehold = getSetHousehold(countryId, household, setHouseholdData, searchParams, setSearchParams, setError);
  const [policy, setPolicyData] = useState({
    policy: {},
    id: null,
  });
  const setPolicy = getSetPolicy(countryId, policy, setPolicyData, searchParams, setSearchParams, setError);
  
  useEffect(() => {
    // First, get the country metadata.
    getMetadata(countryId, setMetadata, setError)
      .then(metadata => {
        console.log(`Got metadata`);
        // Then, create the policy object (taking from the URL if it exists).
        if (!policy.id) {
          if (searchParams.get("policy")) {
            countryApiCall(countryId, `/policy/${searchParams.get("policy")}`)
              .then((res) => res.json())
              .then((data) => {
                  setPolicy(data);
              })
              .catch((err) => {
                  setError(true);
              });
          } else {
            setPolicy({});
          }
        }
        // Then, create the household object (taking from the URL if it exists).
        if (!household.id) {
          createHousehold(
            searchParams.get("household"),
            metadata.countryId,
            metadata
          ).then((household) => {
            setHousehold(household);
          });
        }
      });
  }, [countryId, policy, setPolicy, household, setHousehold, searchParams]);

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
                setHousehold={setHousehold}
              />
            ) : (
              error ?
                <ErrorPage message="We couldn't talk to PolicyEngine's servers. Please try again in a few minutes." /> :
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
              />
            ) : (
              error ?
                <ErrorPage message="We couldn't talk to PolicyEngine's servers. Please try again in a few minutes." /> :
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
