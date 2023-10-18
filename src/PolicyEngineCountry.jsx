import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall, updateMetadata } from "./api/call";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";
import Footer from "./layout/Footer";
import FOF from "./pages/FOF";
import CountryPackageDocs from "./pages/CountryPackageDocs";
CountryPackageDocs;
import ModelDocumentation from "./pages/model/ModelDocumentation";
import PrivacyPage from "./pages/PrivacyPage";
import ResearchPage from "./pages/ResearchPage";

const HouseholdPage = lazy(() => import("./pages/HouseholdPage"));
const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPage"));
const DonatePage = lazy(() => import("./pages/DonatePage"));

export default function LegacyPolicyEngineCountry(props) {
  const { countryId } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const defaultBaselinePolicy =
    countryId === "uk"
      ? 1
      : countryId === "us"
      ? 2
      : countryId === "ca"
      ? 3
      : countryId === "ng"
      ? 4
      : countryId === "il"
      ? 5
      : 1;
  const reformPolicyId = searchParams.get("reform") || defaultBaselinePolicy;
  const baselinePolicyId =
    searchParams.get("baseline") || defaultBaselinePolicy;

  const [metadata, setMetadata] = useState(null);
  const [error] = useState(null);

  const [baselinePolicy, setBaselinePolicy] = useState({
    id: baselinePolicyId,
    label: null,
    data: null,
  });
  const [reformPolicy, setReformPolicy] = useState({
    id: reformPolicyId,
    label: null,
    data: null,
  });
  const policy = {
    baseline: baselinePolicy,
    reform: reformPolicy,
  };

  const [hasShownHouseholdPopup, setHasShownHouseholdPopup] = useState(false);
  const [hasShownPopulationImpactPopup, setHasShownPopulationImpactPopup] =
    useState(false);

  updateMetadata;
  setMetadata;
  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    try {
      updateMetadata(countryId, setMetadata);
    } catch (e) {
      // Sometimes this fails. When it does, refresh the page, but only once (use a param in the URL to make sure it only happens once).
      if (!searchParams.get("refreshed")) {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("refreshed", true);
        setSearchParams(newSearch);
        window.location.reload();
      }
    }
  }, [countryId]);

  // Get the baseline policy data when the baseline policy ID changes.
  useEffect(() => {
    if (metadata) {
      countryApiCall(countryId, `/policy/${baselinePolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          if (dataHolder.result.label === "None") {
            dataHolder.result.label = null;
          }
          setBaselinePolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
            id: baselinePolicyId,
          });
        });
    }
  }, [baselinePolicyId, countryId, metadata]);

  // Get the reform policy data when the reform policy ID changes.
  useEffect(() => {
    if (metadata) {
      countryApiCall(countryId, `/policy/${reformPolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          if (dataHolder.result.label === "None") {
            dataHolder.result.label = null;
          }
          setReformPolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
            id: reformPolicyId,
          });
        });
    }
  }, [countryId, reformPolicyId, metadata]);

  useEffect(() => {
    if (searchParams.get("renamed") && reformPolicyId) {
      countryApiCall(countryId, `/policy/${reformPolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          setReformPolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
            id: reformPolicyId,
          });
          let newSearch = copySearchParams(searchParams);
          newSearch.delete("renamed");
          setSearchParams(newSearch);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, searchParams.get("renamed")]);

  const loadingPage = <LoadingCentered />;
  const homePage = <HomePage countryId={countryId} />;

  const householdPage = (
    <Suspense fallback={loadingPage}>
      <HouseholdPage
        metadata={metadata}
        householdId={householdId}
        policy={policy}
        hasShownHouseholdPopup={hasShownHouseholdPopup}
        setHasShownHouseholdPopup={setHasShownHouseholdPopup}
      />
    </Suspense>
  );

  const errorPage = <ErrorPage />;

  const policyPage = (
    <Suspense fallback={loadingPage}>
      <PolicyPage
        metadata={metadata}
        householdId={householdId}
        policy={policy}
        hasShownPopulationImpactPopup={hasShownPopulationImpactPopup}
        setHasShownPopulationImpactPopup={setHasShownPopulationImpactPopup}
      />
    </Suspense>
  );

  let mainPage = (
    <Routes>
      <Route exact path="/" element={homePage} />
      <Route
        path="/household/*"
        element={metadata ? householdPage : error ? errorPage : loadingPage}
      />
      <Route
        path="/policy"
        element={metadata ? policyPage : error ? errorPage : loadingPage}
      />
      <Route
        path="/blog/*"
        element={
          <Suspense fallback={loadingPage}>
            <BlogPostPage countryId={countryId} />
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={<Suspense fallback={loadingPage}></Suspense>}
      />
      <Route
        path="/donate"
        element={
          <Suspense fallback={loadingPage}>
            <DonatePage />
          </Suspense>
        }
      />
      <Route path="/cec" element={<CEC />} />
      <Route path="/citizens-economic-council" element={<CEC />} />
      <Route
        path="/docs"
        element={
          <ModelDocumentation countryId={countryId} metadata={metadata} />
        }
      />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/blog" element={<ResearchPage countryId={countryId} />} />
      <Route path="/*" element={<FOF />} />
    </Routes>
  );

  mainPage = (
    <>
      {mainPage}
      <Footer countryId={countryId} />
    </>
  );

  return (
    <>
      <Header countryId={countryId} />
      <div style={{ minHeight: "90vh" }}>{mainPage}</div>
    </>
  );
}

function CEC() {
  // Update the title to be "CEC reform simulator | PolicyEngine")
  useEffect(() => {
    document.title = "CEC reform simulator | PolicyEngine";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <iframe
        src="https://policyengine-cec-simulator.streamlit.app/~/+/?embedded=true"
        title="Citizens' Economic Council reform simulator"
        height="800"
        width="800"
        style={{ overflow: "hidden" }}
      />
    </div>
  );
}
