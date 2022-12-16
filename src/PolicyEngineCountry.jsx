import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall } from "./api/call";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import HouseholdPage from "./pages/HouseholdPage";
import { buildVariableTree, getTreeLeavesInOrder } from "./api/variables";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";
import PolicyPage from "./pages/PolicyPage";
import { buildParameterTree } from "./api/parameters";
import BlogPostPage from "./pages/BlogPage";
import Footer from "./layout/Footer";
import AboutPage from "./pages/AboutPage";

function updateMetadata(countryId, setMetadata, setError) {
  return countryApiCall(countryId, "/metadata")
    .then((res) => res.json())
    .then((dataHolder) => {
      const data = dataHolder.result;
      const variableTree = buildVariableTree(
        data.variables,
        data.variableModules,
        data.basicInputs,
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

  if (countryId === "us") {
    if (reformPolicyId === "1") {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("reform", 2);
      setSearchParams(newSearch);
    }
  } else if (countryId === "uk") {
    if (reformPolicyId === "2") {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("reform", 1);
      setSearchParams(newSearch);
    }
  }

  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [householdInput, setHouseholdInput] = useState(null);
  const [householdBaseline, setHouseholdBaseline] = useState(null);
  const [householdReform, setHouseholdReform] = useState(null);
  const [baselinePolicy, setBaselinePolicy] = useState({
    data: null,
    label: null,
  });
  const [reformPolicy, setReformPolicy] = useState({ data: null, label: null });
  const [loading, setLoading] = useState(false);
  const household = {
    input: householdInput,
    baseline: householdBaseline,
    reform: householdReform,
  };
  const policy = {
    baseline: baselinePolicy,
    reform: reformPolicy,
  };

  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    updateMetadata(countryId, setMetadata, setError);
  }, [countryId]);

  // When the household ID changes, update the input and baseline data (and the reform data if a reform is selected).
  useEffect(() => {
    let requests = [];
    if (householdId) {
      if (!householdInput) {
        requests.push(
          countryApiCall(countryId, `/household/${householdId}`)
            .then((res) => res.json())
            .then((dataHolder) => {
              return { input: dataHolder.result.household_json };
            }).then((dataHolder) => {
              setHouseholdInput(dataHolder.input);
            })
        );
      }
      requests.push(
        countryApiCall(
          countryId,
          `/household/${householdId}/policy/${
            baselinePolicyId ||
            (metadata ? metadata.current_law_id : "current-law")
          }`
        )
          .then((res) => res.json())
          .then((dataHolder) => {
            return { baseline: dataHolder.result };
          }).then((dataHolder) => {
            setHouseholdBaseline(dataHolder.baseline);
          })
      );
      if (reformPolicyId && reformPolicyId !== baselinePolicyId) {
        requests.push(
          countryApiCall(
            countryId,
            `/household/${householdId}/policy/${reformPolicyId}`
          )
            .then((res) => res.json())
            .then((dataHolder) => {
              return { reform: dataHolder.result };
            }).then((dataHolder) => {
              setHouseholdReform(dataHolder.reform);
            })
        );
      } else {
        requests.push(Promise.resolve({}));
      }
      setLoading(true);
      Promise.all(requests).then((results) => {
        setLoading(false);
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
            if (dataHolder.result.label === "None") {
              dataHolder.result.label = null;
            }
            setBaselinePolicy({
              data: dataHolder.result.policy_json,
              label: dataHolder.result.label,
            });
          })
      );
    }
    if (householdId) {
      requests.push(
        countryApiCall(
          countryId,
          `/household/${householdId}/policy/${
            baselinePolicyId ||
            (metadata ? metadata.current_law_id : "current-law")
          }`
        )
          .then((res) => res.json())
          .then((dataHolder) => {
            setHouseholdBaseline(dataHolder.result);
          })
      );
    } else {
      setHouseholdBaseline(null);
    }
    setLoading(true);
    Promise.all(requests).then((results) => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, baselinePolicyId]);

  // When the reform policy ID changes, update the reform data and the reform policy.
  useEffect(() => {
    let requests = [];
    if (reformPolicyId) {
      const handleResponse = (dataHolder) => {
        if (dataHolder.result.label === "None") {
          dataHolder.result.label = null;
        }
        setReformPolicy({
          data: dataHolder.result.policy_json,
          label: dataHolder.result.label,
        });
      };
      requests.push(
        countryApiCall(countryId, `/policy/${reformPolicyId}`)
          .then((res) => res.json())
          .then(dataHolder => {
            if (dataHolder.result === undefined) {
              // retry
              return countryApiCall(countryId, `/policy/${reformPolicyId}`)
                .then((res) => res.json())
                .then(handleResponse);
            } else {
              return handleResponse(dataHolder);
            }}));
      if (householdId) {
        requests.push(
          countryApiCall(
            countryId,
            `/household/${householdId}/policy/${reformPolicyId}`
          )
            .then((res) => res.json())
            .then((dataHolder) => {
              setHouseholdReform(dataHolder.result);
            })
        );
      }
    } else {
      setReformPolicy({});
      setHouseholdReform(null);
    }
    setLoading(true);
    Promise.all(requests).then((results) => {
      setLoading(false);
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
      <Route path="/" element={<><HomePage countryId={countryId} /><Footer countryId={countryId} /></>} />
      <Route
        path="/household/*"
        element={
          metadata ? (
            <HouseholdPage
              metadata={metadata}
              household={household}
              policy={policy}
              loading={loading}
              householdInput={householdInput}
              setHouseholdInput={setHouseholdInput}
            />
          ) : error ? (
            <><ErrorPage
              message={`We couldn't talk to PolicyEngine's servers. Please try again in a few minutes. The full error is: ${error}`}
            /><Footer countryId={countryId} /></>
          ) : (
            <><LoadingCentered /><Footer countryId={countryId} /></>
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
            <><ErrorPage message="We couldn't talk to PolicyEngine's servers. Please try again in a few minutes." /><Footer /></>
          ) : (
            <><LoadingCentered />
            <Footer countryId={countryId} /></>
          )
        }
      />
      <Route path="/blog/*" element={<>
        <BlogPostPage />
        <Footer countryId={countryId} />
      </>} />
      <Route path="/about" element={<>
        <AboutPage />
        <Footer countryId={countryId} />
      </>} />
    </Routes>
  );

  return (
    <>
      <Header countryId={countryId} loading={loading} />
      <div style={{ minHeight: "90vh" }}>{mainPage}</div>
    </>
  );
}
