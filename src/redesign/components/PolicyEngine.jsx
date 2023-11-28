import Home from "./Home";
import Research from "./Research";
import About from "./About";
import Jobs from "./Jobs";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import Contact from "./Contact";
import Donate from "./Donate";
import { useLocation } from "react-router-dom";
import BlogPage from "./BlogPage";

import { useEffect, useState, lazy, Suspense } from "react";
import {
  copySearchParams,
  countryApiCall,
  updateMetadata,
} from "../../api/call";
import LoadingCentered from "../../layout/LoadingCentered";
import ErrorPage from "../../layout/Error";
import Header from "./Header";
import Testimonials from "./Testimonials";
import CalculatorInterstitial from "./CalculatorInterstitial";
import CitizensEconomicCouncil from "./CitizensEconomicCouncil";
import loc_en from "../../plotly_locales/locale-en.js";
import loc_en_us from "../../plotly_locales/locale-en-us.js";
import APIDocumentationPage from "./APIDocumentationPage";

const PolicyPage = lazy(() => import("../../pages/PolicyPage"));
const HouseholdPage = lazy(() => import("../../pages/HouseholdPage"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function PolicyEngine({ pathname }) {
  var Plotly = require("plotly.js/dist/plotly.js");
  Plotly.register(loc_en);
  Plotly.register(loc_en_us);
  const COUNTRIES = ["us", "uk", "ca", "ng", "il"];

  // First, check if the country is specified (.org/[country]/...)
  const path = pathname || window.location.pathname;
  const pathParts = path.split("/");
  let countryId = pathParts[1];

  if (!COUNTRIES.includes(countryId)) {
    // If the country is not specified, look up the country ID from the user's browser language
    const browserLanguage = navigator.language;
    countryId = {
      "en-US": "us",
      "en-GB": "uk",
      "en-CA": "ca",
      "en-NG": "ng",
      "en-IL": "il",
    }[browserLanguage];
  }

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

  const householdPage = (
    <Suspense fallback={loadingPage}>
      <Header />
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
      <Header />
      <PolicyPage
        metadata={metadata}
        householdId={householdId}
        policy={policy}
        hasShownPopulationImpactPopup={hasShownPopulationImpactPopup}
        setHasShownPopulationImpactPopup={setHasShownPopulationImpactPopup}
      />
    </Suspense>
  );

  // If the path is /, redirect to /[countryId]
  // If the path is /[countryId], render the homepage
  // If the path is /[countryId]/about, render the about page
  // If the path is /[countryId]/jobs, render the jobs page
  // If the path is /[countryId]/research, render the research page
  // If the path is not recognized, redirect to /[countryId]

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Redirect from / to /[countryId] */}
        <Route path="/" element={<Navigate to={`/${countryId}`} />} />

        <Route path="/:countryId" element={<Home />} />
        <Route path="/:countryId/about" element={<About />} />
        <Route path="/:countryId/jobs" element={<Jobs />} />
        <Route path="/:countryId/testimonials" element={<Testimonials />} />
        <Route
          path="/:countryId/calculator"
          element={<CalculatorInterstitial />}
        />
        <Route path="/:countryId/research" element={<Research />} />
        <Route path="/:countryId/contact" element={<Contact />} />
        <Route path="/:countryId/donate" element={<Donate />} />
        <Route path="/:countryId/research/*" element={<BlogPage />} />

        <Route
          path="/:countryId/household/*"
          element={metadata ? householdPage : error ? errorPage : loadingPage}
        />
        <Route
          path="/:countryId/policy/*"
          element={metadata ? policyPage : error ? errorPage : loadingPage}
        />

        <Route
          path="/:countryId/api"
          element={<APIDocumentationPage metadata={metadata} />}
        />
        <Route path="/uk/cec" element={<CitizensEconomicCouncil />} />

        {/* redirect from /countryId/blog/slug to /countryId/research/slug */}
        <Route
          path="/:countryId/blog/:slug"
          element={<Navigate to={`/${countryId}/research/${pathParts[3]}`} />}
        />

        {/* Redirect for unrecognized paths */}
        <Route path="*" element={<Navigate to={`/${countryId}`} />} />
      </Routes>
    </>
  );
}
