import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { countryApiCall, updateMetadata } from "./api/call";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import HouseholdPage from "./pages/HouseholdPage";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";
import PolicyPage from "./pages/PolicyPage";
import BlogPostPage from "./pages/BlogPage";
import Footer from "./layout/Footer";
import AboutPage from "./pages/AboutPage";

export default function PolicyEngineCountry(props) {
  const { countryId } = props;

  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const defaultBaselinePolicy = countryId === "uk" ? 1 : 2;
  const reformPolicyId = searchParams.get("reform") || defaultBaselinePolicy;
  const baselinePolicyId =
    searchParams.get("baseline") || defaultBaselinePolicy;

  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

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

  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    updateMetadata(countryId, setMetadata, setError);
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

  const homePage = <HomePage countryId={countryId} />;

  const householdPage = (
    <HouseholdPage
      metadata={metadata}
      householdId={householdId}
      policy={policy}
    />
  );

  const errorPage = <ErrorPage />;

  const policyPage = (
    <PolicyPage metadata={metadata} householdId={householdId} policy={policy} />
  );

  const loadingPage = <LoadingCentered />;

  let mainPage = (
    <Routes>
      <Route path="/" element={homePage} />
      <Route
        path="/household/*"
        element={metadata ? householdPage : error ? errorPage : loadingPage}
      />
      <Route
        path="/policy/*"
        element={metadata ? policyPage : error ? errorPage : loadingPage}
      />
      <Route path="/blog/*" element={<BlogPostPage />} />
      <Route path="/about" element={<AboutPage />} />
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
