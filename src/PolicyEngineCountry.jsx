import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall, updateMetadata } from "./api/call";
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

export default function PolicyEngineCountry(props) {
  const { countryId } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const defaultBaselinePolicy = countryId === "uk" ? 1 : 2;
  const reformPolicyId = searchParams.get("reform") || defaultBaselinePolicy;
  const baselinePolicyId = searchParams.get("baseline") || defaultBaselinePolicy;

  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    updateMetadata(countryId, setMetadata, setError);
  }, [countryId]);

  const homePage = <HomePage countryId={countryId} />;

  const householdPage = <HouseholdPage
    metadata={metadata}
    householdId={householdId}
    reformPolicyId={reformPolicyId}
    baselinePolicyId={baselinePolicyId}
  />;

  const errorPage = <ErrorPage />;

  const policyPage = <PolicyPage
    metadata={metadata}
    householdId={householdId}
    reformPolicyId={reformPolicyId}
    baselinePolicyId={baselinePolicyId}
  />;

  const loadingPage = <LoadingCentered />;

  
  let mainPage = (
    <Routes>
      <Route path="/" element={homePage} />
      <Route
        path="/household/*"
        element={
          metadata ?
            householdPage :
            error ?
              errorPage :
              loadingPage
        }
      />
      <Route
        path="/policy/*"
        element={
          metadata ?
            policyPage :
            error ?
              errorPage :
              loadingPage
        }
      />
      <Route path="/blog/*" element={<BlogPostPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );

  mainPage = <>
    {mainPage}
    <Footer countryId={countryId} />
  </>

  return (
    <>
      <Header countryId={countryId} />
      <div style={{ minHeight: "90vh" }}>{mainPage}</div>
    </>
  );
}
